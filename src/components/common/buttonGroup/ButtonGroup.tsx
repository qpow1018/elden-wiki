'use client';

import styles from './ButtonGroup.module.scss';

export type TButtonGroupSize = 'small' | 'medium' | 'large';

export default function ButtonGroup<T extends string>(props: {
  label: string;
  options: readonly { value: T; label: string }[];
  value: T;
  onChange: (next: T) => void;
  size?: TButtonGroupSize;
  disabled?: boolean;
}) {
  const { label, options, value, onChange, size = 'medium', disabled = false } = props;

  return (
    <div
      role="group"
      aria-label={label}
      className={`${styles['button-group']} ${styles[`size-${size}`]}`}
    >
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          className={`${styles['option']} ${value === option.value ? styles['option-selected'] : ''}`}
          disabled={disabled}
          aria-pressed={value === option.value}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
