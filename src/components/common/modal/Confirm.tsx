'use client';

import Button, { type TButtonTheme } from '@/components/common/button/Button';
import Modal from './Modal';

import styles from './Confirm.module.scss';

export default function Confirm(props: {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message: string;
  buttons: {
    label: string;
    theme?: TButtonTheme;
    fill?: 'solid' | 'outline';
    onClick: () => void;
    disabled?: boolean;
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
              theme={b.theme}
              fill={b.fill}
              size="large"
              disabled={b.disabled}
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
