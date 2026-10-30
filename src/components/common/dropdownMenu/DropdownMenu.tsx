'use client';

import { type ComponentProps, useEffect, useId, useRef, useState } from 'react';

import styles from './DropdownMenu.module.scss';

export type TDropdownMenuItem = {
  label: string;
  onClick: () => void;
};

type TTriggerProps = {
  isOpen: boolean;
  triggerProps: ComponentProps<'button'>;
};

export default function DropdownMenu(props: {
  trigger: (handlers: TTriggerProps) => React.ReactNode;
  items: TDropdownMenuItem[];
}) {
  const { trigger, items } = props;

  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!isOpen) return;

    function handlePointerDown(e: MouseEvent) {
      if (!containerRef.current?.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handlePointerDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
    };
  }, [isOpen]);

  function toggle() {
    setIsOpen((v) => !v);
  }

  function handleItemClick(item: TDropdownMenuItem) {
    item.onClick();
    setIsOpen(false);
  }

  return (
    <div
      className={styles['dropdown-menu']}
      ref={containerRef}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setIsOpen(false);
      }}
      onKeyDown={(event) => {
        if (!isOpen || event.key !== 'Escape') return;
        event.stopPropagation();
        setIsOpen(false);
        triggerRef.current?.focus();
      }}
    >
      {trigger({
        isOpen,
        triggerProps: {
          ref: triggerRef,
          type: 'button',
          onClick: toggle,
          'aria-expanded': isOpen,
          'aria-controls': isOpen ? menuId : undefined,
        },
      })}

      {isOpen && (
        <ul id={menuId} className={styles['menu']}>
          {items.map((item, idx) => (
            <li key={idx}>
              <button
                type="button"
                className={styles['menu-item']}
                onClick={() => handleItemClick(item)}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
