'use client';

import styles from './TextInput.module.scss';

export default function TextInput(props: {
  value: string;
  onChange?: (value: string) => void;
  isReadonly?: boolean;
  inputMode?: React.ComponentProps<'input'>['inputMode'];
  placeholder?: string;
  onPressEnter?: () => void;
  className?: string;
  ref?: React.Ref<HTMLInputElement>;
}) {
  const {
    value,
    onChange,
    isReadonly = false,
    inputMode,
    placeholder,
    onPressEnter,
    className,
    ref,
  } = props;
  const isReadOnly = isReadonly || onChange === undefined;

  function handleKeyUp(e: React.KeyboardEvent<HTMLInputElement>) {
    if (isReadOnly) return;
    if (e.nativeEvent.isComposing) return;
    if (e.key === 'Enter' && onPressEnter !== undefined) {
      onPressEnter();
    }
  }

  return (
    <div
      className={`${styles['text-input']} ${isReadOnly ? styles['is-readonly'] : ''} ${className ?? ''}`}
    >
      <input
        ref={ref}
        type="text"
        value={value}
        readOnly={isReadOnly}
        inputMode={inputMode}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        onKeyUp={handleKeyUp}
      />
    </div>
  );
}
