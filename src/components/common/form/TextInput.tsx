'use client';

import type { ComponentProps, KeyboardEvent } from 'react';

import styles from './TextInput.module.scss';

export default function TextInput(
  props: Omit<ComponentProps<'input'>, 'onChange'> & {
    onChange?: (value: string) => void;
    onPressEnter?: () => void;
  },
) {
  const { onChange, onPressEnter, ...inputProps } = props;

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
    <div className={`${styles['text-input']} ${inputProps.readOnly ? styles['is-readonly'] : ''}`}>
      <input
        {...inputProps}
        type={inputProps.type ?? 'text'}
        onChange={(e) => onChange?.(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}
