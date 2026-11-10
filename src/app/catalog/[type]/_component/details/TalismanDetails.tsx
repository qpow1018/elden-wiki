import type { TTalisman } from '@/api/gameItem/types';

import styles from './TalismanDetails.module.scss';

export default function TalismanDetails({ talisman }: { talisman: TTalisman | null }) {
  return (
    <dl className={styles['talisman-details']}>
      <dt>중량</dt>
      <dd>{talisman?.weight ?? '미확인'}</dd>
    </dl>
  );
}
