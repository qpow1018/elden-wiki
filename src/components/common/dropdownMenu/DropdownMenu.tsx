'use client';

import { useEffect, useRef, useState } from 'react';

import styles from './DropdownMenu.module.scss';

export type TDropdownMenuItem = {
  label: string;
  onClick: () => void;
};

type TTriggerProps = {
  isOpen: boolean;
  toggle: () => void;
};

export default function DropdownMenu(props: {
  trigger: (handlers: TTriggerProps) => React.ReactNode;
  items: TDropdownMenuItem[];
}) {
  const { trigger, items } = props;

  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    function handlePointerDown(e: MouseEvent) {
      if (!containerRef.current?.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setIsOpen(false);
    }

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
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
    <div className={styles['dropdown-menu']} ref={containerRef}>
      {trigger({ isOpen, toggle })}

      {isOpen && (
        <ul className={styles['menu']} role="menu">
          {items.map((item, idx) => (
            <li key={idx}>
              <button
                type="button"
                role="menuitem"
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
