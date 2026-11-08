'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import gameItemQuery from '@/api/gameItem/gameItemQuery';
import type { TGameItemType } from '@/api/gameItem/types';

import EmptyState from '@/components/common/empty/EmptyState';
import ErrorState from '@/components/common/error/ErrorState';
import Header from '@/components/common/header/Header';
import BoxLoading from '@/components/common/loading/BoxLoading';
import ScrollToTop from '@/components/common/scrollToTop/ScrollToTop';
import CatalogToolbar from './_component/CatalogToolbar';
import CatalogNavigation from './_component/CatalogNavigation';
import GameItemDetails from './_component/GameItemDetails';

import styles from './CatalogClient.module.scss';

import { MdSearch } from 'react-icons/md';

export default function CatalogClient(props: {
  type: TGameItemType;
  categoryId: number | undefined;
}) {
  const { type, categoryId } = props;

  const router = useRouter();
  const categoriesQuery = gameItemQuery.useGetGameItemCategories();
  const categories = categoriesQuery.data?.filter((category) => category.type === type) ?? [];
  const selectedCategory =
    categories.find((category) => category.id === categoryId) ?? categories[0];

  function handleCategoryChange(categoryId: number) {
    if (categoryId === selectedCategory?.id) return;
    const nextParams = new URLSearchParams(window.location.search);
    nextParams.set('categoryId', String(categoryId));
    router.push(`/catalog/${type}?${nextParams}`, { scroll: true });
  }

  return (
    <main className={styles['page']}>
      <Header
        title="아이템 도감"
        rightComponents={
          <Link href="/catalog/search" aria-label="도감 검색" className={styles['search-link']}>
            <MdSearch aria-hidden="true" />
          </Link>
        }
      />
      <CatalogNavigation type={type} />
      <CatalogToolbar
        type={type}
        categories={categories}
        categoryId={selectedCategory?.id}
        onChange={handleCategoryChange}
      />
      {categoriesQuery.isPending && <BoxLoading />}
      {categoriesQuery.isError && (
        <ErrorState
          message="분류를 불러오지 못했습니다."
          onRetry={() => {
            void categoriesQuery.refetch();
          }}
        />
      )}
      {categoriesQuery.isSuccess && !selectedCategory && (
        <EmptyState message="표시할 아이템이 없습니다." />
      )}
      {categoriesQuery.isSuccess && selectedCategory && (
        <CatalogList type={type} categoryId={selectedCategory.id} />
      )}
      <ScrollToTop />
    </main>
  );
}

function CatalogList({ type, categoryId }: { type: TGameItemType; categoryId: number }) {
  const { data, isLoading, isError, isSuccess, refetch } = gameItemQuery.useGetGameItems({
    categoryId,
    type,
  });

  const gameItems = data?.gameItems ?? [];
  const hasItems = gameItems.length > 0;

  // 검색 결과의 해시 대상은 도감 목록이 렌더링된 뒤에 찾을 수 있습니다.
  useEffect(() => {
    if (!hasItems) return;

    const { hash } = window.location;
    if (!/^#game-item-\d+$/.test(hash)) return;

    const frame = requestAnimationFrame(() => {
      const item = document.getElementById(hash.slice(1));
      item?.querySelector('h2')?.focus({ preventScroll: true });
      item?.scrollIntoView({ behavior: 'instant', block: 'start' });
    });

    return () => cancelAnimationFrame(frame);
  }, [categoryId, hasItems, type]);

  return (
    <>
      {isLoading && <BoxLoading />}
      {isError && !data && (
        <ErrorState
          message="아이템 정보를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요."
          onRetry={() => {
            void refetch();
          }}
        />
      )}
      {isSuccess && gameItems.length === 0 && <EmptyState message="표시할 아이템이 없습니다." />}

      <div>
        {gameItems.map((gameItem) => (
          <GameItemDetails key={gameItem.id} gameItem={gameItem} />
        ))}
      </div>
    </>
  );
}
