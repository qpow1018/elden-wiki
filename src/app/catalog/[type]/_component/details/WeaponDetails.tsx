import { useId, useState } from 'react';

import type { TWeapon } from '@/api/gameItem/types';
import { AFFINITIES, ATTACK_TYPES, ATTRIBUTES, UPGRADE_MATERIALS } from '@/define/gameItems';

import Modal from '@/components/common/modal/Modal';

import styles from './WeaponDetails.module.scss';

import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';

export default function WeaponDetails({
  weapon,
  name,
  effectDescription,
}: {
  weapon: TWeapon;
  name: string;
  effectDescription: string | null;
}) {
  return (
    <div className={styles['weapon-details']}>
      <WeaponOverview weapon={weapon} />
      <WeaponCombatStats weapon={weapon} />
      <WeaponStatusEffects weapon={weapon} />
      <WeaponScaling weapon={weapon} name={name} />
      {effectDescription && <WeaponEffects description={effectDescription} />}
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

function WeaponCombatStats({ weapon }: { weapon: TWeapon }) {
  const groups = [
    {
      title: '공격력',
      className: 'attack-column',
      values: [
        ['물리', weapon.attackPhysical],
        ['마력', weapon.attackMagic],
        ['화염', weapon.attackFire],
        ['벼락', weapon.attackLightning],
        ['신성', weapon.attackHoly],
        ['치명', weapon.critical],
      ],
    },
    {
      title: '가드 성능',
      className: 'guard-column',
      values: [
        ['물리', weapon.guardPhysical],
        ['마력', weapon.guardMagic],
        ['화염', weapon.guardFire],
        ['벼락', weapon.guardLightning],
        ['신성', weapon.guardHoly],
        ['가드 강도', weapon.guardBoost],
      ],
    },
  ] as const;

  return (
    <div className={styles['combat-stats']}>
      <p className={styles['combat-basis']}>
        최대 강화{weapon.canChangeAffinity === true ? ' · 표준 변질' : ''}
      </p>
      <div className={styles['combat-columns']}>
        {groups.map((group) => (
          <section className={styles[group.className]} key={group.title}>
            <h3>{group.title}</h3>
            <div className={styles['combat-values']}>
              {group.values.map(([label, value], index) => (
                <div className={styles['combat-row']} key={label}>
                  <span className={styles['combat-label']}>{label}</span>
                  <span className={styles['combat-value']}>
                    {formatValue(value)}
                    {group.className === 'guard-column' && index < 5 && value != null ? '%' : ''}
                  </span>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

function WeaponStatusEffects({ weapon }: { weapon: TWeapon }) {
  const statusEffects = [
    ['출혈', weapon.bleed],
    ['동상', weapon.frostbite],
    ['독', weapon.poison],
    ['붉은 부패', weapon.scarletRot],
    ['수면', weapon.sleep],
    ['발광', weapon.madness],
  ] as const;
  const visibleStatusEffects = statusEffects.filter(([, value]) => value !== 0);

  return (
    <section className={styles['status-effects']}>
      <div className={styles['status-header']}>
        <h3>상태 이상</h3>
        <span className={styles['note']}>미강화 기본 수치</span>
      </div>
      <div className={styles['status-values']}>
        {visibleStatusEffects.length === 0 ? (
          <p className={styles['empty']}>없음</p>
        ) : (
          visibleStatusEffects.map(([label, value]) => (
            <div className={styles['status-row']} key={label}>
              <span className={styles['status-label']}>{label}</span>
              <span className={styles['status-value']}>{formatValue(value)}</span>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

function WeaponScaling({ weapon, name }: { weapon: TWeapon; name: string }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const affinityRowsId = useId();
  const standardScaling = weapon.weaponScalings.find((scaling) => scaling.affinity === 'standard');
  const affinityScalings = Object.keys(AFFINITIES)
    .filter((affinity) => affinity !== 'standard')
    .flatMap((affinity) =>
      weapon.weaponScalings.filter((scaling) => scaling.affinity === affinity),
    );
  const canChangeAffinity = weapon.canChangeAffinity === true;

  return (
    <section className={styles['scaling']}>
      <div className={styles['scaling-header']}>
        <h3>능력 보정</h3>
        <span className={styles['basis']}>최대 강화</span>
      </div>
      <div className={styles['scaling-table']}>
        <table aria-label={`${name} 능력 보정`}>
          <thead>
            <tr>
              <th scope="col">{canChangeAffinity ? '변질' : '구분'}</th>
              {Object.entries(ATTRIBUTES).map(([key, label]) => (
                <th scope="col" key={key}>
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className={styles['basic-row']}>
              <th scope="row">{canChangeAffinity ? '표준' : '기본'}</th>
              {Object.keys(ATTRIBUTES).map((key) => (
                <td key={key}>{formatValue(standardScaling?.[key as keyof typeof ATTRIBUTES])}</td>
              ))}
            </tr>
          </tbody>
          {canChangeAffinity && affinityScalings.length > 0 && (
            <tbody id={affinityRowsId} hidden={!isExpanded}>
              {affinityScalings.map((scaling) => (
                <tr key={scaling.affinity}>
                  <th scope="row">{AFFINITIES[scaling.affinity]}</th>
                  {Object.keys(ATTRIBUTES).map((key) => (
                    <td key={key}>{formatValue(scaling[key as keyof typeof ATTRIBUTES])}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          )}
        </table>
        {canChangeAffinity && affinityScalings.length > 0 && (
          <button
            type="button"
            className={styles['scaling-toggle']}
            aria-expanded={isExpanded}
            aria-controls={affinityRowsId}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <span>변질별 보정</span>
            {isExpanded ? (
              <MdKeyboardArrowUp size={18} aria-hidden="true" />
            ) : (
              <MdKeyboardArrowDown size={18} aria-hidden="true" />
            )}
          </button>
        )}
      </div>
      {!standardScaling && (
        <p className={styles['note']}>기본 능력 보정 정보가 아직 등록되지 않았습니다.</p>
      )}
      {canChangeAffinity && affinityScalings.length === 0 && (
        <p className={styles['note']}>변질별 능력 보정 정보가 아직 등록되지 않았습니다.</p>
      )}
      {weapon.canChangeAffinity == null && <p className={styles['note']}>변질 가능 여부 미확인</p>}
    </section>
  );
}

function WeaponEffects({ description }: { description: string }) {
  return (
    <section className={styles['effects']}>
      <h3>부가 효과</h3>
      <p className={styles['description']}>{description}</p>
    </section>
  );
}

function formatValue(value: string | number | null | undefined) {
  return value == null ? '미확인' : String(value);
}
