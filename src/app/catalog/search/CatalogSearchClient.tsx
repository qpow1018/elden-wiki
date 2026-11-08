'use client';

import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';

import gameItemQuery from '@/api/gameItem/gameItemQuery';
import { GAME_ITEM_TYPES } from '@/define/gameItems';
import { findMatches, normalizeName } from './_util/searchGameItems';
import { useCatalogSearchUrl } from './_util/useCatalogSearchUrl';

import ErrorState from '@/components/common/error/ErrorState';
import TextInput from '@/components/common/form/TextInput';
import Header from '@/components/common/header/Header';
import BoxLoading from '@/components/common/loading/BoxLoading';

import styles from './CatalogSearchClient.module.scss';

import { MdSearch } from 'react-icons/md';

export default function CatalogSearchClient({ initialSearch }: { initialSearch: string }) {
  const {
    search: committedSearch,
    updateSearch,
    restoreScroll,
    handleResultNavigate,
  } = useCatalogSearchUrl(initialSearch);
  const { data, isPending, isError, refetch } = gameItemQuery.useGetGameItemSearchEntries();

  const [composingInput, setComposingInput] = useState<string | null>(null);

  const isComposing = useRef(false);
  const inputValue = composingInput ?? committedSearch;
  const normalizedInput = normalizeName(inputValue);
  const results = useMemo(() => findMatches(data, normalizedInput), [data, normalizedInput]);
  const hasResults = results.length > 0;

  useLayoutEffect(() => {
    if (hasResults && composingInput === null) restoreScroll();
  }, [composingInput, hasResults, restoreScroll]);

  function handleInputChange(value: string) {
    if (isComposing.current) setComposingInput(value);
    else updateSearch(value);
  }

  function handleClearSearch() {
    isComposing.current = false;
    setComposingInput(null);
    updateSearch('');
  }

  return (
    <main>
      <Header title="도감 검색" />

      <section className={styles['search']} aria-label="아이템 검색">
        <TextInput
          type="search"
          startIcon={<MdSearch size={18} />}
          aria-label="아이템 이름"
          placeholder="아이템 이름으로 검색"
          value={inputValue}
          onChange={handleInputChange}
          onClear={handleClearSearch}
          onCompositionStart={() => {
            isComposing.current = true;
          }}
          onCompositionEnd={(event) => {
            isComposing.current = false;
            setComposingInput(null);
            updateSearch(event.currentTarget.value);
          }}
        />
        {!normalizedInput && (
          <p className={styles['hint']}>이름의 일부만 입력해도 찾을 수 있어요</p>
        )}
        {normalizedInput && isPending && <BoxLoading />}
        {normalizedInput && !data && isError && (
          <ErrorState
            message="검색 결과를 불러오지 못했습니다."
            onRetry={() => {
              void refetch();
            }}
          />
        )}
        {normalizedInput && data && !hasResults && (
          <p className={styles['hint']} role="status">
            일치하는 아이템이 없어요
          </p>
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
                    <span className={styles['classification']}>
                      {GAME_ITEM_TYPES[item.type]}
                      {item.categoryName && ` / ${item.categoryName}`}
                    </span>
                    <span className={styles['name']}>{item.name}</span>
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
