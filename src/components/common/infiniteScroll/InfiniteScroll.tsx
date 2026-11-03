'use client';

import { useEffect, useRef, type ReactNode } from 'react';

import BoxLoading from '@/components/common/loading/BoxLoading';

import styles from './InfiniteScroll.module.scss';

export default function InfiniteScroll(props: {
  children: ReactNode;
  onLoadMore: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  observerPositionFromBottom: number;
  className?: string;
}) {
  const {
    children,
    onLoadMore,
    hasNextPage,
    isFetchingNextPage,
    observerPositionFromBottom,
    className,
  } = props;
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const target = targetRef.current;
    if (!target || !hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) onLoadMore();
      },
      { threshold: 0.5 },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, onLoadMore]);

  return (
    <div className={styles['infinite-scroll']}>
      <div className={className}>{children}</div>
      {isFetchingNextPage && <BoxLoading height={120} />}
      {hasNextPage && !isFetchingNextPage && (
        <div
          ref={targetRef}
          className={styles['observe-box']}
          style={{ bottom: observerPositionFromBottom }}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
