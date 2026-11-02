'use client';

import { useEffect, useId, useRef, useSyncExternalStore } from 'react';

import { useBodyScrollLock } from '@/utils/useBodyScrollLock';

// Escape와 포커스는 가장 최근에 열린 모달 하나만 처리한다.
const OPEN_MODAL_STACK: symbol[] = [];

export default function useModal({
  isOpen,
  onClose,
  isCloseOnBackdropClick = false,
  isCloseOnEscape = true,
}: {
  isOpen: boolean;
  onClose: () => void;
  isCloseOnBackdropClick?: boolean;
  isCloseOnEscape?: boolean;
}) {
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
    OPEN_MODAL_STACK.push(token);

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
      if (OPEN_MODAL_STACK[OPEN_MODAL_STACK.length - 1] !== token) return;
      if (!modal?.contains(event.target as Node)) focusInside();
    }

    function handleKeyDown(e: KeyboardEvent) {
      if (OPEN_MODAL_STACK[OPEN_MODAL_STACK.length - 1] !== token) return;
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
      const idx = OPEN_MODAL_STACK.indexOf(token);
      if (idx !== -1) OPEN_MODAL_STACK.splice(idx, 1);
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) {
        previousFocus.focus({ preventScroll: true });
      }
    };
  }, [isOpen, portalTarget]);

  function handleBackdropPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    isBackdropPointerDownRef.current = e.target === e.currentTarget;
  }

  function handleBackdropClick(e: React.MouseEvent<HTMLDivElement>) {
    if (!isCloseOnBackdropClick) return;

    const isBackdropClick = isBackdropPointerDownRef.current && e.target === e.currentTarget;

    isBackdropPointerDownRef.current = false;

    if (isBackdropClick) onClose();
  }

  return { portalTarget, modalRef, titleId, handleBackdropPointerDown, handleBackdropClick };
}

// 서버와 초기 hydration에서는 생략하고, 클라이언트에서 body에 연결한다.
function subscribeToHydration() {
  return () => {};
}
