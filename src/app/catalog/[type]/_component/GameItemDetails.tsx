import Image from 'next/image';
import type { ReactNode } from 'react';

import type { TGameItem, TArmor, TSpell, TAshOfWar, TWeaponSkill } from '@/api/gameItem/types';
import { AFFINITIES, CONTENTS, GAME_ITEM_TYPES } from '@/define/gameItems';

import WeaponDetails from './details/WeaponDetails';

import styles from './GameItemDetails.module.scss';

type TStat = readonly [label: string, value: string | number | null | undefined];

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
              width={92}
              height={92}
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
                  {CONTENTS[gameItem.contentCode] ?? gameItem.contentCode}
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
      {gameItem.type === 'armor' && gameItem.armorDetails && (
        <ArmorDetails armor={gameItem.armorDetails} />
      )}
      {gameItem.type === 'talisman' && gameItem.talismanDetails && (
        <StatList title="장비 정보" rows={[['중량', gameItem.talismanDetails.weight]]} />
      )}
      {gameItem.type === 'spell' && gameItem.spellDetails && (
        <SpellDetails spell={gameItem.spellDetails} />
      )}
      {gameItem.type === 'ash_of_war' && gameItem.ashOfWarDetails && (
        <AshOfWarDetails ashOfWar={gameItem.ashOfWarDetails} />
      )}

      {gameItem.effectDescription && (
        <Section title="부가 효과">
          <p className={styles['text']}>{gameItem.effectDescription}</p>
        </Section>
      )}
      <Section title="아이템 설명">
        <p className={styles['text']}>
          {gameItem.gameDescription ?? '아이템 설명이 아직 등록되지 않았습니다.'}
        </p>
      </Section>
    </article>
  );
}

function ArmorDetails({ armor }: { armor: TArmor }) {
  return (
    <>
      <StatList
        title="장비 정보"
        rows={[
          ['중량', armor.weight],
          ['강인도', armor.poise],
        ]}
      />
      <div className={styles['stat-columns']}>
        <StatList
          title="물리 경감률"
          rows={[
            ['물리', armor.negationPhysical],
            ['타격', armor.negationStrike],
            ['참격', armor.negationSlash],
            ['관통', armor.negationPierce],
          ]}
        />
        <StatList
          title="속성 경감률"
          rows={[
            ['마력', armor.negationMagic],
            ['화염', armor.negationFire],
            ['벼락', armor.negationLightning],
            ['신성', armor.negationHoly],
          ]}
        />
      </div>
      <StatList
        title="내성"
        rows={[
          ['면역', armor.immunity],
          ['강건', armor.robustness],
          ['이성', armor.focus],
          ['항사', armor.vitality],
        ]}
      />
    </>
  );
}

function SpellDetails({ spell }: { spell: TSpell }) {
  return (
    <>
      <StatList
        title="시전 정보"
        rows={[
          ['소비 FP', spell.fpCostText],
          ['사용 슬롯', spell.slotsUsed],
        ]}
      />
      <StatList
        title="필요 능력치"
        isHorizontal
        rows={[
          ['지력', spell.requiredIntelligence],
          ['신앙', spell.requiredFaith],
          ['신비', spell.requiredArcane],
        ]}
      />
    </>
  );
}

function AshOfWarDetails({ ashOfWar }: { ashOfWar: TAshOfWar }) {
  return (
    <>
      <StatList
        title="전회 정보"
        rows={[
          [
            '기본 변질',
            ashOfWar.nativeAffinity === null
              ? null
              : (AFFINITIES[ashOfWar.nativeAffinity] ?? ashOfWar.nativeAffinity),
          ],
        ]}
      />
      <SkillDetails skill={ashOfWar.weaponSkills} />
      <Section title="적용 가능 무기">
        <p className={styles['text']}>
          {ashOfWar.applicableArmamentsText ?? '적용 대상이 아직 등록되지 않았습니다.'}
        </p>
      </Section>
    </>
  );
}

function SkillDetails({ skill }: { skill: TWeaponSkill | null }) {
  return (
    <Section title="전투 기술">
      {!skill && <p className={styles['muted']}>전투 기술이 아직 등록되지 않았습니다.</p>}
      {skill && (
        <>
          <div className={styles['skill-heading']}>
            <h4>{skill.name}</h4>
            <span>소비 FP {formatValue(skill.fpCostText)}</span>
          </div>
          <p className={styles['text']}>
            {skill.description ?? '기술 설명이 아직 등록되지 않았습니다.'}
          </p>
        </>
      )}
    </Section>
  );
}

function StatList({
  title,
  rows,
  note,
  isHorizontal = false,
}: {
  title: string;
  rows: readonly TStat[];
  note?: string;
  isHorizontal?: boolean;
}) {
  return (
    <Section title={title}>
      {note && <p className={styles['muted']}>{note}</p>}
      <dl className={`${styles['stat-list']} ${isHorizontal ? styles['is-horizontal'] : ''}`}>
        {rows.map(([label, value]) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>{formatValue(value)}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className={styles['section']}>
      <h3>{title}</h3>
      {children}
    </section>
  );
}

function formatValue(value: string | number | null | undefined) {
  return value == null ? '미확인' : String(value);
}
