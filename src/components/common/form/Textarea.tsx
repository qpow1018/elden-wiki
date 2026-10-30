'use client';

import { type ComponentProps, useImperativeHandle, useLayoutEffect, useRef } from 'react';

import styles from './Textarea.module.scss';

export default function Textarea(
  props: Omit<ComponentProps<'textarea'>, 'onChange'> & {
    onChange?: (value: string) => void;
    isCursorAtEndOnAutoFocus?: boolean;
    isAutoHeight?: boolean;
  },
) {
  const { onChange, isCursorAtEndOnAutoFocus, isAutoHeight = false, ...textareaProps } = props;
  const internalRef = useRef<HTMLTextAreaElement | null>(null);
  useImperativeHandle(textareaProps.ref, () => internalRef.current!, []);

  useLayoutEffect(() => {
    const el = internalRef.current;
    if (!el || !isAutoHeight) return;

    const originalHeight = el.style.height;
    resizeToContent(el);
    let width = el.getBoundingClientRect().width;
    const observer = new ResizeObserver(() => {
      const nextWidth = el.getBoundingClientRect().width;
      if (nextWidth === width) return;
      width = nextWidth;
      resizeToContent(el);
    });
    observer.observe(el);
    return () => {
      observer.disconnect();
      el.style.height = originalHeight;
    };
  }, [isAutoHeight, textareaProps.style?.height]);

  useLayoutEffect(() => {
    if (isAutoHeight && internalRef.current) resizeToContent(internalRef.current);
  }, [textareaProps.value, textareaProps.defaultValue, textareaProps.rows, isAutoHeight]);

  useLayoutEffect(() => {
    const el = internalRef.current;
    if (!el || !textareaProps.autoFocus || !isCursorAtEndOnAutoFocus) return;
    const cursorPosition = el.value.length;
    el.setSelectionRange(cursorPosition, cursorPosition);
  }, [textareaProps.autoFocus, isCursorAtEndOnAutoFocus]);

  return (
    <div className={`${styles['textarea']} ${textareaProps.readOnly ? styles['is-readonly'] : ''}`}>
      <textarea
        {...textareaProps}
        ref={internalRef}
        rows={textareaProps.rows ?? 4}
        onChange={(event) => onChange?.(event.target.value)}
        onInput={(event) => {
          if (isAutoHeight) resizeToContent(event.currentTarget);
          textareaProps.onInput?.(event);
        }}
      />
    </div>
  );
}

function resizeToContent(el: HTMLTextAreaElement) {
  el.style.height = 'auto';
  el.style.height = `${el.scrollHeight}px`;
}
