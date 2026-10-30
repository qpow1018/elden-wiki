'use client';

import {
  type ComponentProps,
  useEffect,
  useId,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

import styles from './Select.module.scss';

import { MdKeyboardArrowDown } from 'react-icons/md';

type TSelectOption = {
  value: string;
  label: string;
  isDisabled?: boolean;
};

export default function Select(
  props: Omit<ComponentProps<'button'>, 'onChange' | 'value' | 'children'> & {
    labelId?: string;
    options: readonly TSelectOption[];
    value: string;
    onChange: (value: string) => void;
  },
) {
  const { labelId, options, value, onChange, ...buttonProps } = props;
  const generatedId = useId();
  const listboxId = `${buttonProps.id ?? generatedId}-listbox`;
  const selectedOptionIndex = options.findIndex((option) => option.value === value);
  const selectedOption = options[selectedOptionIndex];
  const selectedIndex =
    selectedOption && !selectedOption.isDisabled
      ? selectedOptionIndex
      : options.findIndex((option) => !option.isDisabled);

  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(selectedIndex);
  const activeIndex =
    options[focusedIndex] && !options[focusedIndex].isDisabled ? focusedIndex : selectedIndex;
  if (buttonProps.disabled && isOpen) setIsOpen(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listboxRef = useRef<HTMLUListElement>(null);
  const optionRefs = useRef<Array<HTMLLIElement | null>>([]);

  useImperativeHandle(buttonProps.ref, () => triggerRef.current!, []);

  useEffect(() => {
    if (!isOpen) return;

    function handlePointerDown(event: PointerEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    listboxRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    optionRefs.current[activeIndex]?.scrollIntoView({ block: 'nearest' });
  }, [activeIndex, isOpen]);

  function open() {
    if (buttonProps.disabled) return;
    setFocusedIndex(selectedIndex);
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  function selectOption(option: TSelectOption) {
    if (buttonProps.disabled || option.isDisabled) return;
    onChange(option.value);
    close();
    triggerRef.current?.focus();
  }

  function getNextEnabledIndex(startIndex: number, direction: 1 | -1) {
    for (let offset = 1; offset <= options.length; offset += 1) {
      const nextIndex = (startIndex + direction * offset + options.length) % options.length;
      if (!options[nextIndex]?.isDisabled) return nextIndex;
    }

    return startIndex;
  }

  function handleTriggerKeyDown(event: React.KeyboardEvent<HTMLButtonElement>) {
    buttonProps.onKeyDown?.(event);
    if (event.defaultPrevented) return;
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      open();
    }
  }

  function handleListboxKeyDown(event: React.KeyboardEvent<HTMLUListElement>) {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setFocusedIndex(getNextEnabledIndex(activeIndex, 1));
      return;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      setFocusedIndex(getNextEnabledIndex(activeIndex, -1));
      return;
    }

    if (event.key === 'Home') {
      event.preventDefault();
      setFocusedIndex(options.findIndex((option) => !option.isDisabled));
      return;
    }

    if (event.key === 'End') {
      event.preventDefault();
      setFocusedIndex(options.findLastIndex((option) => !option.isDisabled));
      return;
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      const option = options[activeIndex];
      if (option) selectOption(option);
      return;
    }

    if (event.key === 'Escape') {
      event.preventDefault();
      close();
      triggerRef.current?.focus();
    }
  }

  return (
    <div
      className={styles['select']}
      ref={containerRef}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) close();
      }}
    >
      <button
        {...buttonProps}
        ref={triggerRef}
        type="button"
        className={`${styles['trigger']} ${buttonProps.className ?? ''}`}
        aria-labelledby={labelId ?? buttonProps['aria-labelledby']}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={isOpen ? listboxId : undefined}
        onClick={(event) => {
          buttonProps.onClick?.(event);
          if (event.defaultPrevented) return;
          if (isOpen) close();
          else open();
        }}
        onKeyDown={handleTriggerKeyDown}
      >
        <span>{selectedOption?.label}</span>
        <MdKeyboardArrowDown className={styles['arrow']} aria-hidden="true" />
      </button>

      {isOpen && (
        <ul
          id={listboxId}
          ref={listboxRef}
          className={styles['options']}
          role="listbox"
          aria-labelledby={labelId ?? buttonProps['aria-labelledby']}
          aria-label={buttonProps['aria-label']}
          aria-activedescendant={
            activeIndex >= 0 ? `${listboxId}-option-${activeIndex}` : undefined
          }
          tabIndex={-1}
          onKeyDown={handleListboxKeyDown}
        >
          {options.map((option, index) => (
            <li
              id={`${listboxId}-option-${index}`}
              key={option.value}
              ref={(element) => {
                optionRefs.current[index] = element;
              }}
              className={`${styles['option']} ${
                option.value === value ? styles['is-selected'] : ''
              } ${index === activeIndex ? styles['is-active'] : ''}`}
              role="option"
              aria-selected={option.value === value}
              aria-disabled={option.isDisabled}
              onClick={() => selectOption(option)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
