'use client';

import type { StaticImageData } from 'next/image';
import Link from 'next/link';

import type { getMapMarkerSamples } from './mapMarkerSamples';

import Header from '@/components/common/header/Header';
import RegionMap from './_component/RegionMap';

import styles from './RegionMapPageClient.module.scss';

export default function RegionMapPageClient({
  image,
  name,
  markers,
}: {
  image: StaticImageData;
  name: string;
  markers: ReturnType<typeof getMapMarkerSamples>;
}) {
  return (
    <main className={styles['region-map']}>
      <Header title={name} hideOnScroll={false} />
      <div className={styles['content']}>
        <Link href="/maps">지역 목록</Link>
        <RegionMap image={image} name={name} markers={markers} />
      </div>
    </main>
  );
}
