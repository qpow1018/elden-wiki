'use client';

import { useLayoutEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react';
import Link from 'next/link';

import gameItemQuery from '@/api/gameItem/gameItemQuery';
import type { TGameItemSearchEntry } from '@/api/gameItem/types';
import { GAME_ITEM_TYPES } from '@/define/gameItems';

import EmptyState from '@/components/common/empty/EmptyState';
import ErrorState from '@/components/common/error/ErrorState';
import TextInput from '@/components/common/form/TextInput';
import Header from '@/components/common/header/Header';
import BoxLoading from '@/components/common/loading/BoxLoading';

import styles from './CatalogSearchClient.module.scss';

const KOREAN_NAME_ORDER = new Intl.Collator('ko');
const SEARCH_URL_CHANGE_EVENT = 'catalog-search-url-change';

export default function CatalogSearchClient({ initialSearch }: { initialSearch: string }) {
  const search = useSyncExternalStore(
    subscribeToSearchUrl,
    readSearchFromLocation,
    () => initialSearch,
  );
  const [composingInput, setComposingInput] = useState<string | null>(null);
  const isComposing = useRef(false);
  const hasRestoredScroll = useRef(false);
  const { data, isPending, isError, refetch } = gameItemQuery.useGetGameItemSearchEntries();
  const normalizedSearch = normalizeName(search);
  const results = useMemo(() => findMatches(data, normalizedSearch), [data, normalizedSearch]);
  const hasResults = results.length > 0;

  useLayoutEffect(() => {
    if (!hasResults || hasRestoredScroll.current || search !== readSearchFromLocation()) return;

    hasRestoredScroll.current = true;
    const historyState: unknown = window.history.state;
    if (typeof historyState !== 'object' || !historyState) return;
    if (!('catalogSearchScrollY' in historyState)) return;

    const scrollY = historyState.catalogSearchScrollY;
    if (typeof scrollY === 'number') window.scrollTo({ top: scrollY, behavior: 'instant' });
  }, [hasResults, search]);

  function updateSearch(value: string) {
    if (value === search) return;

    hasRestoredScroll.current = true;

    const url = new URL(window.location.href);
    if (value) url.searchParams.set('q', value);
    else url.searchParams.delete('q');
    window.history.replaceState({ catalogSearchScrollY: 0 }, '', url);
    window.dispatchEvent(new Event(SEARCH_URL_CHANGE_EVENT));
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  function handleInputChange(value: string) {
    if (isComposing.current) setComposingInput(value);
    else updateSearch(value);
  }

  function handleResultNavigate() {
    window.history.replaceState({ catalogSearchScrollY: window.scrollY }, '');
  }

  return (
    <main>
      <Header title="도감 검색" />

      <section className={styles['search']} aria-label="아이템 검색">
        <TextInput
          type="search"
          aria-label="아이템 이름"
          placeholder="아이템 이름으로 검색"
          value={composingInput ?? search}
          onChange={handleInputChange}
          onCompositionStart={() => {
            isComposing.current = true;
          }}
          onCompositionEnd={(event) => {
            isComposing.current = false;
            setComposingInput(null);
            updateSearch(event.currentTarget.value);
          }}
        />
        {!normalizedSearch && <EmptyState message="아이템 이름을 입력해 주세요" />}
        {normalizedSearch && isPending && <BoxLoading />}
        {normalizedSearch && !data && isError && (
          <ErrorState
            message="검색 결과를 불러오지 못했습니다."
            onRetry={() => {
              void refetch();
            }}
          />
        )}
        {normalizedSearch && data && !hasResults && (
          <EmptyState message="일치하는 아이템이 없어요" />
        )}
        {hasResults && (
          <>
            <p className={styles['count']} role="status">
              검색 결과 {results.length}개
            </p>
            <ul className={styles['results']}>
              {results.map((item) => (
                <li key={item.id}>
                  <Link
                    href={`/catalog/${item.type}?categoryId=${item.categoryId}#game-item-${item.id}`}
                    onNavigate={handleResultNavigate}
                    prefetch={false}
                    scroll={false}
                  >
                    <span>{item.name}</span>
                    <span className={styles['classification']}>
                      {GAME_ITEM_TYPES[item.type]}
                      {item.categoryName && ` / ${item.categoryName}`}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </section>
    </main>
  );
}

function subscribeToSearchUrl(onChange: () => void) {
  window.addEventListener('popstate', onChange);
  // replaceState는 popstate를 발생시키지 않으므로 입력에서 별도로 알립니다.
  window.addEventListener(SEARCH_URL_CHANGE_EVENT, onChange);

  return () => {
    window.removeEventListener('popstate', onChange);
    window.removeEventListener(SEARCH_URL_CHANGE_EVENT, onChange);
  };
}

function readSearchFromLocation() {
  return new URLSearchParams(window.location.search).get('q') ?? '';
}

function normalizeName(name: string) {
  return name.replace(/\s/g, '').normalize('NFC');
}

function findMatches(entries: TGameItemSearchEntry[] | undefined, search: string) {
  if (!entries || !search) return [];

  return entries
    .flatMap((entry) => {
      const name = normalizeName(entry.name);
      const index = name.indexOf(search);
      if (index === -1) return [];

      const rank = name === search ? 0 : index === 0 ? 1 : 2;
      return [{ entry, rank }];
    })
    .sort(
      (a, b) =>
        a.rank - b.rank ||
        KOREAN_NAME_ORDER.compare(a.entry.name, b.entry.name) ||
        a.entry.id - b.entry.id,
    )
    .map(({ entry }) => entry);
}
