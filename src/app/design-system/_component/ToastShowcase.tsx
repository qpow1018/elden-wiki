'use client';

import toast from '@/utils/toast';

import Button from '@/components/common/button/Button';
import ToastContainer from '@/components/common/toast/ToastContainer';

import styles from '@/app/design-system/DesignSystem.module.scss';

export default function ToastShowcase() {
  return (
    <section className={styles['section']} aria-labelledby="toast-title">
      <div className={styles['section-heading']}>
        <h2 id="toast-title">Toast</h2>
        <p>작업 결과와 짧은 안내를 하단에 표시합니다.</p>
      </div>

      <ToastContainer />
      <div className={styles['state-card']}>
        <div className={styles['toast-actions']}>
          <Button
            theme="teal"
            fill="solid"
            onClick={() => toast.success('저장이 완료되었습니다.', { isShowCloseButton: true })}
          >
            성공 Toast
          </Button>
          <Button
            theme="error"
            fill="solid"
            onClick={() => toast.error('요청을 처리하지 못했습니다.', { isShowCloseButton: true })}
          >
            오류 Toast
          </Button>
          <Button
            theme="gray"
            fill="solid"
            onClick={() => toast.info('새로운 안내가 있습니다.', { isShowCloseButton: true })}
          >
            안내 Toast
          </Button>
        </div>
      </div>
    </section>
  );
}
