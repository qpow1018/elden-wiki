'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import gameItemQuery from '@/api/gameItem/gameItemQuery';
import type { TGameItemType } from '@/api/gameItem/types';
import { GAME_ITEM_TYPES } from '@/define/gameItems';

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

// 전체 보기를 제공하고 기본 화면으로 사용하는 도감 종류입니다.
const VIEW_ALL_TYPES: readonly TGameItemType[] = [
  'talisman', // 탈리스만
  'spirit_ash', // 뼛가루
  'ash_of_war', // 전회
  'sorcery', // 마술
  'incantation', // 기도
];

export default function CatalogClient(props: {
  type: TGameItemType;
  categoryId: number | undefined;
}) {
  const { type, categoryId } = props;

  const router = useRouter();

  const categoriesQuery = gameItemQuery.useGetGameItemCategories();
  const categories = categoriesQuery.data?.filter((category) => category.type === type) ?? [];

  const canViewAll = VIEW_ALL_TYPES.includes(type);
  const categoryOptions =
    canViewAll && categories.length > 0
      ? [{ id: undefined, name: `${GAME_ITEM_TYPES[type]} 전체` }, ...categories]
      : categories;
  const defaultCategory = categoryOptions[0];
  const selectedCategory =
    categoryOptions.find((option) => option.id === categoryId) ?? defaultCategory;

  function handleCategoryChange(nextCategoryId: number | undefined) {
    if (nextCategoryId === selectedCategory?.id && nextCategoryId === categoryId) return;
    const nextParams = new URLSearchParams(window.location.search);
    if (nextCategoryId === undefined) nextParams.delete('categoryId');
    else nextParams.set('categoryId', String(nextCategoryId));
    const query = nextParams.toString();
    router.push(`/catalog/${type}${query ? `?${query}` : ''}`, { scroll: true });
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
        categoryOptions={categoryOptions}
        categoryId={selectedCategory?.id}
        onCategoryChange={handleCategoryChange}
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
      {categoriesQuery.isSuccess && categories.length === 0 && (
        <EmptyState message="표시할 아이템이 없습니다." />
      )}
      {categoriesQuery.isSuccess && categories.length > 0 && (
        <CatalogList type={type} categoryId={selectedCategory?.id} />
      )}
      <ScrollToTop />
    </main>
  );
}

function CatalogList({
  type,
  categoryId,
}: {
  type: TGameItemType;
  categoryId: number | undefined;
}) {
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
