'use client';

import { useState } from 'react';

import equipmentQuery from '@/api/equipment/equipmentQuery';
import type { TEquipment, TReqGetEquipment } from '@/api/equipment/types';

import Image from 'next/image';

import styles from './HomeClient.module.scss';

const ITEM_TYPES: Record<string, string> = {
  weapon: '무기',
  armor: '방어구',
  talisman: '탈리스만',
  spirit_ash: '뼛가루',
  ash_of_war: '전회',
  spell: '마술·기도',
  gesture: '제스처',
};
const CONTENTS: Record<string, string> = {
  base_game: '본편',
  shadow_of_the_erdtree: '황금 나무의 그림자',
  tarnished_pack: '빛바랜 자 팩',
};
const AFFINITIES: Record<string, string> = {
  standard: '표준',
  heavy: '중후',
  keen: '예리',
  quality: '상질',
  fire: '화염',
  flame_art: '화염술',
  lightning: '벼락',
  sacred: '신성',
  magic: '마력',
  cold: '냉기',
  poison: '독',
  blood: '피',
  occult: '신비',
};
const ATTRIBUTES = [
  ['strength', '근력'],
  ['dexterity', '기량'],
  ['intelligence', '지력'],
  ['faith', '신앙'],
  ['arcane', '신비'],
] as const;
const ELEMENTS = [
  ['physical', '물리'],
  ['magic', '마력'],
  ['fire', '화염'],
  ['lightning', '벼락'],
  ['holy', '신성'],
] as const;
const ATTACK_TYPES: Record<string, string> = {
  standard: '표준',
  slash: '참격',
  strike: '타격',
  pierce: '관통',
};
const UPGRADE_MATERIALS: Record<string, string> = {
  smithing_stone: '단석',
  somber_smithing_stone: '색 잃은 단석',
};

