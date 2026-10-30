'use client';

import styles from './Checkbox.module.scss';

import { MdCheck } from 'react-icons/md';

type TCheckboxSize = 'small' | 'medium';

export default function Checkbox(props: {
  isChecked: boolean;
  onChange: (isChecked: boolean) => void;
  label: React.ReactNode;
  size?: TCheckboxSize;
  isDisabled?: boolean;
  ariaLabel?: string;
  className?: string;
}) {
  const {
    isChecked,
    onChange,
    label,
    size = 'medium',
    isDisabled = false,
    ariaLabel,
    className,
  } = props;

  return (
    <label
      className={`${styles['checkbox']} ${styles[`size-${size}`]} ${isDisabled ? styles['is-disabled'] : ''} ${className ?? ''}`}
    >
      <input
        type="checkbox"
        checked={isChecked}
        disabled={isDisabled}
        aria-label={ariaLabel}
        onChange={(event) => onChange(event.target.checked)}
      />
      <span
        className={`${styles['control']} ${isChecked ? styles['is-checked'] : ''}`}
        aria-hidden="true"
      >
        <MdCheck />
      </span>
      {label}
    </label>
  );
}
