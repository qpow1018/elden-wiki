'use client';

import { useEffect, useId, useRef, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';

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

  const portalTarget = useSyncExternalStore(
    subscribeToHydration,
    () => document.body,
    () => null,
  );
  useBodyScrollLock(isOpen && portalTarget !== null);

  const onCloseRef = useRef(onClose);
  const isCloseOnEscapeRef = useRef(isCloseOnEscape);
  const isBackdropPointerDownRef = useRef(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  useEffect(() => {
    onCloseRef.current = onClose;
    isCloseOnEscapeRef.current = isCloseOnEscape;
  }, [onClose, isCloseOnEscape]);

  useEffect(() => {
    if (!isOpen || !portalTarget) return;

    const token = Symbol();
    const previousFocus = document.activeElement;
    const modal = modalRef.current;
    if (!modal) return;
    openModalStack.push(token);

    function getFocusableElements() {
      return Array.from(
        modal!.querySelectorAll<HTMLElement>(
          'button, input, textarea, select, a[href], [tabindex]',
        ),
      )
        .filter(
          (element) =>
            element.tabIndex >= 0 &&
            !element.matches(':disabled') &&
            !element.closest('[inert], [hidden]') &&
            element.getClientRects().length > 0 &&
            getComputedStyle(element).visibility === 'visible',
        )
        .sort((a, b) => (a.tabIndex || Infinity) - (b.tabIndex || Infinity));
    }

    function focusInside() {
      (getFocusableElements()[0] ?? modal)?.focus({ preventScroll: true });
    }

    focusInside();

    function handleFocus(event: FocusEvent) {
      if (openModalStack[openModalStack.length - 1] !== token) return;
      if (!modal?.contains(event.target as Node)) focusInside();
    }

    function handleKeyDown(e: KeyboardEvent) {
      if (openModalStack[openModalStack.length - 1] !== token) return;
      if (e.key === 'Escape' && isCloseOnEscapeRef.current) onCloseRef.current();
      if (e.key !== 'Tab') return;
      const elements = getFocusableElements();
      if (!elements?.length) {
        e.preventDefault();
        modalRef.current?.focus();
        return;
      }
      const first = elements[0];
      const last = elements[elements.length - 1];
      if (!elements.includes(document.activeElement as HTMLElement)) {
        e.preventDefault();
        (e.shiftKey ? last : first).focus();
      } else if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('focusin', handleFocus);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('focusin', handleFocus);
      const idx = openModalStack.indexOf(token);
      if (idx !== -1) openModalStack.splice(idx, 1);
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) {
        previousFocus.focus({ preventScroll: true });
      }
    };
  }, [isOpen, portalTarget]);

  if (!isOpen || !portalTarget) return null;

  function handleBackdropPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    isBackdropPointerDownRef.current = e.target === e.currentTarget;
  }

  function handleBackdropClick(e: React.MouseEvent<HTMLDivElement>) {
    if (!isCloseOnBackdropClick) return;

    const isBackdropClick = isBackdropPointerDownRef.current && e.target === e.currentTarget;

    isBackdropPointerDownRef.current = false;

    if (isBackdropClick) onClose();
  }

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

// 서버와 초기 hydration에서는 생략하고, 클라이언트에서 body에 연결한다.
function subscribeToHydration() {
  return () => {};
}
