import type { Ref } from 'react';

import styles from './RegionMapMarker.module.scss';

import {
  FaBell,
  FaBookOpen,
  FaBoxOpen,
  FaCircle,
  FaDungeon,
  FaFireFlameCurved,
  FaFlask,
  FaGem,
  FaGhost,
  FaHammer,
  FaKey,
  FaKhanda,
  FaLandmark,
  FaMap,
  FaScroll,
  FaShieldHalved,
  FaSkull,
  FaUser,
  FaWandSparkles,
} from 'react-icons/fa6';

const MARKER_STYLES = [
  { categories: ['던전'], kind: 'dungeon', Icon: FaDungeon },
  { categories: ['보스', '암령'], kind: 'enemy', Icon: FaSkull },
  { categories: ['축복'], kind: 'grace', Icon: FaFireFlameCurved },
  { categories: ['NPC'], kind: 'npc', Icon: FaUser },
  { categories: ['장소'], kind: 'place', Icon: FaLandmark },
  { categories: ['무기'], kind: 'item', Icon: FaKhanda },
  { categories: ['방어구'], kind: 'item', Icon: FaShieldHalved },
  { categories: ['탈리스만'], kind: 'item', Icon: FaGem },
  { categories: ['마술', '기도'], kind: 'item', Icon: FaBookOpen },
  { categories: ['전회'], kind: 'item', Icon: FaWandSparkles },
  { categories: ['영체'], kind: 'item', Icon: FaGhost },
  { categories: ['일반단석', '색단석'], kind: 'item', Icon: FaHammer },
  { categories: ['성배병', '물방울 유생'], kind: 'item', Icon: FaFlask },
  { categories: ['제작서', '마술스크롤', '기도서'], kind: 'item', Icon: FaScroll },
  { categories: ['지도조각'], kind: 'item', Icon: FaMap },
  { categories: ['방울'], kind: 'item', Icon: FaBell },
  { categories: ['중요아이템'], kind: 'item', Icon: FaKey },
];

export default function RegionMapMarker({
  ref,
  name,
  categories,
  x,
  y,
  label,
  isSelected,
  onSelect,
}: {
  ref?: Ref<HTMLButtonElement>;
  name: string;
  categories: string[];
  x: number;
  y: number;
  label?: { offsetX: number; width: number; height: number; fontSize: number };
  isSelected: boolean;
  onSelect: () => void;
}) {
  const { kind, Icon } = getMarkerStyle(categories);

  return (
    <button
      ref={ref}
      type="button"
      className={styles['marker']}
      data-kind={kind}
      aria-label={name}
      aria-pressed={isSelected}
      style={{ left: x, top: y }}
      onPointerDown={(event) => event.stopPropagation()}
      onClick={onSelect}
    >
      <span className={styles['marker-icon']} aria-hidden="true">
        <Icon size={13} />
      </span>
      {label && (
        <span
          hidden
          className={styles['marker-label']}
          aria-hidden="true"
          style={{
            [label.offsetX > 0 ? 'left' : 'right']: `calc(50% + ${Math.abs(label.offsetX)}px)`,
            maxWidth: label.width,
            height: label.height,
            fontSize: label.fontSize,
          }}
        >
          {name}
        </span>
      )}
    </button>
  );
}

function getMarkerStyle(categories: string[]) {
  const style = MARKER_STYLES.find((entry) =>
    entry.categories.some((category) => categories.includes(category)),
  );
  if (style) return style;
  if (categories.some((category) => category !== '기타')) return { kind: 'item', Icon: FaBoxOpen };
  return { kind: 'other', Icon: FaCircle };
}
