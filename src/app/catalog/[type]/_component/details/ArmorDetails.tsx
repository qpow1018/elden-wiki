import type { TArmor } from '@/api/gameItem/types';
import { ATTACK_TYPES, ELEMENTS } from '@/define/gameItems';

import styles from './ArmorDetails.module.scss';

export default function ArmorDetails({ armor }: { armor: TArmor | null }) {
  const negationGroups = [
    {
      title: '물리 계열',
      values: [
        [ELEMENTS.physical, armor?.negationPhysical],
        [ATTACK_TYPES.strike, armor?.negationStrike],
        [ATTACK_TYPES.slash, armor?.negationSlash],
        [ATTACK_TYPES.pierce, armor?.negationPierce],
      ],
    },
    {
      title: '속성 계열',
      values: [
        [ELEMENTS.magic, armor?.negationMagic],
        [ELEMENTS.fire, armor?.negationFire],
        [ELEMENTS.lightning, armor?.negationLightning],
        [ELEMENTS.holy, armor?.negationHoly],
      ],
    },
  ] as const;
  const resistances = [
    ['면역', armor?.immunity],
    ['강건', armor?.robustness],
    ['이성', armor?.focus],
    ['항사', armor?.vitality],
  ] as const;

  return (
    <div className={styles['armor-details']}>
      <dl className={styles['summary']}>
        <div>
          <dt>중량</dt>
          <dd>{armor?.weight ?? '미확인'}</dd>
        </div>
        <div>
          <dt>강인도</dt>
          <dd>{armor?.poise ?? '미확인'}</dd>
        </div>
      </dl>

      <section>
        <h3>경감률</h3>
        <div className={styles['negation-columns']}>
          {negationGroups.map((group) => (
            <section key={group.title}>
              <h4>{group.title}</h4>
              <dl>
                {group.values.map(([label, value]) => (
                  <div key={label}>
                    <dt>{label}</dt>
                    <dd>{value ?? '미확인'}</dd>
                  </div>
                ))}
              </dl>
            </section>
          ))}
        </div>
      </section>

      <section>
        <h3>내성</h3>
        <dl className={styles['resistance-grid']}>
          {resistances.map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value ?? '미확인'}</dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}
