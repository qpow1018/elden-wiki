import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { MAP_REGIONS } from '@/app/maps/_define/mapRegions';

import Header from '@/components/common/header/Header';

import styles from './RegionMapPage.module.scss';

export default async function RegionMapPage({ params }: { params: Promise<{ regionId: string }> }) {
  const { regionId } = await params;
  const region = MAP_REGIONS.find(({ id }) => id === regionId);

  if (!region) notFound();

  return (
    <main className={styles['region-map']}>
      <Header title={region.name} />
      <div className={styles['content']}>
        <Link href="/maps">지역 목록</Link>
        <Image
          src={region.image}
          alt={`${region.name} 지도`}
          sizes="(max-width: 480px) calc(100vw - 32px), 448px"
        />
      </div>
    </main>
  );
}
