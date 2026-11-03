import { useState } from 'react';

import gameItemQuery from '@/api/gameItem/gameItemQuery';
import type { TGameItemType } from '@/api/gameItem/types';
import { GAME_ITEM_TYPES } from '@/define/gameItems';

import Button from '@/components/common/button/Button';
import BottomModal from '@/components/common/modal/BottomModal';

import styles from './CatalogFilters.module.scss';

import { MdCheck, MdKeyboardArrowDown } from 'react-icons/md';

const TYPE_FILTERS: Partial<Record<TGameItemType, { categoryLabel: string }>> = {
  weapon: { categoryLabel: '무기 종류' },
  catalyst: { categoryLabel: '촉매 종류' },
  other_weapon: { categoryLabel: '기타 무기 종류' },
  armor: { categoryLabel: '장착 부위' },
  spell: { categoryLabel: '주문 종류' },
};

type TCatalogFiltersProps = {
  params: {
    type: TGameItemType;
    categoryId: number | undefined;
  };
  onChange: (filters: { categoryId: number | undefined }) => void;
};

export default function CatalogFilters({ params, onChange }: TCatalogFiltersProps) {
  const typeLabel = GAME_ITEM_TYPES[params.type];
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const categoriesQuery = gameItemQuery.useGetGameItemCategories();
  const categories = (categoriesQuery.data ?? []).filter(
    (category) => category.type === params.type,
  );
  const typeFilter = TYPE_FILTERS[params.type];
  const selectedCategory = categories.find((category) => category.id === params.categoryId);

  function handleCategoryChange(categoryId: number | undefined) {
    onChange({ categoryId });
    setIsCategoryOpen(false);
  }

  return (
    <section className={styles['catalog-filters']} aria-label="아이템 분류">
      <div className={styles['toolbar']}>
        <div className={styles['classification']}>
          {typeFilter ? (
            <button
              type="button"
              className={styles['category-trigger']}
              aria-label={`${typeFilter.categoryLabel}: ${selectedCategory?.name ?? `전체 ${typeLabel}`}`}
              aria-haspopup="dialog"
              aria-expanded={isCategoryOpen}
              disabled={categoriesQuery.isPending || categoriesQuery.isError}
              onClick={() => setIsCategoryOpen(true)}
            >
              <span>
                {categoriesQuery.isPending
                  ? '분류 불러오는 중'
                  : (selectedCategory?.name ?? `전체 ${typeLabel}`)}
              </span>
              <MdKeyboardArrowDown aria-hidden="true" />
            </button>
          ) : (
            <span className={styles['type-label']}>전체 {typeLabel}</span>
          )}
        </div>
      </div>
      {typeFilter && categoriesQuery.isError && (
        <div className={styles['category-error']} role="status">
          <p>분류를 불러오지 못했습니다.</p>
          <Button
            size="small"
            fill="outline"
            onClick={() => {
              void categoriesQuery.refetch();
            }}
          >
            다시 불러오기
          </Button>
        </div>
      )}

      {typeFilter && (
        <BottomModal
          isOpen={isCategoryOpen}
          onClose={() => setIsCategoryOpen(false)}
          title={typeFilter.categoryLabel}
          isCloseOnBackdropClick
        >
          <div className={styles['category-options']}>
            <button
              type="button"
              className={styles['category-option']}
              aria-pressed={params.categoryId === undefined}
              onClick={() => handleCategoryChange(undefined)}
            >
              전체 {typeLabel}
              {params.categoryId === undefined && <MdCheck aria-hidden="true" />}
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                type="button"
                className={styles['category-option']}
                aria-pressed={params.categoryId === category.id}
                onClick={() => handleCategoryChange(category.id)}
              >
                {category.name}
                {params.categoryId === category.id && <MdCheck aria-hidden="true" />}
              </button>
            ))}
          </div>
        </BottomModal>
      )}
    </section>
  );
}
