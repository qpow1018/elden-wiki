'use client';

import { useState } from 'react';

import Button from '@/components/common/button/Button';
import Confirm from '@/components/common/modal/Confirm';
import Modal from '@/components/common/modal/Modal';

import styles from '@/app/design-system/DesignSystem.module.scss';

export default function ModalShowcase() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

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

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="모달 제목">
        <div className={styles['modal-preview-content']}>
          <p>Modal body에는 화면별 콘텐츠와 필요한 조작을 배치합니다.</p>
          <div className={styles['modal-preview-actions']}>
            <Button fill="outline" onClick={() => setIsModalOpen(false)}>
              닫기
            </Button>
            <Button onClick={() => setIsModalOpen(false)}>확인</Button>
          </div>
        </div>
      </Modal>

      <Confirm
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        title="삭제 확인"
        message={'이 작업은 되돌릴 수 없습니다.\n정말 삭제할까요?'}
        buttons={[
          {
            label: '취소',
            color: 'gray',
            fill: 'outline',
            onClick: () => setIsConfirmOpen(false),
          },
          {
            label: '삭제',
            color: 'error',
            fill: 'solid',
            onClick: () => setIsConfirmOpen(false),
          },
        ]}
      />
    </section>
  );
}
