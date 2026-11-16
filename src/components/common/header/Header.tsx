'use client';

import type { ReactNode } from 'react';

import useScrollHeader from './useScrollHeader';

import styles from './Header.module.scss';

export default function Header({
  title,
  leftComponents,
  rightComponents,
  hideOnScroll = true,
}: {
  title: string;
  leftComponents?: ReactNode;
  rightComponents?: ReactNode;
  hideOnScroll?: boolean;
}) {
  const headerRef = useScrollHeader(hideOnScroll);

  return (
    <header ref={headerRef} className={styles['header']}>
      {leftComponents}
      <h1>{title}</h1>
      {rightComponents && <div className={styles['right-components']}>{rightComponents}</div>}
    </header>
  );
}
