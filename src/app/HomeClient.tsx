"use client";

import { useEffect, useState } from "react";

import { createSupabaseClient } from "@/lib/supabase/client";

import Image from "next/image";

import styles from "./HomeClient.module.scss";

type TStats = Record<string, number | string | boolean | string[] | null>;
type TWeapon = TStats & {
  weapon_skills: {
    name: string;
    description: string | null;
    fp_cost_text: string | null;
  } | null;
  weapon_scalings: (Record<string, string | null> & { affinity: string })[];
};
type TItem = {
  id: number;
  name: string;
  type: string;
  image_url: string | null;
  content_code: string;
  game_description: string | null;
  item_categories: { name: string } | null;
  weapon_details: TWeapon | null;
};
const ITEM_TYPES: Record<string, string> = {
  weapon: "무기",
  armor: "방어구",
  talisman: "탈리스만",
  spirit_ash: "뼛가루",
  ash_of_war: "전회",
  spell: "마술·기도",
  gesture: "제스처",
};
const CONTENTS: Record<string, string> = {
  base_game: "본편",
  shadow_of_the_erdtree: "황금 나무의 그림자",
  tarnished_pack: "빛바랜 자 팩",
};
const AFFINITIES: Record<string, string> = {
  standard: "표준",
  heavy: "중후",
  keen: "예리",
  quality: "상질",
  fire: "화염",
  flame_art: "화염술",
  lightning: "벼락",
  sacred: "신성",
  magic: "마력",
  cold: "냉기",
  poison: "독",
  blood: "피",
  occult: "신비",
};
const ATTRIBUTES = [
  ["strength", "근력"],
  ["dexterity", "기량"],
  ["intelligence", "지력"],
  ["faith", "신앙"],
  ["arcane", "신비"],
] as const;
const ELEMENTS = [
  ["physical", "물리"],
  ["magic", "마력"],
  ["fire", "화염"],
  ["lightning", "벼락"],
  ["holy", "신성"],
] as const;
const ATTACK_TYPES: Record<string, string> = {
  standard: "표준",
  slash: "참격",
  strike: "타격",
  pierce: "관통",
};
const UPGRADE_MATERIALS: Record<string, string> = {
  smithing_stone: "단석",
  somber_smithing_stone: "색 잃은 단석",
};

export default function HomeClient() {
  const [items, setItems] = useState<TItem[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [query, setQuery] = useState("");
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let active = true;
    async function loadItems() {
      setStatus("loading");
      try {
        const client = createSupabaseClient();
        const all: TItem[] = [];
        // Data API의 기본 응답 한도를 넘는 목록도 빠짐없이 조회합니다.
        for (let start = 0; ; start += 500) {
          const { data, error } = await client
            .from("items")
            .select(
              "id,name,type,image_url,content_code,game_description,item_categories(name),weapon_details(*,weapon_skills(name,description,fp_cost_text),weapon_scalings(*))",
            )
            .order("id")
            .range(start, start + 499);
          if (error) throw error;
          all.push(
            ...(data.map((row) => ({
              ...row,
              item_categories: Array.isArray(row.item_categories)
                ? (row.item_categories[0] ?? null)
                : row.item_categories,
              weapon_details: Array.isArray(row.weapon_details)
                ? (row.weapon_details[0] ?? null)
                : row.weapon_details,
            })) as unknown as TItem[]),
          );
          if (data.length < 500) break;
        }
        if (active) {
          setItems(all);
          setStatus("ready");
        }
      } catch {
        if (active) setStatus("error");
      }
    }
    void loadItems();
    return () => {
      active = false;
    };
  }, [attempt]);

  const categories = [
    ...new Set(
      items
        .filter((item) => !type || item.type === type)
        .map((item) => item.item_categories?.name)
        .filter((name): name is string => !!name),
    ),
  ].sort((a, b) => a.localeCompare(b, "ko"));
  const filtered = items.filter((item) => {
    const matchesType = !type || item.type === type;
    const matchesCategory = !category || item.item_categories?.name === category;
    const matchesContent = !content || item.content_code === content;
    const searchableText = `${item.name} ${item.game_description ?? ""} ${item.weapon_details?.weapon_skills?.name ?? ""}`;
    const matchesQuery = searchableText
      .toLocaleLowerCase()
      .includes(query.trim().toLocaleLowerCase());
    return matchesType && matchesCategory && matchesContent && matchesQuery;
  });
  function reset() {
    setQuery("");
    setType("");
    setCategory("");
    setContent("");
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
            placeholder="이름, 설명, 전투 기술로 검색"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
        <label>
          종류
          <select
            value={type}
            onChange={(e) => {
              setType(e.target.value);
              setCategory("");
            }}
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
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">모든 분류</option>
            {categories.map((name) => (
              <option key={name}>{name}</option>
            ))}
          </select>
        </label>
        <label>
          콘텐츠
          <select value={content} onChange={(e) => setContent(e.target.value)}>
            <option value="">전체 콘텐츠</option>
            {Object.entries(CONTENTS).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className={styles['list-heading']}>
        <h2>
          장비 목록 <span>{filtered.length}</span>
        </h2>
        <button onClick={reset}>필터 초기화</button>
      </div>
      <p className={styles['note']}>
        공격력·가드·능력 보정은 최대 강화 기준입니다. 공격력·가드는 표준 변질(변질 불가 무기는 기본
        상태), 부가 효과는 미강화 기준입니다. 0은 효과 없음, 미확인은 미등록 정보입니다.
      </p>
      <div aria-live="polite">
        {status === "loading" && <p className={styles['message']}>장비를 불러오고 있습니다.</p>}
        {status === "error" && (
          <div className={styles['message']}>
            <p>장비 정보를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.</p>
            <button onClick={() => setAttempt((n) => n + 1)}>다시 불러오기</button>
          </div>
        )}
        {status === "ready" && filtered.length === 0 && (
          <div className={styles['message']}>
            <p>
              {items.length ? "검색 조건에 맞는 장비가 없습니다." : "아직 등록된 장비가 없습니다."}
            </p>
            {items.length > 0 && <button onClick={reset}>전체 목록 보기</button>}
          </div>
        )}
        {status === "ready" &&
          filtered.length > 0 &&
          filtered.map((item) => <EquipmentCard key={item.id} item={item} />)}
      </div>
      <footer className={styles['footer']}>엘든링 위키 · 장비 도감</footer>
    </main>
  );
}

