import { useState } from 'react';

import gameItemQuery from '@/api/gameItem/gameItemQuery';
import type { TGameItemType, TReqGetGameItems } from '@/api/gameItem/types';

import Button from '@/components/common/button/Button';
import Modal from '@/components/common/modal/Modal';

import styles from './CatalogFilters.module.scss';

import { MdCheck, MdKeyboardArrowDown } from 'react-icons/md';

const TYPE_FILTERS: Partial<Record<TGameItemType, { categoryLabel: string }>> = {
  weapon: { categoryLabel: '무기 종류' },
  armor: { categoryLabel: '장착 부위' },
  spell: { categoryLabel: '주문 종류' },
};

type TCatalogFiltersProps = {
  params: Omit<TReqGetGameItems, 'signal' | 'type' | 'search' | 'contentCode'> & {
    type: TGameItemType;
  };
  onChange: (
    filters: Partial<
      Omit<TReqGetGameItems, 'signal' | 'type' | 'search' | 'contentCode' | 'page' | 'pageSize'>
    >,
  ) => void;
  typeLabel: string;
};

export default function CatalogFilters({ params, onChange, typeLabel }: TCatalogFiltersProps) {
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
        <Modal
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
        </Modal>
      )}
    </section>
  );
}
