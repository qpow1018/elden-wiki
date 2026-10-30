'use client';

import { useLayoutEffect, useRef } from 'react';

import { useBodyScrollLock } from '@/utils/useBodyScrollLock';

import styles from './FixedLoading.module.scss';

export default function FixedLoading() {
  const loadingRef = useRef<HTMLDivElement>(null);
  useBodyScrollLock(true);

  useLayoutEffect(() => {
    const previousFocus = document.activeElement;
    const loading = loadingRef.current;
    if (!loading) return;

    function handleKey(event: KeyboardEvent) {
      event.stopImmediatePropagation();
      if (['Tab', 'Enter', ' ', 'Escape'].includes(event.key)) event.preventDefault();
    }

    function handleFocus(event: FocusEvent) {
      event.stopImmediatePropagation();
      if (event.target !== loading) loading?.focus({ preventScroll: true });
    }

    document.addEventListener('keydown', handleKey, true);
    document.addEventListener('keyup', handleKey, true);
    document.addEventListener('focusin', handleFocus, true);
    loading.focus({ preventScroll: true });
    return () => {
      document.removeEventListener('keydown', handleKey, true);
      document.removeEventListener('keyup', handleKey, true);
      document.removeEventListener('focusin', handleFocus, true);
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) {
        previousFocus.focus({ preventScroll: true });
      }
    };
  }, []);

  return (
    <div
      ref={loadingRef}
      className={styles['fixed-loading']}
      role="status"
      aria-label="불러오는 중"
      tabIndex={-1}
    >
      <div className={styles['spinner']} aria-hidden="true" />
    </div>
  );
}
