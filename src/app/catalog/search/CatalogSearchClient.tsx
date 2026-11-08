'use client';

import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import gameItemQuery from '@/api/gameItem/gameItemQuery';
import type { TGameItemSearchEntry } from '@/api/gameItem/types';
import { GAME_ITEM_TYPES } from '@/define/gameItems';

import EmptyState from '@/components/common/empty/EmptyState';
import ErrorState from '@/components/common/error/ErrorState';
import TextInput from '@/components/common/form/TextInput';
import BoxLoading from '@/components/common/loading/BoxLoading';

import styles from './CatalogSearchClient.module.scss';

const KOREAN_NAME_ORDER = new Intl.Collator('ko');

export default function CatalogSearchClient() {
  // 뒤로 가기에서는 서버 페이지가 캐시되어도 현재 주소의 검색어를 사용합니다.
  const currentSearch = useSearchParams().get('q') ?? '';
  const [input, setInput] = useState(currentSearch);
  const [search, setSearch] = useState(currentSearch);
  const isComposing = useRef(false);
  const hasRestoredScroll = useRef(false);
  const { data, isPending, isError, refetch } = gameItemQuery.useGetGameItemSearchEntries();
  const normalizedSearch = normalizeName(search);
  const results = useMemo(() => findMatches(data, normalizedSearch), [data, normalizedSearch]);
  const hasResults = results.length > 0;

  useLayoutEffect(() => {
    if (!hasResults || hasRestoredScroll.current) return;

    hasRestoredScroll.current = true;
    const scrollY = window.history.state?.catalogSearchScrollY;
    if (typeof scrollY === 'number') window.scrollTo({ top: scrollY, behavior: 'instant' });
  }, [hasResults]);

  function updateSearch(value: string) {
    if (value === search) return;

    setSearch(value);
    hasRestoredScroll.current = true;

    const url = new URL(window.location.href);
    if (normalizeName(value)) url.searchParams.set('q', value);
    else url.searchParams.delete('q');
    window.history.replaceState({ catalogSearchScrollY: 0 }, '', url);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  function handleInputChange(value: string) {
    setInput(value);
    if (!isComposing.current) updateSearch(value);
  }

  function saveScrollPosition() {
    window.history.replaceState({ catalogSearchScrollY: window.scrollY }, '');
  }

  return (
    <section className={styles['search']} aria-label="아이템 검색">
      <TextInput
        type="search"
        aria-label="아이템 이름"
        placeholder="아이템 이름으로 검색"
        value={input}
        onChange={handleInputChange}
        onCompositionStart={() => {
          isComposing.current = true;
        }}
        onCompositionEnd={(event) => {
          isComposing.current = false;
          handleInputChange(event.currentTarget.value);
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
      {normalizedSearch && data && !hasResults && <EmptyState message="일치하는 아이템이 없어요" />}
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
                  onNavigate={saveScrollPosition}
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
  );
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
