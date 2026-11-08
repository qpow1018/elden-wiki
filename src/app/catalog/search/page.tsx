import CatalogSearchClient from './CatalogSearchClient';

export default async function CatalogSearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string | string[] }>;
}) {
  const { q } = await searchParams;
  const initialSearch = (Array.isArray(q) ? q[0] : q) ?? '';

  return <CatalogSearchClient initialSearch={initialSearch} />;
}
