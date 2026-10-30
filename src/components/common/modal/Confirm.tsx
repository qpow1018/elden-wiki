'use client';

import Button, { type TButtonColor } from '@/components/common/button/Button';
import Modal from './Modal';

import styles from './Confirm.module.scss';

export default function Confirm(props: {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message: string;
  buttons: {
    label: string;
    color: TButtonColor;
    fill: 'solid' | 'outline';
    onClick: () => void;
    isDisabled?: boolean;
  }[];
}) {
  const { isOpen, onClose, title, message, buttons } = props;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} width={360}>
      <div className={styles['confirm-content']}>
        <p className={styles['message']}>{message}</p>

        <div className={styles['buttons']}>
          {buttons.map((b, i) => (
            <Button
              key={i}
              color={b.color}
              fill={b.fill}
              size="large"
              isDisabled={b.isDisabled}
              onClick={b.onClick}
              className={styles['button']}
            >
              {b.label}
            </Button>
          ))}
        </div>
      </div>
    </Modal>
  );
}
