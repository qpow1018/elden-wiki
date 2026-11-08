'use client';

import { useRef, type ComponentProps, type KeyboardEvent, type ReactNode } from 'react';

import styles from './TextInput.module.scss';

import { MdClose } from 'react-icons/md';

export default function TextInput(
  props: Omit<ComponentProps<'input'>, 'onChange'> & {
    startIcon?: ReactNode;
    onChange?: (value: string) => void;
    onClear?: () => void;
    onPressEnter?: () => void;
  },
) {
  const { startIcon, onChange, onClear, onPressEnter, ...inputProps } = props;
  const containerRef = useRef<HTMLDivElement>(null);
  const isClearable = onClear !== undefined && inputProps.value != null;
  const hasValue = String(inputProps.value ?? '').length > 0;
  const canClear = isClearable && hasValue && !inputProps.disabled && !inputProps.readOnly;

  function handleClear() {
    onClear?.();
    containerRef.current?.querySelector('input')?.focus();
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    inputProps.onKeyDown?.(e);
    if (e.defaultPrevented) return;
    if (inputProps.readOnly) return;
    // IME 확정 Enter는 일부 브라우저에서 isComposing이 false일 수 있다.
    if (e.nativeEvent.isComposing || e.nativeEvent.keyCode === 229) return;
    if (e.key === 'Enter' && onPressEnter !== undefined) {
      onPressEnter();
    }
  }

  return (
    <div
      ref={containerRef}
      className={`${styles['text-input']} ${inputProps.readOnly ? styles['is-readonly'] : ''} ${isClearable ? styles['is-clearable'] : ''}`}
    >
      {startIcon && (
        <span className={styles['start-icon']} aria-hidden="true">
          {startIcon}
        </span>
      )}
      <input
        {...inputProps}
        type={inputProps.type ?? 'text'}
        onChange={(e) => onChange?.(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      {canClear && (
        <button
          type="button"
          aria-label="입력값 지우기"
          className={styles['clear-button']}
          onClick={handleClear}
        >
          <MdClose size={18} aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
