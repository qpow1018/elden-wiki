'use client';

import type { MouseEventHandler, ReactNode } from 'react';

import type { TButtonColor } from './Button';
import styles from './IconButton.module.scss';

type TIconButtonType = 'button' | 'submit';
type TIconButtonSize = 'small' | 'medium' | 'large';

export default function IconButton(props: {
  type?: TIconButtonType;
  color?: TButtonColor;
  size?: TIconButtonSize;
  'aria-label': string;
  isDisabled?: boolean;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
}) {
  const {
    type = 'button',
    color = 'gray',
    size = 'medium',
    'aria-label': ariaLabel,
    isDisabled = false,
    className,
    onClick,
    children,
  } = props;

  return (
    <button
      type={type}
      className={`${styles['icon-btn']} ${styles[`color-${color}`]} ${styles[`size-${size}`]} ${className ?? ''}`}
      disabled={isDisabled}
      aria-label={ariaLabel}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
