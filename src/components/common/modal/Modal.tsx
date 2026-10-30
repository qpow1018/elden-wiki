'use client';

import { useEffect, useId, useRef } from 'react';

import { useBodyScrollLock } from '@/utils/useBodyScrollLock';

import styles from './Modal.module.scss';

import { MdClose } from 'react-icons/md';

// Escape 시 가장 최근에 열린 Modal 하나만 닫기 위해 열린 순서대로 추적
const openModalStack: symbol[] = [];

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

  useBodyScrollLock(isOpen);

  const onCloseRef = useRef(onClose);
  const isBackdropPointerDownRef = useRef(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;

    const token = Symbol();
    openModalStack.push(token);
    const previousFocus = document.activeElement;
    const focusableSelector =
      'button:not(:disabled), input:not(:disabled), textarea:not(:disabled), select:not(:disabled), a[href], [tabindex="0"]';
    modalRef.current?.querySelector<HTMLElement>(focusableSelector)?.focus();

    function handleKeyDown(e: KeyboardEvent) {
      if (openModalStack[openModalStack.length - 1] !== token) return;
      if (e.key === 'Escape' && isCloseOnEscape) onCloseRef.current();
      if (e.key !== 'Tab') return;
      const elements = modalRef.current?.querySelectorAll<HTMLElement>(focusableSelector);
      if (!elements?.length) {
        e.preventDefault();
        modalRef.current?.focus();
        return;
      }
      const first = elements[0];
      const last = elements[elements.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      const idx = openModalStack.indexOf(token);
      if (idx !== -1) openModalStack.splice(idx, 1);
      if (previousFocus instanceof HTMLElement) previousFocus.focus();
    };
  }, [isOpen, isCloseOnEscape]);

  if (!isOpen) return null;

  function handleBackdropPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    isBackdropPointerDownRef.current = e.target === e.currentTarget;
  }

  function handleBackdropClick(e: React.MouseEvent<HTMLDivElement>) {
    if (!isCloseOnBackdropClick) return;

    const isBackdropClick = isBackdropPointerDownRef.current && e.target === e.currentTarget;

    isBackdropPointerDownRef.current = false;

    if (isBackdropClick) onClose();
  }

  return (
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
    </div>
  );
}
