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
  { label: '36px', size: 'small' },
  { label: '42px', size: 'medium' },
  { label: '48px', size: 'large' },
];

export default function ButtonGroupShowcase() {
  const [value, setValue] = useState<TButtonGroupValue>('weekly');

  return (
    <section className={styles['section']} aria-labelledby="button-group-title">
      <div className={styles['section-heading']}>
        <h2 id="button-group-title">Button Group</h2>
        <p>같은 선택지를 36px, 42px, 48px 높이로 비교합니다.</p>
      </div>

      <div className={styles['state-card']}>
        <div className={styles['button-group-showcase']}>
          {SIZES.map(({ label, size }) => (
            <div key={size} className={styles['button-group-sample']}>
              <span>{label}</span>
              <ButtonGroup
                label={`기간 선택 ${label}`}
                options={OPTIONS}
                value={value}
                onChange={setValue}
                size={size}
              />
            </div>
          ))}
          <ButtonGroup
            label="기간 선택 비활성"
            options={OPTIONS}
            value={value}
            onChange={setValue}
            disabled
          />
        </div>
      </div>
    </section>
  );
}
