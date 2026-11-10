import type { TGameItem } from '@/api/gameItem/types';

import styles from './SpiritAshDetails.module.scss';

export default function SpiritAshDetails({
  spiritAsh,
}: {
  spiritAsh: TGameItem['spiritAshDetails'];
}) {
  return (
    <dl className={styles['spirit-ash-details']}>
      <dt>소환 비용</dt>
      <dd>{formatSummonCost(spiritAsh)}</dd>
    </dl>
  );
}

function formatSummonCost(cost: TGameItem['spiritAshDetails']) {
  if (!cost) return '미확인';

  const parts = [];
  if (cost.fpCost > 0) parts.push(`FP ${cost.fpCost}`);
  if (cost.hpCost > 0) parts.push(`HP ${cost.hpCost}`);
  return parts.length ? parts.join(' · ') : '없음';
}
