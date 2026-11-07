'use client';

import { useRouter } from 'next/navigation';

import gameItemQuery from '@/api/gameItem/gameItemQuery';
import type { TGameItemType } from '@/api/gameItem/types';

import EmptyState from '@/components/common/empty/EmptyState';
import ErrorState from '@/components/common/error/ErrorState';
import Header from '@/components/common/header/Header';
import InfiniteScroll from '@/components/common/infiniteScroll/InfiniteScroll';
import BoxLoading from '@/components/common/loading/BoxLoading';
import ScrollToTop from '@/components/common/scrollToTop/ScrollToTop';
import CatalogToolbar from './_component/CatalogToolbar';
import CatalogNavigation from './_component/CatalogNavigation';
import GameItemDetails from './_component/GameItemDetails';

import styles from './CatalogClient.module.scss';

const PAGE_SIZE = 10;

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
      <Header title="아이템 도감" />
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
  const {
    data,
    isLoading,
    isError,
    isSuccess,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isFetchNextPageError,
  } = gameItemQuery.useGetInfiniteGameItems({
    categoryId,
    type,
    pageSize: PAGE_SIZE,
  });

  const gameItems = data?.pages.flatMap((page) => page.gameItems) ?? [];

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

      {gameItems.length > 0 && (
        <InfiniteScroll
          onLoadMore={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          isFetchNextPageError={isFetchNextPageError}
          observerPositionFromBottom={100}
          enabled={!isFetching && !isError}
        >
          {gameItems.map((gameItem) => (
            <GameItemDetails key={gameItem.id} gameItem={gameItem} />
          ))}
        </InfiniteScroll>
      )}
    </>
  );
}
