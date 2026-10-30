'use client';

import type { ComponentProps } from 'react';

import styles from './Button.module.scss';

export type TButtonTheme = 'steel' | 'teal' | 'gray' | 'brass' | 'lavender' | 'error';
type TButtonFill = 'solid' | 'outline';
type TButtonSize = 'small' | 'medium' | 'large';

export default function Button(
  props: ComponentProps<'button'> & {
    theme?: TButtonTheme;
    fill?: TButtonFill;
    size?: TButtonSize;
    isFullWidth?: boolean;
    isLoading?: boolean;
  },
) {
  const {
    theme = 'steel',
    fill = 'solid',
    size = 'medium',
    isFullWidth = false,
    isLoading = false,
    ...buttonProps
  } = props;

  return (
    <button
      {...buttonProps}
      type={buttonProps.type ?? 'button'}
      className={`${styles['btn']} ${styles[`theme-${theme}`]} ${styles[`fill-${fill}`]} ${styles[`size-${size}`]} ${isFullWidth ? styles['is-full-width'] : ''} ${isLoading ? styles['is-loading'] : ''} ${buttonProps.className ?? ''}`}
      disabled={buttonProps.disabled || isLoading}
      aria-busy={isLoading || buttonProps['aria-busy']}
    >
      <span className={styles['content']}>{buttonProps.children}</span>
      {isLoading && <span className={styles['spinner']} aria-hidden="true" />}
    </button>
  );
}
