'use client';

import { createPortal } from 'react-dom';

import useModal from './useModal';

import styles from './Modal.module.scss';

import { MdClose } from 'react-icons/md';

export default function Modal(props: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  isShowCloseButton?: boolean;
  isCloseOnBackdropClick?: boolean;
  isCloseOnEscape?: boolean;
  width?: number;
}) {
  const {
    isOpen,
    onClose,
    children,
    title,
    isShowCloseButton = true,
    isCloseOnBackdropClick = false,
    isCloseOnEscape = true,
    width = 480,
  } = props;

  const { portalTarget, modalRef, titleId, handleBackdropPointerDown, handleBackdropClick } =
    useModal({ isOpen, onClose, isCloseOnBackdropClick, isCloseOnEscape });

  if (!isOpen || !portalTarget) return null;

  return createPortal(
    <div
      className={styles['modal-backdrop']}
      onPointerDown={handleBackdropPointerDown}
      onClick={handleBackdropClick}
    >
      <div
        ref={modalRef}
        className={styles['modal']}
        style={{ width }}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-label={title ? undefined : '대화상자'}
        tabIndex={-1}
      >
        {title !== undefined && (
          <div className={styles['header']}>
            <p id={titleId} className={styles['header-title']}>
              {title}
            </p>
          </div>
        )}

        {isShowCloseButton && (
          <button
            type="button"
            className={styles['close-button']}
            onClick={onClose}
            aria-label="닫기"
          >
            <MdClose size={20} />
          </button>
        )}

        <div className={styles['body']}>{children}</div>
      </div>
    </div>,
    portalTarget,
  );
}
