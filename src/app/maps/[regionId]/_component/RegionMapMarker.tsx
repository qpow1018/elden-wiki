import type { Ref } from 'react';

import styles from './RegionMapMarker.module.scss';

import {
  MdDangerous,
  MdDoorFront,
  MdFiberManualRecord,
  MdFlare,
  MdInventory2,
  MdPerson,
  MdPlace,
} from 'react-icons/md';

const MARKER_STYLES = [
  { categories: ['던전'], kind: 'dungeon', Icon: MdDoorFront },
  { categories: ['보스', '암령'], kind: 'enemy', Icon: MdDangerous },
  { categories: ['축복'], kind: 'grace', Icon: MdFlare },
  { categories: ['NPC'], kind: 'npc', Icon: MdPerson },
  { categories: ['장소'], kind: 'place', Icon: MdPlace },
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
        <Icon size={12} />
      </span>
      {label && (
        <span
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
  if (categories.some((category) => category !== '기타'))
    return { kind: 'item', Icon: MdInventory2 };
  return { kind: 'other', Icon: MdFiberManualRecord };
}
