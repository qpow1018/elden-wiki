'use client';

import { useState } from 'react';

import ButtonGroup, { type TButtonGroupSize } from '@/components/common/buttonGroup/ButtonGroup';

import styles from '@/app/design-system/DesignSystem.module.scss';

const OPTIONS = [
  { value: 'weekly', label: '주간' },
  { value: 'monthly', label: '월간' },
  { value: 'all', label: '전체' },
] as const;

type TButtonGroupValue = (typeof OPTIONS)[number]['value'];

const SIZES: { label: string; size: TButtonGroupSize }[] = [
  { label: '32px', size: 'small' },
  { label: '36px', size: 'medium' },
  { label: '40px', size: 'large' },
];

export default function ButtonGroupShowcase() {
  const [value, setValue] = useState<TButtonGroupValue>('weekly');

  return (
    <section className={styles['section']} aria-labelledby="button-group-title">
      <div className={styles['section-heading']}>
        <h2 id="button-group-title">Button Group</h2>
        <p>같은 선택지를 32px, 36px, 40px 높이로 비교합니다.</p>
      </div>

      <div className={styles['state-card']}>
        <div className={styles['button-group-showcase']}>
          {SIZES.map(({ label, size }) => (
            <div key={size} className={styles['button-group-sample']}>
              <span>{label}</span>
              <ButtonGroup options={OPTIONS} value={value} onChange={setValue} size={size} />
            </div>
          ))}
          <ButtonGroup options={OPTIONS} value={value} onChange={setValue} isDisabled />
        </div>
      </div>
    </section>
  );
}
