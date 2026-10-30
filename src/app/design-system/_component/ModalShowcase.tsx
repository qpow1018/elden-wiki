'use client';

import { useEffect, useState } from 'react';

import Button from '@/components/common/button/Button';
import Checkbox from '@/components/common/form/Checkbox';
import Confirm from '@/components/common/modal/Confirm';
import Modal from '@/components/common/modal/Modal';
import FixedLoading from '@/components/common/loading/FixedLoading';

import styles from '@/app/design-system/DesignSystem.module.scss';

export default function ModalShowcase() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isFocusExampleOpen, setIsFocusExampleOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCloseOnEscape, setIsCloseOnEscape] = useState(true);

  useEffect(() => {
    if (!isLoading) return;
    const timeout = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timeout);
  }, [isLoading]);

  return (
    <section className={styles['section']} aria-labelledby="modal-title">
      <div className={styles['section-heading']}>
        <h2 id="modal-title">Modal &amp; Confirm</h2>
        <p>Modal은 공통 shell이고 Confirm은 메시지와 선택지를 제공하는 preset입니다.</p>
      </div>

      <div className={styles['state-card']}>
        <div className={styles['button-pair']}>
          <Button onClick={() => setIsModalOpen(true)}>Modal 열기</Button>
          <Button theme="error" fill="outline" onClick={() => setIsConfirmOpen(true)}>
            Confirm 열기
          </Button>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="모달 제목"
        isCloseOnEscape={isCloseOnEscape}
      >
        <div className={styles['modal-preview-content']}>
          <p>Modal body에는 화면별 콘텐츠와 필요한 조작을 배치합니다.</p>
          <Checkbox
            checked={isCloseOnEscape}
            onChange={setIsCloseOnEscape}
            label="Escape로 닫기 허용"
          />
          <div className={styles['modal-preview-actions']}>
            <Button fill="outline" onClick={() => setIsModalOpen(false)}>
              닫기
            </Button>
            <Button onClick={() => setIsModalOpen(false)}>확인</Button>
            <Button onClick={() => setIsFocusExampleOpen(true)}>포커스 예외 모달 열기</Button>
            <Button onClick={() => setIsLoading(true)}>모달 위 로딩 보기</Button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={isFocusExampleOpen}
        onClose={() => setIsFocusExampleOpen(false)}
        title="포커스 예외 확인"
        isShowCloseButton={false}
      >
        <div className={styles['modal-preview-content']}>
          <p>Tab 이동 대상이 없어 모달 자체에 포커스합니다. Escape로 닫습니다.</p>
          <button hidden>숨겨진 버튼</button>
          <button disabled>비활성 버튼</button>
          <button tabIndex={-1}>Tab 이동 제외 버튼</button>
        </div>
      </Modal>
      {isLoading && <FixedLoading />}

      <Confirm
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        title="삭제 확인"
        message={'이 작업은 되돌릴 수 없습니다.\n정말 삭제할까요?'}
        buttons={[
          {
            label: '취소',
            theme: 'gray',
            fill: 'outline',
            onClick: () => setIsConfirmOpen(false),
          },
          {
            label: '삭제',
            theme: 'error',
            fill: 'solid',
            onClick: () => setIsConfirmOpen(false),
          },
        ]}
      />
    </section>
  );
}
