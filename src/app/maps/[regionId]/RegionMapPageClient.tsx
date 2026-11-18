'use client';

import type { StaticImageData } from 'next/image';

import type { getMapMarkerSamples } from './mapMarkerSamples';

import Header from '@/components/common/header/Header';
import RegionMap from './_component/RegionMap';

import styles from './RegionMapPageClient.module.scss';

export default function RegionMapPageClient({
  image,
  name,
  worldWidth,
  markers,
}: {
  image: StaticImageData;
  name: string;
  worldWidth?: number;
  markers: ReturnType<typeof getMapMarkerSamples>;
}) {
  return (
    <main className={styles['region-map']}>
      <Header title={name} goBack="/maps" isScrollHideEnabled={false} />
      <RegionMap image={image} name={name} worldWidth={worldWidth} markers={markers} />
    </main>
  );
}