function EquipmentCard({ item }: { item: TItem }) {
  const w = item.weapon_details;
  return (
    <article className={styles['item']}>
      <div className={styles['identity']}>
        <div className={styles['image']}>
          {item.image_url ? (
            <Image
              src={item.image_url}
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
            {ITEM_TYPES[item.type]} / {item.item_categories?.name ?? "분류 미확인"}
          </p>
          <h2>{item.name}</h2>
          <span className={styles['badge']}>
            {CONTENTS[item.content_code] ?? item.content_code}
          </span>
        </div>
      </div>
      <p className={styles['description']}>
        {item.game_description ?? "장비 설명이 아직 등록되지 않았습니다."}
      </p>
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
                {Array.isArray(w.physical_attack_types)
                  ? w.physical_attack_types.map((t) => ATTACK_TYPES[t] ?? t).join(" / ") || "없음"
                  : "미확인"}
              </dd>
            </div>
            <div>
              <dt>강화 재료</dt>
              <dd>{UPGRADE_MATERIALS[String(w.upgrade_material)] ?? "미확인"}</dd>
            </div>
            <div>
              <dt>변질</dt>
              <dd>{formatAffinity(w.can_change_affinity)}</dd>
            </div>
          </dl>
          <div className={styles['stats']}>
            <StatGroup
              title="공격력"
              stats={w}
              fields={[...ELEMENTS.map(([k, l]) => [`attack_${k}`, l]), ["critical", "치명"]]}
            />
            <StatGroup
              title="가드 시 경감률"
              stats={w}
              fields={[
                ...ELEMENTS.map(([k, l]) => [`guard_${k}`, l]),
                ["guard_boost", "가드 강도"],
              ]}
            />
            <StatGroup
              title="필요 능력치"
              stats={w}
              fields={ATTRIBUTES.map(([k, l]) => [`required_${k}`, l])}
            />
            <StatGroup
              title="부가 효과"
              stats={w}
              fields={[
                ["bleed", "출혈"],
                ["frostbite", "동상"],
                ["poison", "독"],
                ["scarlet_rot", "붉은 부패"],
              ]}
            />
          </div>
          <div className={styles['bottom']}>
            <section className={styles['skill']}>
              <h3>전투 기술 · {w.weapon_skills?.name ?? "미확인"}</h3>
              <p>소모 FP {w.weapon_skills?.fp_cost_text ?? "미확인"}</p>
              <p className={styles['description']}>
                {w.weapon_skills?.description ?? "전투 기술 설명이 아직 등록되지 않았습니다."}
              </p>
            </section>
            <section className={styles['scalings']}>
              <h3>변질별 능력 보정</h3>
              {w.weapon_scalings.length > 0 && (
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
                        w.weapon_scalings
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
              {w.weapon_scalings.length === 0 && <p>능력 보정 정보가 아직 등록되지 않았습니다.</p>}
            </section>
          </div>
        </>
      )}
      {!w && <p className={styles['note']}>상세 능력치가 아직 등록되지 않았습니다.</p>}
    </article>
  );
}
function value(v: unknown) {
  return v == null ? "미확인" : String(v);
}

function StatGroup({
  title,
  stats,
  fields,
}: {
  title: string;
  stats: TStats;
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

function formatAffinity(canChange: TStats[string]) {
  if (canChange == null) return "미확인";
  return canChange ? "가능" : "불가";
}
