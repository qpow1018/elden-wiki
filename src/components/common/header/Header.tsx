'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';

import useScrollHeader from './useScrollHeader';

import styles from './Header.module.scss';

import { MdArrowBack } from 'react-icons/md';

export default function Header({
  title,
  goBack,
  rightComponents,
  isScrollHideEnabled = true,
}: {
  title: string;
  goBack?: boolean | `/${string}`;
  rightComponents?: ReactNode;
  isScrollHideEnabled?: boolean;
}) {
  const headerRef = useScrollHeader(isScrollHideEnabled);

  function handleGoBack() {
    window.history.back();
  }

  return (
    <header ref={headerRef} className={styles['header']}>
      {goBack === true && (
        <button
          type="button"
          className={styles['back-control']}
          aria-label="뒤로가기"
          onClick={handleGoBack}
        >
          <MdArrowBack size={20} aria-hidden="true" />
        </button>
      )}
      {typeof goBack === 'string' && (
        <Link href={goBack} className={styles['back-control']} aria-label="뒤로가기">
          <MdArrowBack size={20} aria-hidden="true" />
        </Link>
      )}
      <h1>{title}</h1>
      {rightComponents && <div className={styles['right-components']}>{rightComponents}</div>}
    </header>
  );
}
