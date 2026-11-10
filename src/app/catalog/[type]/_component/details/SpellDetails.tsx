import type { TSpell } from '@/api/gameItem/types';
import { ATTRIBUTES } from '@/define/gameItems';

import styles from './SpellDetails.module.scss';

export default function SpellDetails({ spell }: { spell: TSpell | null }) {
  const requirements = [
    [ATTRIBUTES.intelligence, spell?.requiredIntelligence],
    [ATTRIBUTES.faith, spell?.requiredFaith],
    [ATTRIBUTES.arcane, spell?.requiredArcane],
  ] as const;

  return (
    <div className={styles['spell-details']}>
      <dl className={styles['summary']}>
        <div>
          <dt>소비 FP</dt>
          <dd>{spell?.fpCostText ?? '미확인'}</dd>
        </div>
        <div>
          <dt>사용 슬롯</dt>
          <dd>{spell?.slotsUsed ?? '미확인'}</dd>
        </div>
      </dl>

      <section className={styles['requirements']}>
        <h3>필요 능력치</h3>
        <dl className={styles['requirement-grid']}>
          {requirements.map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value === 0 ? '-' : (value ?? '미확인')}</dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}
