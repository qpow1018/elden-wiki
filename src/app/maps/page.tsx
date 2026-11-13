import Link from 'next/link';

import { MAP_REGIONS } from './_define/mapRegions';

import Header from '@/components/common/header/Header';

import styles from './MapsPage.module.scss';

import { MdChevronRight } from 'react-icons/md';

export default function MapsPage() {
  return (
    <main className={styles['maps']}>
      <Header title="지도" />
      <section className={styles['regions']} aria-labelledby="map-regions">
        <h2 id="map-regions">지역 선택</h2>
        <ul>
          {MAP_REGIONS.map(({ id, name }) => (
            <li key={id}>
              <Link href={`/maps/${id}`}>
                <span>{name}</span>
                <MdChevronRight size={14} aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
