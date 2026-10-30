'use client';

import { useLayoutEffect, useRef } from 'react';

import styles from './Textarea.module.scss';

export default function Textarea(props: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  autoFocus?: boolean;
  isCursorAtEndOnAutoFocus?: boolean;
  isAutoHeight?: boolean;
  className?: string;
  ref?: React.Ref<HTMLTextAreaElement>;
}) {
  const {
    value,
    onChange,
    placeholder,
    rows = 4,
    autoFocus,
    isCursorAtEndOnAutoFocus,
    isAutoHeight,
    className,
    ref,
  } = props;

  const internalRef = useRef<HTMLTextAreaElement | null>(null);

  function setRefs(node: HTMLTextAreaElement | null) {
    internalRef.current = node;
    if (typeof ref === 'function') {
      ref(node);
    } else if (ref) {
      ref.current = node;
    }
  }

  useLayoutEffect(() => {
    const el = internalRef.current;
    if (!el) return;
    if (!isAutoHeight) {
      el.style.height = '';
      return;
    }
    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight}px`;
  }, [value, isAutoHeight]);

  useLayoutEffect(() => {
    const el = internalRef.current;
    if (!el || !autoFocus || !isCursorAtEndOnAutoFocus) return;

    const cursorPosition = el.value.length;
    el.setSelectionRange(cursorPosition, cursorPosition);
  }, [autoFocus, isCursorAtEndOnAutoFocus]);

  return (
    <div className={`${styles['textarea']} ${className ?? ''}`}>
      <textarea
        ref={setRefs}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        autoFocus={autoFocus}
      />
    </div>
  );
}
