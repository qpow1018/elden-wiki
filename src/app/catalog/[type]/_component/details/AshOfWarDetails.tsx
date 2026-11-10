import type { TAshOfWar } from '@/api/gameItem/types';
import { AFFINITIES } from '@/define/gameItems';

import styles from './AshOfWarDetails.module.scss';

export default function AshOfWarDetails({ ashOfWar }: { ashOfWar: TAshOfWar | null }) {
  const affinity = ashOfWar?.nativeAffinity;
  const affinityName =
    affinity && Object.hasOwn(AFFINITIES, affinity)
      ? AFFINITIES[affinity as keyof typeof AFFINITIES]
      : '미확인';
  const fpCost = ashOfWar?.weaponSkills?.fpCostText;

  return (
    <dl className={styles['ash-of-war-details']}>
      <div>
        <dt>기본 변질</dt>
        <dd>{affinityName}</dd>
      </div>
      <div>
        <dt>소비 FP</dt>
        <dd>{fpCost ?? '미확인'}</dd>
      </div>
    </dl>
  );
}
