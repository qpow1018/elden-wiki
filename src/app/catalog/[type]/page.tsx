import { notFound } from 'next/navigation';

import { CATALOG_TYPES, type TCatalogType } from './_define/gameItems';

import CatalogClient from './CatalogClient';

export default async function CatalogPage({ params }: { params: Promise<{ type: string }> }) {
  const { type } = await params;

  function isCatalogType(value: string): value is TCatalogType {
    return Object.hasOwn(CATALOG_TYPES, value);
  }

  if (!isCatalogType(type)) notFound();

  return <CatalogClient key={type} type={type} />;
}
