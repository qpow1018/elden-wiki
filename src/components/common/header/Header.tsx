'use client';

import type { ReactNode } from 'react';

import useScrollHeader from './useScrollHeader';

import styles from './Header.module.scss';

export default function Header({
  title,
  rightComponents,
  hideOnScroll = true,
}: {
  title: string;
  rightComponents?: ReactNode;
  hideOnScroll?: boolean;
}) {
  const headerRef = useScrollHeader(hideOnScroll);

  return (
    <header ref={headerRef} className={styles['header']}>
      <h1>{title}</h1>
      {rightComponents && <div className={styles['right-components']}>{rightComponents}</div>}
    </header>
  );
}
