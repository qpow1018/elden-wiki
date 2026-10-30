'use client';

import type { ComponentProps, ReactNode } from 'react';

import type { TButtonTheme } from './Button';

import styles from './IconButton.module.scss';

type TIconButtonSize = 'small' | 'medium' | 'large';

export default function IconButton(
  props: ComponentProps<'button'> & {
    theme?: TButtonTheme;
    size?: TIconButtonSize;
    'aria-label': string;
    children: ReactNode;
  },
) {
  const { theme = 'gray', size = 'medium', ...buttonProps } = props;

  return (
    <button
      {...buttonProps}
      type={buttonProps.type ?? 'button'}
      className={`${styles['icon-btn']} ${styles[`theme-${theme}`]} ${styles[`size-${size}`]} ${buttonProps.className ?? ''}`}
    >
      {buttonProps.children}
    </button>
  );
}
