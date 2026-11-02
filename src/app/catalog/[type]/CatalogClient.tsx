'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import gameItemQuery from '@/api/gameItem/gameItemQuery';
import type { TGameItem, TGameItemType, TReqGetGameItems } from '@/api/gameItem/types';

import { CONTENTS, GAME_ITEM_TYPES } from './_define/gameItems';

import Header from '@/components/common/header/Header';
import CatalogFilters from './_component/CatalogFilters';
import Image from 'next/image';

import styles from './CatalogClient.module.scss';

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

export default function CatalogClient({ type }: { type: TGameItemType }) {
  const router = useRouter();
  const [params, setParams] = useState<Omit<TReqGetGameItems, 'signal' | 'type'>>({
    page: 1,
    pageSize: 20,
  });
  const { data, isPending, isError, isSuccess, refetch } = gameItemQuery.useGetGameItems({
    ...params,
    type,
  });
  const gameItems = data?.gameItems ?? [];
  const totalCount = data?.totalCount ?? 0;
  const totalPages = Math.ceil(totalCount / params.pageSize);
  const firstPage = Math.floor((params.page - 1) / 5) * 5 + 1;
  const pageNumbers = Array.from(
    { length: Math.max(0, Math.min(5, totalPages - firstPage + 1)) },
    (_, index) => firstPage + index,
  );
  const selectedTypeLabel = GAME_ITEM_TYPES[type];
  const hasFilters = Boolean(
    params.search || params.categoryId !== undefined || params.contentCode,
  );

  function handleFilterChange(
    filters: Partial<Omit<TReqGetGameItems, 'signal' | 'type' | 'page' | 'pageSize'>>,
  ) {
    setParams((previous) => ({ ...previous, ...filters, page: 1 }));
  }

  function handleReset() {
    setParams((previous) => ({ page: 1, pageSize: previous.pageSize }));
  }

  return (
    <main className={styles['page']}>
      <Header
        title="아이템 도감"
        rightComponents={
          <select
            className={styles['type-select']}
            aria-label="아이템 타입"
            value={type}
            onChange={(event) => router.push(`/catalog/${event.target.value}`)}
          >
            {Object.entries(GAME_ITEM_TYPES).map(([type, label]) => (
              <option key={type} value={type}>
                {label}
              </option>
            ))}
          </select>
        }
      />
      <CatalogFilters
        params={{ ...params, type }}
        onChange={handleFilterChange}
        onReset={handleReset}
      />
      <div className={styles['list-heading']}>
        <h2>
          {selectedTypeLabel} <span>{data ? totalCount : '—'}</span>
        </h2>
      </div>
      <p className={styles['note']}>
        공격력·가드·능력 보정은 최대 강화 기준입니다. 공격력·가드는 표준 변질(변질 불가 무기는 기본
        상태), 부가 효과는 미강화 기준입니다. 0은 효과 없음, 미확인은 미등록 정보입니다.
      </p>
      <div aria-live="polite">
        {isPending && <p className={styles['message']}>아이템을 불러오고 있습니다.</p>}
        {isError && (
          <div className={styles['message']}>
            <p>아이템 정보를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.</p>
            <button
              onClick={() => {
                void refetch();
              }}
            >
              다시 불러오기
            </button>
          </div>
        )}
        {isSuccess && gameItems.length === 0 && (
          <div className={styles['message']}>
            <p>
              {hasFilters
                ? '검색 조건에 맞는 아이템이 없습니다.'
                : '아직 등록된 아이템이 없습니다.'}
            </p>
            {hasFilters && <button onClick={handleReset}>전체 목록 보기</button>}
          </div>
        )}
        {isSuccess &&
          gameItems.map((gameItem) => <GameItemCard key={gameItem.id} gameItem={gameItem} />)}
      </div>
      {isSuccess && totalPages > 0 && (
        <nav className={styles['pagination']} aria-label="아이템 목록 페이지">
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
      <footer className={styles['footer']}>엘든링 위키 · 아이템 도감</footer>
    </main>
  );
}

function GameItemCard({ gameItem }: { gameItem: TGameItem }) {
  const w = gameItem.weaponDetails;
  const armor = gameItem.armorDetails;
  const talisman = gameItem.talismanDetails;
  const spell = gameItem.spellDetails;
  const ashOfWar = gameItem.ashOfWarDetails;
  return (
    <article className={styles['game-item']}>
      <div className={styles['identity']}>
        <div className={styles['image']}>
          {gameItem.imageUrl ? (
            <Image
              src={gameItem.imageUrl}
              alt={gameItem.name}
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
            {GAME_ITEM_TYPES[gameItem.type]} / {gameItem.gameItemCategories?.name ?? '분류 미확인'}
          </p>
          <h2>{gameItem.name}</h2>
          <span className={styles['badge']}>
            {CONTENTS[gameItem.contentCode] ?? gameItem.contentCode}
          </span>
        </div>
      </div>
      <p className={styles['description']}>
        {gameItem.gameDescription ?? '장비 설명이 아직 등록되지 않았습니다.'}
      </p>
      {gameItem.effectDescription && (
        <section className={styles['stat-group']}>
          <h3>부가 효과</h3>
          <p className={styles['description']}>{gameItem.effectDescription}</p>
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
                  aria-label={`${gameItem.name} 변질별 능력 보정`}
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
      {spell && (
        <div className={styles['stats']}>
          <StatGroup
            title="소비 FP·슬롯"
            stats={spell}
            fields={[
              ['fpCostText', '소비 FP'],
              ['slotsUsed', '사용 슬롯'],
            ]}
          />
          <StatGroup
            title="필요 능력치"
            stats={spell}
            fields={[
              ['requiredIntelligence', '지력'],
              ['requiredFaith', '신앙'],
              ['requiredArcane', '신비'],
            ]}
          />
        </div>
      )}
      {ashOfWar && (
        <>
          <dl className={styles['meta']}>
            <div>
              <dt>기본 변질</dt>
              <dd>{AFFINITIES[ashOfWar.nativeAffinity ?? ''] ?? '미확인'}</dd>
            </div>
            <div>
              <dt>전투 기술</dt>
              <dd>{ashOfWar.weaponSkills?.name ?? '미확인'}</dd>
            </div>
            <div>
              <dt>소비 FP</dt>
              <dd>{value(ashOfWar.weaponSkills?.fpCostText)}</dd>
            </div>
          </dl>
          <section className={styles['stat-group']}>
            <h3>적용 가능 무기</h3>
            <p className={styles['description']}>{ashOfWar.applicableArmamentsText ?? '미확인'}</p>
          </section>
        </>
      )}
      {!w && !armor && !talisman && !spell && !ashOfWar && gameItem.type !== 'crystal_tear' && (
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
