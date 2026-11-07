import { notFound } from 'next/navigation';

import type { TGameItemType } from '@/api/gameItem/types';
import { GAME_ITEM_TYPES } from '@/define/gameItems';

import CatalogClient from './CatalogClient';

export default async function CatalogPage({
  params,
  searchParams,
}: {
  params: Promise<{ type: string }>;
  searchParams: Promise<{ categoryId?: string | string[] }>;
}) {
  const { type } = await params;
  const { categoryId } = await searchParams;

  function isGameItemType(value: string): value is TGameItemType {
    return Object.hasOwn(GAME_ITEM_TYPES, value);
  }

  if (!isGameItemType(type)) notFound();

  return (
    <CatalogClient
      key={type}
      type={type}
      categoryId={typeof categoryId === 'string' ? Number(categoryId) : undefined}
    />
  );
}
