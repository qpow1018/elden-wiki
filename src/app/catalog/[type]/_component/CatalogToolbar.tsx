import { useState, type MouseEvent } from 'react';

import gameItemQuery from '@/api/gameItem/gameItemQuery';

import type { TGameItemType, TGameItemCategory } from '@/api/gameItem/types';
import { GAME_ITEM_TYPES } from '@/define/gameItems';

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

type TCatalogToolbarProps = {
  type: TGameItemType;
  categories: TGameItemCategory[];
  categoryId: number | undefined;
  onChange: (categoryId: number) => void;
};

export default function CatalogToolbar({
  type,
  categories,
  categoryId,
  onChange,
}: TCatalogToolbarProps) {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isTableOfContentsOpen, setIsTableOfContentsOpen] = useState(false);

  const typeFilter = TYPE_FILTERS[type];
  const categoryLabel = typeFilter?.categoryLabel ?? '분류';
  const selectedCategory = categories.find((category) => category.id === categoryId);

  function handleCategoryChange(nextCategoryId: number) {
    onChange(nextCategoryId);
    setIsCategoryOpen(false);
  }

  return (
    <section className={styles['catalog-toolbar']} aria-label="아이템 분류">
      <div className={styles['toolbar']}>
        <div className={styles['classification']}>
          {categories.length > 1 ? (
            <button
              type="button"
              className={`${styles['category-label']} ${styles['category-trigger']}`}
              aria-label={`${categoryLabel}: ${selectedCategory?.name}`}
              aria-haspopup="dialog"
              aria-expanded={isCategoryOpen}
              onClick={() => setIsCategoryOpen(true)}
            >
              <span>{selectedCategory?.name}</span>
              <MdKeyboardArrowDown aria-hidden="true" />
            </button>
          ) : (
            <span className={styles['category-label']}>
              {selectedCategory?.name ?? GAME_ITEM_TYPES[type]}
            </span>
          )}
        </div>
        {selectedCategory && (
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

      {categories.length > 1 && (
        <CategoryModal
          isOpen={isCategoryOpen}
          onClose={() => setIsCategoryOpen(false)}
          title={categoryLabel}
          categories={categories}
          categoryId={categoryId}
          onChange={handleCategoryChange}
        />
      )}
      {selectedCategory && (
        <TableOfContentsModal
          key={selectedCategory.id}
          isOpen={isTableOfContentsOpen}
          onClose={() => setIsTableOfContentsOpen(false)}
          type={type}
          categoryId={selectedCategory.id}
          categoryName={selectedCategory.name}
        />
      )}
    </section>
  );
}

function CategoryModal({
  isOpen,
  onClose,
  title,
  categories,
  categoryId,
  onChange,
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  categories: TGameItemCategory[];
  categoryId: number | undefined;
  onChange: (categoryId: number) => void;
}) {
  return (
    <BottomModal isOpen={isOpen} onClose={onClose} title={title} isCloseOnBackdropClick>
      <div className={styles['category-options']}>
        {categories.map((category) => (
          <button
            key={category.id}
            type="button"
            className={styles['category-option']}
            aria-pressed={categoryId === category.id}
            onClick={() => onChange(category.id)}
          >
            {category.name}
            {categoryId === category.id && <MdCheck aria-hidden="true" />}
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
  categoryId: number;
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
