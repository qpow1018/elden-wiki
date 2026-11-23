import { useState, type MouseEvent } from 'react';

import gameItemQuery from '@/api/gameItem/gameItemQuery';
import type { TGameItem, TGameItemType, TGameItemCategory } from '@/api/gameItem/types';
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

type TContentsGroup = {
  name?: string;
  items: TGameItem[];
};

type TCatalogToolbarProps = {
  type: TGameItemType;
  categories: TGameItemCategory[];
  canSelectAllCategories: boolean;
  categoryId: number | undefined;
  subcategoryId: number | undefined;
  onCategoryChange: (categoryId: number | undefined, subcategoryId: number | undefined) => void;
};

export default function CatalogToolbar({
  type,
  categories,
  canSelectAllCategories,
  categoryId,
  onCategoryChange,
  subcategoryId,
}: TCatalogToolbarProps) {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isTableOfContentsOpen, setIsTableOfContentsOpen] = useState(false);

  const typeFilter = TYPE_FILTERS[type];
  const categoryLabel = typeFilter?.categoryLabel ?? '분류';
  const selectedCategory = categories.find((category) => category.id === categoryId);

  const selectedSubcategory = selectedCategory?.subcategories.find(
    (subcategory) => subcategory.id === subcategoryId,
  );
  const allCategoriesLabel = `${GAME_ITEM_TYPES[type]} 전체`;
  const selectedName =
    selectedCategory?.name ?? (canSelectAllCategories ? allCategoriesLabel : '–');
  const selectedLabel = selectedSubcategory
    ? `${selectedName} / ${selectedSubcategory.name}`
    : selectedName;
  const canSelectCategory =
    categories.length > 0 &&
    (canSelectAllCategories ||
      categories.length > 1 ||
      categories.some((category) => category.subcategories.length > 0));
  const hasCategories = categories.length > 0;

  function handleCategoryChange(
    nextCategoryId: number | undefined,
    nextSubcategoryId: number | undefined,
  ) {
    onCategoryChange(nextCategoryId, nextSubcategoryId);
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
              aria-label={`${categoryLabel}: ${selectedLabel}`}
              aria-haspopup="dialog"
              aria-expanded={isCategoryOpen}
              onClick={() => setIsCategoryOpen(true)}
            >
              <span>{selectedLabel}</span>
              <MdKeyboardArrowDown aria-hidden="true" />
            </button>
          ) : (
            <span className={styles['category-label']}>{selectedName}</span>
          )}
        </div>
        {hasCategories && (
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
          categories={categories}
          canSelectAllCategories={canSelectAllCategories}
          allCategoriesLabel={allCategoriesLabel}
          categoryId={categoryId}
          subcategoryId={subcategoryId}
          onCategoryChange={handleCategoryChange}
        />
      )}
      {hasCategories && (
        <TableOfContentsModal
          key={`${categoryId ?? 'all'}-${subcategoryId ?? 'all'}`}
          isOpen={isTableOfContentsOpen}
          onClose={() => setIsTableOfContentsOpen(false)}
          type={type}
          categoryId={categoryId}
          subcategoryId={subcategoryId}
          categoryName={selectedLabel}
        />
      )}
    </section>
  );
}

function CategoryModal({
  isOpen,
  onClose,
  title,
  allCategoriesLabel,
  categories,
  canSelectAllCategories,
  categoryId,
  subcategoryId,
  onCategoryChange,
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  allCategoriesLabel: string;
  categories: TGameItemCategory[];
  canSelectAllCategories: boolean;
  categoryId: number | undefined;
  subcategoryId: number | undefined;
  onCategoryChange: (categoryId: number | undefined, subcategoryId: number | undefined) => void;
}) {
  return (
    <BottomModal isOpen={isOpen} onClose={onClose} title={title} isCloseOnBackdropClick>
      <div className={styles['category-options']}>
        {canSelectAllCategories && (
          <button
            type="button"
            className={styles['category-option']}
            aria-pressed={categoryId === undefined}
            onClick={() => onCategoryChange(undefined, undefined)}
          >
            {allCategoriesLabel}
            {categoryId === undefined && <MdCheck aria-hidden="true" />}
          </button>
        )}
        {categories.map((category) => (
          <div key={category.id} className={styles['category-group']}>
            {category.subcategories.length > 0 && (
              <h2 className={styles['category-group-title']}>{category.name}</h2>
            )}
            <button
              type="button"
              className={styles['category-option']}
              aria-label={
                category.subcategories.length > 0 ? `${category.name} 전체` : category.name
              }
              aria-pressed={categoryId === category.id && subcategoryId === undefined}
              onClick={() => onCategoryChange(category.id, undefined)}
            >
              {category.subcategories.length > 0 ? '전체' : category.name}
              {categoryId === category.id && subcategoryId === undefined && (
                <MdCheck aria-hidden="true" />
              )}
            </button>
            {category.subcategories.map((subcategory) => (
              <button
                key={subcategory.id}
                type="button"
                className={styles['category-option']}
                aria-pressed={categoryId === category.id && subcategoryId === subcategory.id}
                onClick={() => onCategoryChange(category.id, subcategory.id)}
              >
                {subcategory.name}
                {categoryId === category.id && subcategoryId === subcategory.id && (
                  <MdCheck aria-hidden="true" />
                )}
              </button>
            ))}
          </div>
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
  subcategoryId,
}: {
  isOpen: boolean;
  onClose: () => void;
  type: TGameItemType;
  categoryId: number | undefined;
  categoryName: string;
  subcategoryId: number | undefined;
}) {
  const { data } = gameItemQuery.useGetGameItems({ categoryId, subcategoryId, type });
  const gameItems = data?.gameItems ?? [];
  const groups: TContentsGroup[] =
    categoryId === undefined ? groupContentsByCategory(gameItems) : [{ items: gameItems }];

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
        {groups.map(({ name, items }, groupIndex) => (
          <div key={name ?? categoryName} className={styles['contents-group']}>
            {name && (
              <h2 className={styles['group-title']}>
                {groupIndex + 1}. {name}
              </h2>
            )}
            <ol className={styles['entries']}>
              {items.map((gameItem, index) => (
                <li key={gameItem.id}>
                  <a
                    href={`#game-item-${gameItem.id}`}
                    onClick={(event) => handleItemClick(event, gameItem.id)}
                  >
                    <span className={styles['number']} aria-hidden="true">
                      {name ? `${groupIndex + 1}.${index + 1}` : `${index + 1}.`}
                    </span>
                    <span className={styles['name']}>{gameItem.name}</span>
                    <MdChevronRight className={styles['chevron']} size={14} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ol>
          </div>
        ))}
      </nav>
    </Modal>
  );
}

function groupContentsByCategory(gameItems: TGameItem[]): TContentsGroup[] {
  const groups: TContentsGroup[] = [];

  gameItems.forEach((item) => {
    const name = item.gameItemCategories?.name ?? '분류 없음';
    const lastGroup = groups.at(-1);

    if (lastGroup?.name === name) {
      lastGroup.items.push(item);
    } else {
      groups.push({ name, items: [item] });
    }
  });

  return groups;
}
