import { notFound } from 'next/navigation';

import { isGameItemType } from './_define/gameItems';

import CatalogClient from './CatalogClient';

export default async function CatalogPage({ params }: { params: Promise<{ type: string }> }) {
  const { type } = await params;
  if (!isGameItemType(type)) notFound();

  return <CatalogClient key={type} type={type} />;
}
