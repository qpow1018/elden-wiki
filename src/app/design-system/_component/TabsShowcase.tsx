'use client';

import { useState } from 'react';

import Tabs from '@/components/common/tabs/Tabs';

import styles from '@/app/design-system/DesignSystem.module.scss';

const OPTIONS = [
  { value: 'overview', label: '개요' },
  { value: 'details', label: '상세 정보' },
  { value: 'history', label: '기록' },
] as const;

type TTabValue = (typeof OPTIONS)[number]['value'];

export default function TabsShowcase() {
  const [value, setValue] = useState<TTabValue>('overview');

  return (
    <section className={styles['section']} aria-labelledby="tabs-title">
      <div className={styles['section-heading']}>
        <h2 id="tabs-title">Tabs</h2>
        <p>페이지 안의 보기를 전환하는 40px 탭입니다.</p>
      </div>

      <div className={styles['state-card']}>
        <div className={styles['tabs-showcase']}>
          <Tabs options={OPTIONS} value={value} onChange={setValue} />
          <p className={styles['selection-result']} aria-live="polite">
            선택한 보기: {OPTIONS.find((option) => option.value === value)?.label}
          </p>
        </div>
      </div>
    </section>
  );
}
