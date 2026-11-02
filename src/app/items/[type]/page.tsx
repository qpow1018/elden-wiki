import { notFound } from 'next/navigation';

import { isItemType } from './_define/items';

import ItemsClient from './ItemsClient';

export default async function ItemsPage({ params }: { params: Promise<{ type: string }> }) {
  const { type } = await params;
  if (!isItemType(type)) notFound();

  return <ItemsClient key={type} type={type} />;
}
