import { useState, type MouseEvent } from 'react';

import gameItemQuery from '@/api/gameItem/gameItemQuery';
import type { TGameItemType } from '@/api/gameItem/types';

import BottomModal from '@/components/common/modal/BottomModal';
import Modal from '@/components/common/modal/Modal';

import styles from './CatalogToolbar.module.scss';

import { MdCheck, MdKeyboardArrowDown, MdFormatListNumbered, MdChevronRight } from 'react-icons/md';

const TYPE_FILTERS: Partial<Record<TGameItemType, { categoryLabel: string }>> = {
  weapon: { categoryLabel: '무기 종류' },
  other_weapon: { categoryLabel: '기타 무기 종류' },
  armor: { categoryLabel: '장착 부위' },
  sorcery: { categoryLabel: '마술 종류' },
  incantation: { categoryLabel: '기도 종류' },
};

type TCategoryOption = {
  id: number | undefined;
  name: string;
};

type TCatalogToolbarProps = {
  type: TGameItemType;
  categoryOptions: TCategoryOption[];
  categoryId: number | undefined;
  onCategoryChange: (categoryId: number | undefined) => void;
};

export default function CatalogToolbar({
  type,
  categoryOptions,
  categoryId,
  onCategoryChange,
}: TCatalogToolbarProps) {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isTableOfContentsOpen, setIsTableOfContentsOpen] = useState(false);

  const typeFilter = TYPE_FILTERS[type];
  const categoryLabel = typeFilter?.categoryLabel ?? '분류';
  const selectedCategory = categoryOptions.find((option) => option.id === categoryId);

  const selectedName = selectedCategory?.name ?? '–';
  const canSelectCategory = categoryOptions.length > 1;
  const hasCategoryOptions = categoryOptions.length > 0;

  function handleCategoryChange(nextCategoryId: number | undefined) {
    onCategoryChange(nextCategoryId);
    setIsCategoryOpen(false);
  }

  return (
    <section className={styles['catalog-toolbar']} aria-label="아이템 분류">
      <div className={styles['toolbar']}>
        <div className={styles['classification']}>
          {canSelectCategory ? (
            <button
              type="button"
              className={`${styles['category-label']} ${styles['category-trigger']}`}
              aria-label={`${categoryLabel}: ${selectedName}`}
              aria-haspopup="dialog"
              aria-expanded={isCategoryOpen}
              onClick={() => setIsCategoryOpen(true)}
            >
              <span>{selectedName}</span>
              <MdKeyboardArrowDown aria-hidden="true" />
            </button>
          ) : (
            <span className={styles['category-label']}>{selectedName}</span>
          )}
        </div>
        {hasCategoryOptions && (
          <button
            type="button"
            className={styles['toc-trigger']}
            aria-haspopup="dialog"
            aria-expanded={isTableOfContentsOpen}
            onClick={() => setIsTableOfContentsOpen(true)}
          >
            목차
            <MdFormatListNumbered aria-hidden="true" />
          </button>
        )}
      </div>

      {canSelectCategory && (
        <CategoryModal
          isOpen={isCategoryOpen}
          onClose={() => setIsCategoryOpen(false)}
          title={categoryLabel}
          categoryOptions={categoryOptions}
          categoryId={categoryId}
          onCategoryChange={handleCategoryChange}
        />
      )}
      {hasCategoryOptions && (
        <TableOfContentsModal
          key={categoryId ?? 'all'}
          isOpen={isTableOfContentsOpen}
          onClose={() => setIsTableOfContentsOpen(false)}
          type={type}
          categoryId={categoryId}
          categoryName={selectedName}
        />
      )}
    </section>
  );
}

function CategoryModal({
  isOpen,
  onClose,
  title,
  categoryOptions,
  categoryId,
  onCategoryChange,
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  categoryOptions: TCategoryOption[];
  categoryId: number | undefined;
  onCategoryChange: (categoryId: number | undefined) => void;
}) {
  return (
    <BottomModal isOpen={isOpen} onClose={onClose} title={title} isCloseOnBackdropClick>
      <div className={styles['category-options']}>
        {categoryOptions.map((option) => (
          <button
            key={option.id ?? 'all'}
            type="button"
            className={styles['category-option']}
            aria-pressed={categoryId === option.id}
            onClick={() => onCategoryChange(option.id)}
          >
            {option.name}
            {categoryId === option.id && <MdCheck aria-hidden="true" />}
          </button>
        ))}
      </div>
    </BottomModal>
  );
}

function TableOfContentsModal({
  isOpen,
  onClose,
  type,
  categoryId,
  categoryName,
}: {
  isOpen: boolean;
  onClose: () => void;
  type: TGameItemType;
  categoryId: number | undefined;
  categoryName: string;
}) {
  const { data } = gameItemQuery.useGetGameItems({ categoryId, type });
  const gameItems = data?.gameItems ?? [];

  function handleItemClick(event: MouseEvent<HTMLAnchorElement>, id: number) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    onClose();
    requestAnimationFrame(() => {
      const item = document.getElementById(`game-item-${id}`);
      item?.querySelector('h2')?.focus({ preventScroll: true });
      item?.scrollIntoView({ behavior: 'instant', block: 'start' });
    });
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="목차" isCloseOnBackdropClick>
      <nav className={styles['table-of-contents']} aria-label={`${categoryName} 목차`}>
        <div className={styles['summary']}>
          <span>{categoryName}</span>
          <span>{gameItems.length}개</span>
        </div>
        <ol className={styles['entries']}>
          {gameItems.map((gameItem, index) => (
            <li key={gameItem.id}>
              <a
                href={`#game-item-${gameItem.id}`}
                onClick={(event) => handleItemClick(event, gameItem.id)}
              >
                <span className={styles['number']} aria-hidden="true">
                  {index + 1}.
                </span>
                <span className={styles['name']}>{gameItem.name}</span>
                <MdChevronRight className={styles['chevron']} size={14} aria-hidden="true" />
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </Modal>
  );
}
