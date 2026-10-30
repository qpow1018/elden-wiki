'use client';

import styles from './Tabs.module.scss';

export default function Tabs<T extends string>(props: {
  options: readonly { value: T; label: string }[];
  value: T;
  onChange: (next: T) => void;
}) {
  const { options, value, onChange } = props;

  return (
    <div className={styles['tabs']}>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          className={`${styles['tab']} ${value === option.value ? styles['tab-selected'] : ''}`}
          onClick={() => onChange(option.value)}
          aria-pressed={value === option.value}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
