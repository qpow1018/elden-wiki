'use client';

import { useEffect, useRef, useState } from 'react';

import Button from '@/components/common/button/Button';
import DraggableList from '@/components/common/draggableList/DraggableList';
import Header from '@/components/common/header/Header';
import BoxLoading from '@/components/common/loading/BoxLoading';
import FixedLoading from '@/components/common/loading/FixedLoading';

import styles from '@/app/design-system/DesignSystem.module.scss';

export default function UtilityShowcase() {
  const [items, setItems] = useState(['롱소드', '클레이모어', '타도']);
  const [isLoading, setIsLoading] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    },
    [],
  );

  function handleLoading() {
    setIsLoading(true);
    timeoutRef.current = setTimeout(() => setIsLoading(false), 1500);
  }

  return (
    <>
      <section className={styles['section']} aria-labelledby="header-title">
        <div className={styles['section-heading']}>
          <h2 id="header-title">Header</h2>
          <p>로고와 메뉴의 기본·현재 페이지 상태입니다.</p>
        </div>
        <Header
          menus={[
            { name: '장비 도감', link: '/' },
            { name: '디자인 시스템', link: '/design-system' },
          ]}
        />
      </section>
      <section className={styles['section']} aria-labelledby="drag-title">
        <div className={styles['section-heading']}>
          <h2 id="drag-title">Draggable List</h2>
          <p>손잡이를 드래그하거나, 손잡이에 포커스한 뒤 Space·방향키·Space로 순서를 바꿉니다.</p>
        </div>
        <div className={styles['state-card']}>
          <DraggableList
            items={items}
            getId={(item) => item}
            direction="vertical"
            onReorder={setItems}
          >
            {(item, { dragHandleProps }) => (
              <div className={styles['drag-row']}>
                <button
                  type="button"
                  className={styles['drag-handle']}
                  aria-label={`${item} 순서 변경`}
                  {...dragHandleProps}
                >
                  ⠿
                </button>
                <span>{item}</span>
              </div>
            )}
          </DraggableList>
          <p className={styles['selection-result']} aria-live="polite">
            현재 순서: {items.join(' → ')}
          </p>
        </div>
      </section>
      <section className={styles['section']} aria-labelledby="loading-title">
        <div className={styles['section-heading']}>
          <h2 id="loading-title">Box Loading &amp; Fixed Loading</h2>
          <p>영역 로딩과 전체 화면 로딩을 확인합니다. 전체 화면 예시는 1.5초 후 닫힙니다.</p>
        </div>
        <div className={styles['state-card']}>
          <BoxLoading height={120} />
          <Button onClick={handleLoading}>전체 화면 로딩 보기</Button>
        </div>
        {isLoading && <FixedLoading />}
      </section>
    </>
  );
}
