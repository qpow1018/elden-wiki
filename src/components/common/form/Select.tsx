'use client';

import { useEffect, useId, useRef, useState } from 'react';

import styles from './Select.module.scss';

import { MdKeyboardArrowDown } from 'react-icons/md';

type TSelectOption = {
  value: string;
  label: string;
  isDisabled?: boolean;
};

export default function Select(props: {
  id?: string;
  labelId: string;
  options: readonly TSelectOption[];
  value: string;
  onChange: (value: string) => void;
  isDisabled?: boolean;
  className?: string;
}) {
  const { id, labelId, options, value, onChange, isDisabled = false, className } = props;
  const generatedId = useId();
  const listboxId = `${id ?? generatedId}-listbox`;
  const selectedIndex = Math.max(
    options.findIndex((option) => option.value === value && !option.isDisabled),
    0,
  );

  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(selectedIndex);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listboxRef = useRef<HTMLUListElement>(null);
  const optionRefs = useRef<Array<HTMLLIElement | null>>([]);

  useEffect(() => {
    if (!isOpen) return;

    function handlePointerDown(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handlePointerDown);
    return () => document.removeEventListener('mousedown', handlePointerDown);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    listboxRef.current?.focus();
    optionRefs.current[activeIndex]?.scrollIntoView({ block: 'nearest' });
  }, [activeIndex, isOpen]);

  function open() {
    if (isDisabled) return;
    setActiveIndex(selectedIndex);
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  function selectOption(option: TSelectOption) {
    if (option.isDisabled) return;
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
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      open();
      return;
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (isOpen) close();
      else open();
    }
  }

  function handleListboxKeyDown(event: React.KeyboardEvent<HTMLUListElement>) {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveIndex((index) => getNextEnabledIndex(index, 1));
      return;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveIndex((index) => getNextEnabledIndex(index, -1));
      return;
    }

    if (event.key === 'Home') {
      event.preventDefault();
      setActiveIndex(options.findIndex((option) => !option.isDisabled));
      return;
    }

    if (event.key === 'End') {
      event.preventDefault();
      setActiveIndex(options.findLastIndex((option) => !option.isDisabled));
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

  const selectedOption = options.find((option) => option.value === value);

  return (
    <div className={`${styles['select']} ${className ?? ''}`} ref={containerRef}>
      <button
        id={id}
        ref={triggerRef}
        type="button"
        className={styles['trigger']}
        aria-labelledby={labelId}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        disabled={isDisabled}
        onClick={() => (isOpen ? close() : open())}
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
          aria-labelledby={labelId}
          aria-activedescendant={`${listboxId}-option-${activeIndex}`}
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