export default function HomeClient() {
  const [params, setParams] = useState<Omit<TReqGetEquipment, 'signal'>>({
    page: 1,
    pageSize: 20,
  });
  const { data, isPending, isError, isSuccess, refetch } = equipmentQuery.useGetEquipment(params);
  const categoriesQuery = equipmentQuery.useGetEquipmentCategories();
  const items = data?.items ?? [];
  const totalCount = data?.totalCount ?? 0;
  const totalPages = Math.ceil(totalCount / params.pageSize);
  const firstPage = Math.floor((params.page - 1) / 5) * 5 + 1;
  const pageNumbers = Array.from(
    { length: Math.max(0, Math.min(5, totalPages - firstPage + 1)) },
    (_, index) => firstPage + index,
  );
  const categories = (categoriesQuery.data ?? []).filter(
    (category) => !params.type || category.type === params.type,
  );
  const hasFilters = Boolean(
    params.search || params.type || params.categoryId !== undefined || params.contentCode,
  );

  function handleFilterChange(
    filters: Partial<Omit<TReqGetEquipment, 'signal' | 'page' | 'pageSize'>>,
  ) {
    setParams((previous) => ({ ...previous, ...filters, page: 1 }));
  }

  function handleReset() {
    setParams((previous) => ({ page: 1, pageSize: previous.pageSize }));
  }

  return (
    <main className={styles['page']}>
      <header className={styles['header']}>
        <span className={styles['brand']}>엘든링 위키</span>
        <span>틈새의 땅 도감</span>
      </header>
      <div className={styles['intro']}>
        <h1>장비 도감</h1>
        <p>무엇을 들고, 어떤 길을 걸을 것인가.</p>
        <p className={styles['hint']}>장비의 설명부터 능력치까지, 한곳에서 확인하세요.</p>
      </div>
      <div className={styles['filters']}>
        <label className={styles['search']}>
          장비 검색
          <input
            type="search"
            placeholder="장비 이름으로 검색"
            value={params.search ?? ''}
            onChange={(event) => handleFilterChange({ search: event.target.value || undefined })}
          />
        </label>
        <label>
          종류
          <select
            value={params.type ?? ''}
            onChange={(event) =>
              handleFilterChange({
                type: (event.target.value || undefined) as TEquipment['type'] | undefined,
                categoryId: undefined,
              })
            }
          >
            <option value="">모든 종류</option>
            {Object.entries(ITEM_TYPES).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
        </label>
        <label>
          세부 분류
          <select
            value={params.categoryId ?? ''}
            disabled={categoriesQuery.isPending || categoriesQuery.isError}
            onChange={(event) =>
              handleFilterChange({
                categoryId: event.target.value ? Number(event.target.value) : undefined,
              })
            }
          >
            <option value="">모든 분류</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          콘텐츠
          <select
            value={params.contentCode ?? ''}
            onChange={(event) =>
              handleFilterChange({ contentCode: event.target.value || undefined })
            }
          >
            <option value="">전체 콘텐츠</option>
            {Object.entries(CONTENTS).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
        </label>
      </div>
      {categoriesQuery.isError && (
        <p className={styles['note']}>
          세부 분류를 불러오지 못했습니다.{' '}
          <button
            onClick={() => {
              void categoriesQuery.refetch();
            }}
          >
            분류 다시 불러오기
          </button>
        </p>
      )}
      <div className={styles['list-heading']}>
        <h2>
          장비 목록 <span>{data ? totalCount : '—'}</span>
        </h2>
        <button onClick={handleReset}>필터 초기화</button>
      </div>
      <p className={styles['note']}>
        공격력·가드·능력 보정은 최대 강화 기준입니다. 공격력·가드는 표준 변질(변질 불가 무기는 기본
        상태), 부가 효과는 미강화 기준입니다. 0은 효과 없음, 미확인은 미등록 정보입니다.
      </p>
      <div aria-live="polite">
        {isPending && <p className={styles['message']}>장비를 불러오고 있습니다.</p>}
        {isError && (
          <div className={styles['message']}>
            <p>장비 정보를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.</p>
            <button
              onClick={() => {
                void refetch();
              }}
            >
              다시 불러오기
            </button>
          </div>
        )}
        {isSuccess && items.length === 0 && (
          <div className={styles['message']}>
            <p>
              {hasFilters ? '검색 조건에 맞는 장비가 없습니다.' : '아직 등록된 장비가 없습니다.'}
            </p>
            {hasFilters && <button onClick={handleReset}>전체 목록 보기</button>}
          </div>
        )}
        {isSuccess && items.map((item) => <EquipmentCard key={item.id} item={item} />)}
      </div>
      {isSuccess && totalPages > 0 && (
        <nav className={styles['pagination']} aria-label="장비 목록 페이지">
          <button
            disabled={params.page === 1}
            onClick={() => setParams((previous) => ({ ...previous, page: previous.page - 1 }))}
          >
            이전
          </button>
          {pageNumbers.map((page) => (
            <button
              key={page}
              aria-label={`${page}페이지`}
              aria-current={page === params.page ? 'page' : undefined}
              onClick={() => setParams((previous) => ({ ...previous, page }))}
            >
              {page}
            </button>
          ))}
          <button
            disabled={params.page >= totalPages}
            onClick={() => setParams((previous) => ({ ...previous, page: previous.page + 1 }))}
          >
            다음
          </button>
          <span>
            {params.page} / {totalPages} 페이지
          </span>
        </nav>
      )}
      <footer className={styles['footer']}>엘든링 위키 · 장비 도감</footer>
    </main>
  );
}

function EquipmentCard({ item }: { item: TEquipment }) {
  const w = item.weaponDetails;
  const armor = item.armorDetails;
  const talisman = item.talismanDetails;
  return (
    <article className={styles['item']}>
      <div className={styles['identity']}>
        <div className={styles['image']}>
          {item.imageUrl ? (
            <Image
              src={item.imageUrl}
              alt={item.name}
              width={112}
              height={112}
              unoptimized
              referrerPolicy="no-referrer"
            />
          ) : (
            <span>이미지 없음</span>
          )}
        </div>
        <div>
          <p className={styles['category']}>
            {ITEM_TYPES[item.type]} / {item.itemCategories?.name ?? '분류 미확인'}
          </p>
          <h2>{item.name}</h2>
          <span className={styles['badge']}>{CONTENTS[item.contentCode] ?? item.contentCode}</span>
        </div>
      </div>
      <p className={styles['description']}>
        {item.gameDescription ?? '장비 설명이 아직 등록되지 않았습니다.'}
      </p>
      {item.effectDescription && (
        <section className={styles['stat-group']}>
          <h3>부가 효과</h3>
          <p className={styles['description']}>{item.effectDescription}</p>
        </section>
      )}
      {talisman && (
        <dl className={styles['meta']}>
          <div>
            <dt>중량</dt>
            <dd>{value(talisman.weight)}</dd>
          </div>
        </dl>
      )}
      {w && (
        <>
          <dl className={styles['meta']}>
            <div>
              <dt>무게</dt>
              <dd>{value(w.weight)}</dd>
            </div>
            <div>
              <dt>공격 속성</dt>
              <dd>
                {Array.isArray(w.physicalAttackTypes)
                  ? w.physicalAttackTypes.map((t) => ATTACK_TYPES[t] ?? t).join(' / ') || '없음'
                  : '미확인'}
              </dd>
            </div>
            <div>
              <dt>강화 재료</dt>
              <dd>{UPGRADE_MATERIALS[String(w.upgradeMaterial)] ?? '미확인'}</dd>
            </div>
            <div>
              <dt>변질</dt>
              <dd>{formatAffinity(w.canChangeAffinity)}</dd>
            </div>
          </dl>
          <div className={styles['stats']}>
            <StatGroup
              title="공격력"
              stats={w}
              fields={[
                ...ELEMENTS.map(([k, l]) => [`attack${k[0].toUpperCase()}${k.slice(1)}`, l]),
                ['critical', '치명'],
              ]}
            />
            <StatGroup
              title="가드 시 경감률"
              stats={w}
              fields={[
                ...ELEMENTS.map(([k, l]) => [`guard${k[0].toUpperCase()}${k.slice(1)}`, l]),
                ['guardBoost', '가드 강도'],
              ]}
            />
            <StatGroup
              title="필요 능력치"
              stats={w}
              fields={ATTRIBUTES.map(([k, l]) => [`required${k[0].toUpperCase()}${k.slice(1)}`, l])}
            />
            <StatGroup
              title="부가 효과"
              stats={w}
              fields={[
                ['bleed', '출혈'],
                ['frostbite', '동상'],
                ['poison', '독'],
                ['scarletRot', '붉은 부패'],
              ]}
            />
          </div>
          <div className={styles['bottom']}>
            <section className={styles['skill']}>
              <h3>전투 기술 · {w.weaponSkills?.name ?? '미확인'}</h3>
              <p>소모 FP {w.weaponSkills?.fpCostText ?? '미확인'}</p>
              <p className={styles['description']}>
                {w.weaponSkills?.description ?? '전투 기술 설명이 아직 등록되지 않았습니다.'}
              </p>
            </section>
            <section className={styles['scalings']}>
              <h3>변질별 능력 보정</h3>
              {w.weaponScalings.length > 0 && (
                <div
                  className={styles['table-scroll']}
                  tabIndex={0}
                  role="region"
                  aria-label={`${item.name} 변질별 능력 보정`}
                >
                  <table>
                    <thead>
                      <tr>
                        <th scope="col">변질</th>
                        {ATTRIBUTES.map(([k, l]) => (
                          <th key={k} scope="col">
                            {l}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {Object.keys(AFFINITIES).flatMap((affinity) =>
                        w.weaponScalings
                          .filter((s) => s.affinity === affinity)
                          .map((s) => (
                            <tr key={affinity}>
                              <th scope="row">{AFFINITIES[affinity]}</th>
                              {ATTRIBUTES.map(([k]) => (
                                <td key={k}>{value(s[k])}</td>
                              ))}
                            </tr>
                          )),
                      )}
                    </tbody>
                  </table>
                </div>
              )}
              {w.weaponScalings.length === 0 && <p>능력 보정 정보가 아직 등록되지 않았습니다.</p>}
            </section>
          </div>
        </>
      )}
      {armor && (
        <div className={styles['stats']}>
          <StatGroup
            title="기본 능력치"
            stats={armor}
            fields={[
              ['weight', '중량'],
              ['poise', '강인도'],
            ]}
          />
          <StatGroup
            title="경감률"
            stats={armor}
            fields={[
              ['negationPhysical', '물리'],
              ['negationStrike', '타격'],
              ['negationSlash', '참격'],
              ['negationPierce', '관통'],
              ['negationMagic', '마력'],
              ['negationFire', '화염'],
              ['negationLightning', '벼락'],
              ['negationHoly', '신성'],
            ]}
          />
          <StatGroup
            title="내성"
            stats={armor}
            fields={[
              ['immunity', '면역'],
              ['robustness', '강건'],
              ['focus', '이성'],
              ['vitality', '항사'],
            ]}
          />
        </div>
      )}
      {!w && !armor && !talisman && (
        <p className={styles['note']}>상세 능력치가 아직 등록되지 않았습니다.</p>
      )}
    </article>
  );
}
function value(v: unknown) {
  return v == null ? '미확인' : String(v);
}

function StatGroup({
  title,
  stats,
  fields,
}: {
  title: string;
  stats: Record<string, unknown>;
  fields: readonly (readonly string[])[];
}) {
  return (
    <section className={styles['stat-group']}>
      <h3>{title}</h3>
      <dl>
        {fields.map(([key, label]) => (
          <div key={key}>
            <dt>{label}</dt>
            <dd>{value(stats[key])}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function formatAffinity(canChange: boolean | null) {
  if (canChange == null) return '미확인';
  return canChange ? '가능' : '불가';
}
