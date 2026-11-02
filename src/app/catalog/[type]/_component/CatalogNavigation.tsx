import Link from 'next/link';

import type { TGameItemType } from '@/api/gameItem/types';
import { GAME_ITEM_TYPES } from '@/app/catalog/[type]/_define/gameItems';

import styles from './CatalogNavigation.module.scss';

export default function CatalogNavigation({ type }: { type: TGameItemType }) {
  return (
    <nav className={styles['type-navigation']} aria-label="아이템 도감 종류">
      {[Object.entries(GAME_ITEM_TYPES).slice(0, 4), Object.entries(GAME_ITEM_TYPES).slice(4)].map(
        (types) => (
          <div className={styles['type-row']} key={types[0][0]}>
            {types.map(([gameItemType, label]) => (
              <Link
                key={gameItemType}
                href={`/catalog/${gameItemType}`}
                aria-current={gameItemType === type ? 'page' : undefined}
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
