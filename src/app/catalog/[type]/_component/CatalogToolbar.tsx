import { useState } from 'react';

import type { TGameItemType, TGameItemCategory } from '@/api/gameItem/types';
import { GAME_ITEM_TYPES } from '@/define/gameItems';

import BottomModal from '@/components/common/modal/BottomModal';

import styles from './CatalogToolbar.module.scss';

import { MdCheck, MdKeyboardArrowDown } from 'react-icons/md';

const TYPE_FILTERS: Partial<Record<TGameItemType, { categoryLabel: string }>> = {
  weapon: { categoryLabel: '무기 종류' },
  catalyst: { categoryLabel: '촉매 종류' },
  other_weapon: { categoryLabel: '기타 무기 종류' },
  armor: { categoryLabel: '장착 부위' },
  spell: { categoryLabel: '주문 종류' },
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
      </div>

      {categories.length > 1 && (
        <BottomModal
          isOpen={isCategoryOpen}
          onClose={() => setIsCategoryOpen(false)}
          title={categoryLabel}
          isCloseOnBackdropClick
        >
          <div className={styles['category-options']}>
            {categories.map((category) => (
              <button
                key={category.id}
                type="button"
                className={styles['category-option']}
                aria-pressed={categoryId === category.id}
                onClick={() => handleCategoryChange(category.id)}
              >
                {category.name}
                {categoryId === category.id && <MdCheck aria-hidden="true" />}
              </button>
            ))}
          </div>
        </BottomModal>
      )}
    </section>
  );
}
