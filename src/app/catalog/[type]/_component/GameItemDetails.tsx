import Image from 'next/image';

import type { TGameItem } from '@/api/gameItem/types';
import { CONTENTS, GAME_ITEM_TYPES } from '@/define/gameItems';

import WeaponDetails from './details/WeaponDetails';

import styles from './GameItemDetails.module.scss';

export default function GameItemDetails({ gameItem }: { gameItem: TGameItem }) {
  const hasWeaponDetails =
    ['weapon', 'catalyst', 'other_weapon'].includes(gameItem.type) &&
    gameItem.weaponDetails !== null;

  return (
    <article className={styles['game-item-details']}>
      <header className={styles['identity']}>
        <div className={styles['image']}>
          {gameItem.imageUrl && (
            <Image
              src={gameItem.imageUrl}
              alt={gameItem.name}
              width={80}
              height={80}
              unoptimized
              referrerPolicy="no-referrer"
            />
          )}
        </div>
        <div className={styles['heading']}>
          <div className={styles['classification']}>
            <p className={styles['category']}>
              {gameItem.gameItemCategories?.name ?? GAME_ITEM_TYPES[gameItem.type]}
            </p>
            {gameItem.contentCode !== 'base_game' && (
              <>
                <span aria-hidden="true">·</span>
                <p className={styles['content']}>
                  {Object.hasOwn(CONTENTS, gameItem.contentCode)
                    ? CONTENTS[gameItem.contentCode as keyof typeof CONTENTS]
                    : gameItem.contentCode}
                </p>
              </>
            )}
          </div>
          <h2>{gameItem.name}</h2>
        </div>
      </header>

      {hasWeaponDetails && gameItem.weaponDetails && (
        <WeaponDetails weapon={gameItem.weaponDetails} name={gameItem.name} />
      )}

      {gameItem.effectDescription && (
        <section className={styles['effects']}>
          <h3>부가 효과</h3>
          <p>{gameItem.effectDescription}</p>
        </section>
      )}

      <section className={styles['description']}>
        <h3>아이템 설명</h3>
        <p>{gameItem.gameDescription ?? '아이템 설명이 아직 등록되지 않았습니다.'}</p>
      </section>
    </article>
  );
}
