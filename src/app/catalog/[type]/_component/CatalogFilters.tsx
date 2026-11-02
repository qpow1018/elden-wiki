import { useState } from 'react';

import gameItemQuery from '@/api/gameItem/gameItemQuery';
import type { TGameItemType, TReqGetGameItems } from '@/api/gameItem/types';
import { CONTENTS } from '@/app/catalog/[type]/_define/gameItems';

import IconButton from '@/components/common/button/IconButton';
import Button from '@/components/common/button/Button';
import Select from '@/components/common/form/Select';

import styles from './CatalogFilters.module.scss';

import { MdTune } from 'react-icons/md';

const TYPE_FILTERS: Partial<Record<TGameItemType, { categoryLabel: string }>> = {
  weapon: { categoryLabel: '무기 종류' },
  armor: { categoryLabel: '장착 부위' },
  spell: { categoryLabel: '주문 종류' },
};

type TCatalogFiltersProps = {
  params: Omit<TReqGetGameItems, 'signal' | 'type' | 'search'> & { type: TGameItemType };
  onChange: (
    filters: Partial<Omit<TReqGetGameItems, 'signal' | 'type' | 'search' | 'page' | 'pageSize'>>,
  ) => void;
  onReset: () => void;
  typeLabel: string;
};

export default function CatalogFilters({
  params,
  onChange,
  onReset,
  typeLabel,
}: TCatalogFiltersProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const categoriesQuery = gameItemQuery.useGetGameItemCategories();
  const categories = (categoriesQuery.data ?? []).filter(
    (category) => category.type === params.type,
  );
  const typeFilter = TYPE_FILTERS[params.type];
  const selectedTypeLabel = typeLabel;
  const selectedCategory = categories.find((category) => category.id === params.categoryId);
  const hasFilters = Boolean(params.categoryId !== undefined || params.contentCode);

  return (
    <div className={styles['catalog-filters']}>
      <section className={styles['filters']} aria-label="아이템 필터">
        <div className={styles['toolbar']}>
          <div className={styles['classification']}>
            {!typeFilter && <span>{selectedTypeLabel}</span>}
            {typeFilter && (
              <select
                aria-label={typeFilter.categoryLabel}
                value={params.categoryId ?? ''}
                disabled={categoriesQuery.isPending || categoriesQuery.isError}
                onChange={(event) =>
                  onChange({
                    categoryId: event.target.value ? Number(event.target.value) : undefined,
                  })
                }
              >
                <option value="">
                  {categoriesQuery.isPending ? '로딩 중' : `전체 ${selectedTypeLabel}`}
                </option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            )}
          </div>
          <div className={styles['actions']}>
            <IconButton
              aria-label="상세 필터"
              aria-expanded={isFilterOpen}
              aria-controls="catalog-filter-panel"
              onClick={() => setIsFilterOpen((previous) => !previous)}
              theme={isFilterOpen || params.contentCode ? 'brass' : 'gray'}
            >
              <MdTune aria-hidden="true" />
              {params.contentCode && <span className={styles['count']}>1</span>}
            </IconButton>
          </div>
        </div>
        {typeFilter && categoriesQuery.isError && (
          <div className={styles['panel']} role="status">
            <span>세부 분류를 불러오지 못했습니다.</span>
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
        {isFilterOpen && (
          <div id="catalog-filter-panel" className={styles['panel']}>
            <div className={styles['filter-heading']}>
              <span id="content-label">콘텐츠</span>
              <Button
                size="small"
                fill="outline"
                theme="brass"
                disabled={!params.contentCode}
                onClick={() => onChange({ contentCode: undefined })}
              >
                필터 초기화
              </Button>
            </div>
            <Select
              labelId="content-label"
              value={params.contentCode ?? ''}
              options={[
                { value: '', label: '전체 콘텐츠' },
                ...Object.entries(CONTENTS).map(([value, label]) => ({ value, label })),
              ]}
              onChange={(contentCode) => onChange({ contentCode: contentCode || undefined })}
            />
          </div>
        )}
      </section>
      {hasFilters && (
        <div className={styles['active-filters']} aria-label="적용 중인 필터">
          <span>적용 중</span>
          <button onClick={onReset}>전체 초기화</button>
          {selectedCategory && (
            <button
              onClick={() => onChange({ categoryId: undefined })}
              aria-label={`${selectedCategory.name} 필터 해제`}
            >
              {selectedCategory.name} ×
            </button>
          )}
          {params.contentCode && (
            <button
              onClick={() => onChange({ contentCode: undefined })}
              aria-label="콘텐츠 필터 해제"
            >
              {CONTENTS[params.contentCode]} ×
            </button>
          )}
        </div>
      )}
    </div>
  );
}
