import { useId, useState } from 'react';

import gameItemQuery from '@/api/gameItem/gameItemQuery';
import type { TGameItemType, TReqGetGameItems } from '@/api/gameItem/types';
import { CONTENTS } from '@/app/catalog/[type]/_define/gameItems';

import Button from '@/components/common/button/Button';
import Select from '@/components/common/form/Select';

import styles from './CatalogFilters.module.scss';

import { MdCheck, MdTune } from 'react-icons/md';

const TYPE_FILTERS: Partial<Record<TGameItemType, { categoryLabel: string }>> = {
  weapon: { categoryLabel: '무기 종류' },
  armor: { categoryLabel: '장착 부위' },
  spell: { categoryLabel: '주문 종류' },
};

const CONTENT_OPTIONS = [
  { value: '', label: '전체 콘텐츠' },
  ...Object.entries(CONTENTS).map(([value, label]) => ({ value, label })),
];

type TCatalogFiltersProps = {
  params: Omit<TReqGetGameItems, 'signal' | 'type' | 'search'> & { type: TGameItemType };
  onChange: (
    filters: Partial<Omit<TReqGetGameItems, 'signal' | 'type' | 'search' | 'page' | 'pageSize'>>,
  ) => void;
  typeLabel: string;
};

export default function CatalogFilters({ params, onChange, typeLabel }: TCatalogFiltersProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const panelId = useId();
  const categoriesQuery = gameItemQuery.useGetGameItemCategories();
  const categories = (categoriesQuery.data ?? []).filter(
    (category) => category.type === params.type,
  );
  const typeFilter = TYPE_FILTERS[params.type];
  const hasContentFilter = Boolean(params.contentCode);

  return (
    <section className={styles['catalog-filters']} aria-label="아이템 분류 및 필터">
      <div className={styles['toolbar']}>
        <div className={styles['classification']}>
          {typeFilter ? (
            <Select
              aria-label={typeFilter.categoryLabel}
              value={String(params.categoryId ?? '')}
              disabled={categoriesQuery.isPending || categoriesQuery.isError}
              options={[
                {
                  value: '',
                  label: categoriesQuery.isPending ? '분류 불러오는 중' : `전체 ${typeLabel}`,
                },
                ...categories.map((category) => ({
                  value: String(category.id),
                  label: category.name,
                })),
              ]}
              onChange={(categoryId) =>
                onChange({ categoryId: categoryId ? Number(categoryId) : undefined })
              }
            />
          ) : (
            <span className={styles['type-label']}>전체 {typeLabel}</span>
          )}
        </div>
        <Button
          theme={hasContentFilter || isFilterOpen ? 'brass' : 'gray'}
          fill="outline"
          aria-expanded={isFilterOpen}
          aria-controls={panelId}
          aria-label={hasContentFilter ? '콘텐츠 필터, 1개 적용 중' : '콘텐츠 필터'}
          onClick={() => setIsFilterOpen((previous) => !previous)}
        >
          <MdTune aria-hidden="true" />
          필터{hasContentFilter && <span className={styles['filter-count']}>1</span>}
        </Button>
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
      <div id={panelId} hidden={!isFilterOpen}>
        <fieldset className={styles['content-panel']}>
          <legend>콘텐츠</legend>
          <div className={styles['content-options']}>
            {CONTENT_OPTIONS.map(({ value, label }) => (
              <label className={styles['content-option']} key={value}>
                <input
                  type="radio"
                  name={`${panelId}-content`}
                  value={value}
                  checked={(params.contentCode ?? '') === value}
                  onChange={() => onChange({ contentCode: value || undefined })}
                />
                <span>{label}</span>
                {(params.contentCode ?? '') === value && <MdCheck aria-hidden="true" />}
              </label>
            ))}
          </div>
        </fieldset>
      </div>
    </section>
  );
}
