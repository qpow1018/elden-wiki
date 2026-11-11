import Image from 'next/image';

import type { TGameItem } from '@/api/gameItem/types';
import { CONTENTS, GAME_ITEM_TYPES } from '@/define/gameItems';

import AshOfWarDetails from './details/AshOfWarDetails';
import SpellDetails from './details/SpellDetails';
import SpiritAshDetails from './details/SpiritAshDetails';
import TalismanDetails from './details/TalismanDetails';
import WeaponDetails from './details/WeaponDetails';

import styles from './GameItemDetails.module.scss';

export default function GameItemDetails({ gameItem }: { gameItem: TGameItem }) {
  return (
    <article id={`game-item-${gameItem.id}`} className={styles['game-item-details']}>
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
            <p>{gameItem.gameItemCategories?.name ?? GAME_ITEM_TYPES[gameItem.type]}</p>
            {gameItem.contentCode !== 'base_game' && (
              <p>
                <span aria-hidden="true">·&nbsp;</span>
                {Object.hasOwn(CONTENTS, gameItem.contentCode)
                  ? CONTENTS[gameItem.contentCode as keyof typeof CONTENTS]
                  : gameItem.contentCode}
              </p>
            )}
          </div>
          <h2 tabIndex={-1}>{gameItem.name}</h2>
        </div>
      </header>

      <div className={styles['content']}>
        {['weapon', 'other_weapon'].includes(gameItem.type) && gameItem.weaponDetails && (
          <WeaponDetails weapon={gameItem.weaponDetails} name={gameItem.name} />
        )}

        {gameItem.type === 'talisman' && <TalismanDetails talisman={gameItem.talismanDetails} />}

        {gameItem.type === 'spirit_ash' && (
          <SpiritAshDetails spiritAsh={gameItem.spiritAshDetails} />
        )}

        {gameItem.type === 'ash_of_war' && <AshOfWarDetails ashOfWar={gameItem.ashOfWarDetails} />}

        {['sorcery', 'incantation'].includes(gameItem.type) && (
          <SpellDetails spell={gameItem.spellDetails} />
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
      </div>
    </article>
  );
}
