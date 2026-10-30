'use client';

import type { ComponentProps, ReactNode } from 'react';

import styles from './Checkbox.module.scss';

import { MdCheck } from 'react-icons/md';

type TCheckboxSize = 'small' | 'medium';

export default function Checkbox(
  props: Omit<ComponentProps<'input'>, 'type' | 'size' | 'onChange'> & {
    onChange?: (checked: boolean) => void;
    label: ReactNode;
    size?: TCheckboxSize;
  },
) {
  const { onChange, label, size = 'medium', ...inputProps } = props;

  return (
    <label
      className={`${styles['checkbox']} ${styles[`size-${size}`]} ${inputProps.disabled ? styles['is-disabled'] : ''}`}
    >
      <input
        {...inputProps}
        type="checkbox"
        onChange={(event) => onChange?.(event.target.checked)}
      />
      <span className={styles['control']} aria-hidden="true">
        <MdCheck />
      </span>
      {label}
    </label>
  );
}
