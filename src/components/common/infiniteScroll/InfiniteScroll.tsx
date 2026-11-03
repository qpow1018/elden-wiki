'use client';

import { useEffect, useRef, type ReactNode } from 'react';

import Button from '@/components/common/button/Button';
import BoxLoading from '@/components/common/loading/BoxLoading';

import styles from './InfiniteScroll.module.scss';

export default function InfiniteScroll(props: {
  children: ReactNode;
  onLoadMore: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  isFetchNextPageError: boolean;
  observerPositionFromBottom: number;
  className?: string;
  enabled?: boolean;
}) {
  const {
    children,
    onLoadMore,
    hasNextPage,
    isFetchingNextPage,
    isFetchNextPageError,
    observerPositionFromBottom,
    className,
    enabled = true,
  } = props;
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const target = targetRef.current;
    if (!enabled || !target || !hasNextPage || isFetchingNextPage || isFetchNextPageError) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) onLoadMore();
      },
      { threshold: 0.5 },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [enabled, hasNextPage, isFetchingNextPage, isFetchNextPageError, onLoadMore]);

  return (
    <div className={styles['infinite-scroll']}>
      <div className={className}>{children}</div>
      {isFetchingNextPage && <BoxLoading height={120} />}
      {isFetchNextPageError && !isFetchingNextPage && (
        <div className={styles['error']} role="status">
          <p>목록을 더 불러오지 못했습니다.</p>
          <Button theme="brass" fill="outline" size="small" onClick={onLoadMore}>
            다시 시도
          </Button>
        </div>
      )}
      {hasNextPage && !isFetchingNextPage && !isFetchNextPageError && (
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
