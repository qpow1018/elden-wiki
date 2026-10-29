import { getApiClient } from '@/api';
import type {
  TReqGetEquipment,
  TReqGetEquipmentCategories,
  TResGetEquipment,
  TResGetEquipmentCategories,
} from './types';

export async function getEquipment({
  page,
  pageSize,
  search,
  type,
  categoryId,
  contentCode,
  signal,
}: TReqGetEquipment): Promise<TResGetEquipment> {
  const client = getApiClient();
  const start = (page - 1) * pageSize;
  const request = client
    .from('items')
    .select(
      'id,name,type,image_url,content_code,game_description,item_categories(name),weapon_details(*,weapon_skills(name,description,fp_cost_text),weapon_scalings(*))',
      { count: 'exact' },
    )
    .order('id')
    .range(start, start + pageSize - 1);

  if (search?.trim()) {
    const escapedSearch = search.trim().replace(/[\\%_]/g, '\\$&');
    request.ilike('name', `%${escapedSearch}%`);
  }
  if (type) request.eq('type', type);
  if (categoryId !== undefined) request.eq('category_id', categoryId);
  if (contentCode) request.eq('content_code', contentCode);
  if (signal) request.abortSignal(signal);

  const { data, count } = await request.throwOnError();

  return {
    items: data.map((row) => ({
      ...row,
      // 복합 외래키 관계는 배열로 응답하지만 item_id PK가 최대 한 행을 보장합니다.
      weapon_details: row.weapon_details[0] ?? null,
    })),
    totalCount: count ?? 0,
  };
}

export async function getEquipmentCategories({
  signal,
}: TReqGetEquipmentCategories = {}): Promise<TResGetEquipmentCategories> {
  const client = getApiClient();
  const request = client.from('item_categories').select('id,name,type').order('name');
  if (signal) request.abortSignal(signal);

  const { data } = await request.throwOnError();
  return data;
}
