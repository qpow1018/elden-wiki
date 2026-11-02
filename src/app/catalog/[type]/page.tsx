import { notFound } from 'next/navigation';

import type { TGameItemType } from '@/api/gameItem/types';
import { GAME_ITEM_TYPES } from './_define/gameItems';

import CatalogClient from './CatalogClient';

export default async function CatalogPage({ params }: { params: Promise<{ type: string }> }) {
  const { type } = await params;

  function isGameItemType(value: string): value is TGameItemType {
    return Object.hasOwn(GAME_ITEM_TYPES, value);
  }

  if (!isGameItemType(type)) notFound();

  return <CatalogClient key={type} type={type} />;
}
