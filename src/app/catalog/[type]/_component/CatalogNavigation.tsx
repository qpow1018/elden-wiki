import { CATALOG_TYPES, type TCatalogType } from '@/app/catalog/[type]/_define/gameItems';

import Link from 'next/link';

import styles from './CatalogNavigation.module.scss';

export default function CatalogNavigation({ type }: { type: TCatalogType }) {
  return (
    <nav className={styles['type-navigation']} aria-label="아이템 도감 종류">
      {[Object.entries(CATALOG_TYPES).slice(0, 4), Object.entries(CATALOG_TYPES).slice(4)].map(
        (types) => (
          <div className={styles['type-row']} key={types[0][0]}>
            {types.map(([catalogType, { label }]) => (
              <Link
                key={catalogType}
                href={`/catalog/${catalogType}`}
                aria-current={catalogType === type ? 'page' : undefined}
              >
                {label}
              </Link>
            ))}
          </div>
        ),
      )}
    </nav>
  );
}
