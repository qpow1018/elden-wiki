import Link from 'next/link';

import { MAP_REGIONS } from './_define/mapRegions';

import Header from '@/components/common/header/Header';

import styles from './MapsPage.module.scss';

import { MdChevronRight } from 'react-icons/md';

export default function MapsPage() {
  return (
    <main className={styles['maps']}>
      <Header title="지도" />
      <h2 id="base-game-maps" className={styles['list-title']}>
        본편
      </h2>
      <ol className={styles['regions']} aria-labelledby="base-game-maps" role="list">
        {MAP_REGIONS.map(({ id, name }, index) => (
          <li key={id}>
            <Link href={`/maps/${id}`}>
              <span className={styles['region-number']} aria-hidden="true">
                {index + 1}
              </span>
              <span className={styles['region-name']}>{name}</span>
              <MdChevronRight size={16} aria-hidden="true" />
            </Link>
          </li>
        ))}
      </ol>
    </main>
  );
}
