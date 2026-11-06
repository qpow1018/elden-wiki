import { useState } from 'react';

import type { TWeapon } from '@/api/gameItem/types';
import { AFFINITIES, ATTACK_TYPES, ATTRIBUTES, UPGRADE_MATERIALS } from '@/define/gameItems';

import Modal from '@/components/common/modal/Modal';

import styles from './WeaponDetails.module.scss';

export default function WeaponDetails({
  weapon,
  name,
  effectDescription,
}: {
  weapon: TWeapon;
  name: string;
  effectDescription: string | null;
}) {
  const scalings = Object.keys(AFFINITIES).flatMap((affinity) =>
    weapon.weaponScalings.filter((scaling) => scaling.affinity === affinity),
  );

  const standardScaling = weapon.weaponScalings.find((scaling) => scaling.affinity === 'standard');
  const buildups = [
    ['출혈', weapon.bleed],
    ['동상', weapon.frostbite],
    ['독', weapon.poison],
    ['붉은 부패', weapon.scarletRot],
    ['수면', weapon.sleep],
    ['발광', weapon.madness],
  ] as const;
  const visibleBuildups = buildups.filter(([, value]) => value !== 0);

  return (
    <div className={styles['weapon-details']}>
      <WeaponOverview weapon={weapon} />

      <section className={styles['basic-scaling']}>
        <h3>기본 능력 보정</h3>
        <p className={styles['basis']}>
          최대 강화 기준{weapon.canChangeAffinity === true ? ' · 표준 변질' : ''}
        </p>
        {standardScaling ? (
          <dl>
            {Object.entries(ATTRIBUTES).map(([key, label]) => (
              <div key={key}>
                <dt>{label}</dt>
                <dd>{formatValue(standardScaling[key as keyof typeof ATTRIBUTES])}</dd>
              </div>
            ))}
          </dl>
        ) : (
          <p className={styles['muted']}>기본 능력 보정 정보가 아직 등록되지 않았습니다.</p>
        )}
      </section>
      {effectDescription && (
        <section className={styles['effects']}>
          <h3>부가 효과</h3>
          <p className={styles['description']}>{effectDescription}</p>
        </section>
      )}
      <section className={styles['buildup']}>
        <h3>상태 이상 축적</h3>
        <p className={styles['note']}>미강화 기본 수치</p>
        {visibleBuildups.length === 0 ? (
          <p className={styles['muted']}>없음</p>
        ) : (
          <dl>
            {visibleBuildups.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{formatValue(value)}</dd>
              </div>
            ))}
          </dl>
        )}
      </section>
      <section className={styles['combat']}>
        <h3>공격력</h3>
        <p className={styles['basis']}>
          최대 강화 기준{weapon.canChangeAffinity === true ? ' · 표준 변질' : ''}
        </p>
        <dl className={styles['values']}>
          {(
            [
              ['물리', weapon.attackPhysical],
              ['마력', weapon.attackMagic],
              ['화염', weapon.attackFire],
              ['벼락', weapon.attackLightning],
              ['신성', weapon.attackHoly],
              ['치명', weapon.critical],
            ] as const
          ).map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{formatValue(value)}</dd>
            </div>
          ))}
        </dl>
      </section>
      <section className={styles['guard']}>
        <h3>가드 성능</h3>
        <p className={styles['basis']}>
          최대 강화 기준{weapon.canChangeAffinity === true ? ' · 표준 변질' : ''}
        </p>
        <dl className={styles['values']}>
          {(
            [
              ['물리 경감률', weapon.guardPhysical],
              ['마력 경감률', weapon.guardMagic],
              ['화염 경감률', weapon.guardFire],
              ['벼락 경감률', weapon.guardLightning],
              ['신성 경감률', weapon.guardHoly],
              ['가드 강도', weapon.guardBoost],
            ] as const
          ).map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{formatValue(value)}</dd>
            </div>
          ))}
        </dl>
      </section>
      {weapon.canChangeAffinity === true && (
        <details className={styles['scaling']}>
          <summary>변질별 능력 보정</summary>
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
                    <th scope="col">변질</th>
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
                      <th scope="row">{AFFINITIES[scaling.affinity]}</th>
                      {Object.keys(ATTRIBUTES).map((key) => (
                        <td key={key}>{formatValue(scaling[key as keyof typeof ATTRIBUTES])}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </details>
      )}
    </div>
  );
}

function WeaponOverview({ weapon }: { weapon: TWeapon }) {
  const [isSkillOpen, setIsSkillOpen] = useState(false);

  const upgradeMaterial = weapon.upgradeMaterial;

  const attackTypes = weapon.physicalAttackTypes?.map((type) => ATTACK_TYPES[type] ?? type);
  let affinityAvailability = '미확인';
  if (weapon.canChangeAffinity === true) affinityAvailability = '가능';
  if (weapon.canChangeAffinity === false) affinityAvailability = '불가';

  return (
    <>
      <div className={styles['overview']}>
        <div className={styles['attack-type']}>
          {attackTypes && attackTypes.length > 0 ? (
            attackTypes.map((type) => (
              <span className={styles['attack-badge']} key={type}>
                {type}
              </span>
            ))
          ) : (
            <span className={styles['attack-badge']}>{attackTypes ? '없음' : '미확인'}</span>
          )}
          <span
            className={styles['material-badge']}
            data-material={upgradeMaterial ?? 'unknown'}
            aria-label={`강화 재료: ${formatValue(upgradeMaterial === null ? null : (UPGRADE_MATERIALS[upgradeMaterial] ?? upgradeMaterial))}`}
          >
            {formatValue(
              upgradeMaterial === null
                ? null
                : (UPGRADE_MATERIALS[upgradeMaterial] ?? upgradeMaterial),
            )}
          </span>
        </div>
        <div className={styles['summary-rows']}>
          <div>
            <span className={styles['label']}>중량</span>
            <span>{formatValue(weapon.weight)}</span>
          </div>
          <div>
            <span className={styles['label']}>변질</span>
            <span>{affinityAvailability}</span>
          </div>
          <div className={styles['skill-row']}>
            <span className={styles['label']}>전투 기술</span>
            <span>
              {weapon.weaponSkills ? (
                <button
                  type="button"
                  className={styles['skill-button']}
                  aria-haspopup="dialog"
                  onClick={() => setIsSkillOpen(true)}
                >
                  <span className={styles['skill-name']}>{weapon.weaponSkills.name}</span>
                  <span className={styles['skill-icon']} aria-hidden="true">
                    ›
                  </span>
                </button>
              ) : (
                '미확인'
              )}
            </span>
          </div>
        </div>
        <div className={styles['requirements']}>
          <h3>필요 능력치</h3>
          <div className={styles['requirement-grid']}>
            {(
              [
                ['근력', weapon.requiredStrength],
                ['기량', weapon.requiredDexterity],
                ['지력', weapon.requiredIntelligence],
                ['신앙', weapon.requiredFaith],
                ['신비', weapon.requiredArcane],
              ] as const
            ).map(([label, value]) => (
              <div key={label}>
                <span className={styles['label']}>{label}</span>
                <span className={styles['requirement-value']}>{formatValue(value)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {weapon.weaponSkills && (
        <Modal
          isOpen={isSkillOpen}
          onClose={() => setIsSkillOpen(false)}
          title="전투 기술"
          isCloseOnBackdropClick
        >
          <div className={styles['skill-details']}>
            <h3 className={styles['skill-title']}>{weapon.weaponSkills.name}</h3>
            <p className={styles['skill-cost']}>
              소비 FP <strong>{formatValue(weapon.weaponSkills.fpCostText)}</strong>
            </p>
            <p className={styles['description']}>
              {weapon.weaponSkills.description ?? '기술 설명이 아직 등록되지 않았습니다.'}
            </p>
          </div>
        </Modal>
      )}
    </>
  );
}

function formatValue(value: string | number | null | undefined) {
  return value == null ? '미확인' : String(value);
}
