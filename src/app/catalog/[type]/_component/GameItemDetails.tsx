import Image from 'next/image';
import type { ReactNode } from 'react';

import type {
  TGameItem,
  TWeapon,
  TArmor,
  TSpell,
  TAshOfWar,
  TWeaponSkill,
} from '@/api/gameItem/types';
import {
  AFFINITIES,
  ATTACK_TYPES,
  ATTRIBUTES,
  CONTENTS,
  GAME_ITEM_TYPES,
  UPGRADE_MATERIALS,
} from '@/define/gameItems';

import styles from './GameItemDetails.module.scss';

type TStat = readonly [label: string, value: string | number | null | undefined];

export default function GameItemDetails({ gameItem }: { gameItem: TGameItem }) {
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

      {gameItem.effectDescription && (
        <Section title="고유 효과">
          <p className={styles['text']}>{gameItem.effectDescription}</p>
        </Section>
      )}
      {gameItem.type === 'weapon' && gameItem.weaponDetails && (
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

      <Section title="아이템 설명">
        <p className={styles['text']}>
          {gameItem.gameDescription ?? '아이템 설명이 아직 등록되지 않았습니다.'}
        </p>
      </Section>
    </article>
  );
}

function WeaponDetails({ weapon, name }: { weapon: TWeapon; name: string }) {
  const attackTypes = weapon.physicalAttackTypes
    ?.map((type) => ATTACK_TYPES[type] ?? type)
    .join(' / ');
  const scalings = Object.keys(AFFINITIES).flatMap((affinity) =>
    weapon.weaponScalings.filter((scaling) => scaling.affinity === affinity),
  );

  return (
    <>
      <StatList
        title="무기 정보"
        rows={[
          ['중량', weapon.weight],
          ['공격 속성', attackTypes === '' ? '없음' : attackTypes],
          [
            '강화 재료',
            weapon.upgradeMaterial === null
              ? null
              : (UPGRADE_MATERIALS[weapon.upgradeMaterial] ?? weapon.upgradeMaterial),
          ],
          [
            '변질',
            weapon.canChangeAffinity == null ? null : weapon.canChangeAffinity ? '가능' : '불가',
          ],
        ]}
      />
      <Section title="전투 능력치">
        <p className={styles['basis']}>
          최대 강화 기준{weapon.canChangeAffinity === true ? ' · 표준 변질' : ''}
        </p>
        <table className={styles['combat-table']}>
          <thead>
            <tr>
              <th scope="col">속성</th>
              <th scope="col">공격력</th>
              <th scope="col">가드 시 경감률</th>
            </tr>
          </thead>
          <tbody>
            {(
              [
                ['물리', weapon.attackPhysical, weapon.guardPhysical],
                ['마력', weapon.attackMagic, weapon.guardMagic],
                ['화염', weapon.attackFire, weapon.guardFire],
                ['벼락', weapon.attackLightning, weapon.guardLightning],
                ['신성', weapon.attackHoly, weapon.guardHoly],
              ] as const
            ).map(([label, attack, guard]) => (
              <tr key={label}>
                <th scope="row">{label}</th>
                <td>{formatValue(attack)}</td>
                <td>{formatValue(guard)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <dl className={styles['combat-extra']}>
          <div>
            <dt>치명</dt>
            <dd>{formatValue(weapon.critical)}</dd>
          </div>
          <div>
            <dt>가드 강도</dt>
            <dd>{formatValue(weapon.guardBoost)}</dd>
          </div>
        </dl>
      </Section>
      <StatList
        title="필요 능력치"
        isHorizontal
        rows={[
          ['근력', weapon.requiredStrength],
          ['기량', weapon.requiredDexterity],
          ['지력', weapon.requiredIntelligence],
          ['신앙', weapon.requiredFaith],
          ['신비', weapon.requiredArcane],
        ]}
      />
      <Section title={weapon.canChangeAffinity === false ? '능력 보정' : '변질별 능력 보정'}>
        {scalings.length === 0 && (
          <p className={styles['muted']}>능력 보정 정보가 아직 등록되지 않았습니다.</p>
        )}
        {scalings.length > 0 && (
          <div
            className={styles['scaling-scroll']}
            tabIndex={0}
            role="region"
            aria-label={`${name} 능력 보정`}
          >
            <table>
              <thead>
                <tr>
                  <th scope="col">{weapon.canChangeAffinity === false ? '상태' : '변질'}</th>
                  {Object.entries(ATTRIBUTES).map(([key, label]) => (
                    <th scope="col" key={key}>
                      {label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {scalings.map((scaling) => (
                  <tr key={scaling.affinity}>
                    <th scope="row">
                      {weapon.canChangeAffinity === false && scaling.affinity === 'standard'
                        ? '기본'
                        : AFFINITIES[scaling.affinity]}
                    </th>
                    {Object.keys(ATTRIBUTES).map((key) => (
                      <td key={key}>{formatValue(scaling[key as keyof typeof ATTRIBUTES])}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Section>
      <StatList
        title="상태 이상 축적"
        note="미강화 기본 수치"
        rows={[
          ['출혈', weapon.bleed],
          ['동상', weapon.frostbite],
          ['독', weapon.poison],
          ['붉은 부패', weapon.scarletRot],
          ['수면', weapon.sleep],
          ['발광', weapon.madness],
        ]}
      />
      <SkillDetails skill={weapon.weaponSkills} />
    </>
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
