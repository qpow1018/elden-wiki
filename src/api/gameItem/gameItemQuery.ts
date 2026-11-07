import { useQuery } from '@tanstack/react-query';

import { getGameItems, getGameItemCategories } from '@/api/gameItem';
import type { TReqGetGameItems } from './types';

const gameItemQuery = {
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
