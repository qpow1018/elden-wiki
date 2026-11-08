import { Suspense } from 'react';

import Header from '@/components/common/header/Header';
import BoxLoading from '@/components/common/loading/BoxLoading';

import CatalogSearchClient from './CatalogSearchClient';

export default function CatalogSearchPage() {
  return (
    <main>
      <Header title="도감 검색" />
      <Suspense fallback={<BoxLoading />}>
        <CatalogSearchClient />
      </Suspense>
    </main>
  );
}
