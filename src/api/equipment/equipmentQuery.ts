import { useQuery } from '@tanstack/react-query';

import { getEquipment, getEquipmentCategories } from '@/api/equipment';
import type { TReqGetEquipment } from './types';

const equipmentQuery = {
  useGetEquipment(params: Omit<TReqGetEquipment, 'signal'>) {
    return useQuery({
      queryKey: ['equipment', 'list', params],
      queryFn: ({ signal }) => getEquipment({ ...params, signal }),
    });
  },
  useGetEquipmentCategories() {
    return useQuery({
      queryKey: ['equipment', 'categories'],
      queryFn: ({ signal }) => getEquipmentCategories({ signal }),
    });
  },
};

export default equipmentQuery;
