import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { getGameItems, getGameItemCategories } from '@/api/gameItem';
import type { TReqGetGameItems } from './types';

const gameItemQuery = {
  useGetGameItems(params: Omit<TReqGetGameItems, 'signal'>) {
    return useQuery({
      queryKey: ['gameItem', 'list', params],
      queryFn: ({ signal }) => getGameItems({ ...params, signal }),
    });
  },
  useGetInfiniteGameItems(params: Omit<TReqGetGameItems, 'signal' | 'page'>) {
    return useInfiniteQuery({
      queryKey: ['gameItem', 'infiniteList', params],
      queryFn: ({ pageParam, signal }) => getGameItems({ ...params, page: pageParam, signal }),
      initialPageParam: 1,
      getNextPageParam: (lastPage, _pages, lastPageParam) => {
        if (
          lastPage.gameItems.length === 0 ||
          lastPageParam * params.pageSize >= lastPage.totalCount
        ) {
          return undefined;
        }
        return lastPageParam + 1;
      },
    });
  },
  useGetGameItemCategories() {
    return useQuery({
      queryKey: ['gameItem', 'categories'],
      queryFn: ({ signal }) => getGameItemCategories({ signal }),
    });
  },
};

export default gameItemQuery;
