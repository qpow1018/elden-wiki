'use client';

import { useState } from 'react';
import Image from 'next/image';

import gameItemQuery from '@/api/gameItem/gameItemQuery';
import type { TGameItem, TGameItemType } from '@/api/gameItem/types';

import {
  AFFINITIES,
  ATTRIBUTES,
  ELEMENTS,
  ATTACK_TYPES,
  UPGRADE_MATERIALS,
  CONTENTS,
  GAME_ITEM_TYPES,
} from '@/define/gameItems';

import EmptyState from '@/components/common/empty/EmptyState';
import ErrorState from '@/components/common/error/ErrorState';
import Header from '@/components/common/header/Header';
import InfiniteScroll from '@/components/common/infiniteScroll/InfiniteScroll';
import BoxLoading from '@/components/common/loading/BoxLoading';
import CatalogFilters from './_component/CatalogFilters';
import CatalogNavigation from './_component/CatalogNavigation';

import styles from './CatalogClient.module.scss';

const PAGE_SIZE = 10;

export default function CatalogClient(props: { type: TGameItemType }) {
  const { type } = props;

  const [params, setParams] = useState<{
    categoryId: number | undefined;
  }>({
    categoryId: undefined,
  });

  const {
    data,
    isLoading,
    isError,
    isSuccess,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isFetchNextPageError,
  } = gameItemQuery.useGetInfiniteGameItems({
    ...params,
    type,
    pageSize: PAGE_SIZE,
  });

  const gameItems = data?.pages.flatMap((page) => page.gameItems) ?? [];

  function handleFilterChange(filters: { categoryId: number | undefined }) {
    setParams(filters);
  }

  return (
    <main className={styles['page']}>
      <Header title="아이템 도감" />

      <CatalogNavigation type={type} />
      <CatalogFilters params={{ ...params, type }} onChange={handleFilterChange} />

      {isLoading && <BoxLoading />}
      {isError && !data && (
        <ErrorState
          message="아이템 정보를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요."
          onRetry={() => {
            void refetch();
          }}
        />
      )}
      {isSuccess && gameItems.length === 0 && <EmptyState message="표시할 아이템이 없습니다." />}

      {gameItems.length > 0 && (
        <InfiniteScroll
          onLoadMore={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          isFetchNextPageError={isFetchNextPageError}
          observerPositionFromBottom={100}
          enabled={!isFetching && !isError}
        >
          {gameItems.map((gameItem) => (
            <GameItemCard key={gameItem.id} gameItem={gameItem} />
          ))}
        </InfiniteScroll>
      )}
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
                ...Object.entries(ELEMENTS).map(([k, l]) => [
                  `attack${k[0].toUpperCase()}${k.slice(1)}`,
                  l,
                ]),
                ['critical', '치명'],
              ]}
            />
            <StatGroup
              title="가드 시 경감률"
              stats={w}
              fields={[
                ...Object.entries(ELEMENTS).map(([k, l]) => [
                  `guard${k[0].toUpperCase()}${k.slice(1)}`,
                  l,
                ]),
                ['guardBoost', '가드 강도'],
              ]}
            />
            <StatGroup
              title="필요 능력치"
              stats={w}
              fields={Object.entries(ATTRIBUTES).map(([k, l]) => [
                `required${k[0].toUpperCase()}${k.slice(1)}`,
                l,
              ])}
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
                        {Object.entries(ATTRIBUTES).map(([k, l]) => (
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
                              {Object.entries(ATTRIBUTES).map(([k]) => (
                                <td key={k}>{value(s[k as keyof typeof ATTRIBUTES])}</td>
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
