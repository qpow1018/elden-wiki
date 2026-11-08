import { useQuery } from '@tanstack/react-query';

import { getGameItems, getGameItemCategories, getGameItemSearchEntries } from '@/api/gameItem';
import type { TReqGetGameItems } from './types';

const gameItemQuery = {
  useGetGameItemSearchEntries() {
    return useQuery({
      queryKey: ['gameItem', 'searchEntries'],
      queryFn: ({ signal }) => getGameItemSearchEntries({ signal }),
    });
  },
  useGetGameItems(params: Omit<TReqGetGameItems, 'signal'>) {
    return useQuery({
      queryKey: ['gameItem', 'list', params],
      queryFn: ({ signal }) => getGameItems({ ...params, signal }),
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
