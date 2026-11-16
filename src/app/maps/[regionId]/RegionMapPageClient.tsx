'use client';

import type { StaticImageData } from 'next/image';
import Link from 'next/link';

import type { getMapMarkerSamples } from './mapMarkerSamples';

import Header from '@/components/common/header/Header';
import RegionMap from './_component/RegionMap';

import styles from './RegionMapPageClient.module.scss';

import { MdArrowBack } from 'react-icons/md';

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
      <Header
        title={name}
        hideOnScroll={false}
        leftComponents={
          <Link href="/maps" className={styles['back-link']} aria-label="지역 목록으로 돌아가기">
            <MdArrowBack size={22} aria-hidden="true" />
          </Link>
        }
      />
      <RegionMap image={image} name={name} markers={markers} />
    </main>
  );
}
