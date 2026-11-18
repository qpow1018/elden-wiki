import Image, { type StaticImageData } from 'next/image';
import { useRef, useState } from 'react';

import type { getMapMarkerSamples } from '@/app/maps/[regionId]/mapMarkerSamples';

import useMapViewport from './useMapViewport';

import RegionMapMarker from './RegionMapMarker';

import styles from './RegionMap.module.scss';

import { MdAdd, MdClose, MdFitScreen, MdRemove } from 'react-icons/md';

type TVisibleMarker = ReturnType<typeof getMapMarkerSamples>[number];

const MIN_LABEL_FONT_SIZE = 5;
const MAX_LABEL_FONT_SIZE = 13;
const LABEL_WORLD_SCALE = 22;
const LABEL_OFFSET = 14;
const LABEL_GAP = 4;

export default function RegionMap({
  image,
  name,
  worldWidth,
  markers,
}: {
  image: StaticImageData;
  name: string;
  worldWidth?: number;
  markers: ReturnType<typeof getMapMarkerSamples>;
}) {
  const {
    viewportRef,
    size,
    width,
    height,
    left,
    top,
    canZoomIn,
    canZoomOut,
    handlePointerDown,
    handlePointerMove,
    handlePointerEnd,
    handleZoom,
    resetView,
  } = useMapViewport(image);
  const [selectedId, setSelectedId] = useState<string>();
  const selected = markers.find(({ id }) => id === selectedId);
  const selectedMarkerRef = useRef<HTMLButtonElement>(null);
  const zoomOutButtonRef = useRef<HTMLButtonElement>(null);
  const visibleMarkers = markers
    .map((marker) => ({ ...marker, x: left + marker.x * width, y: top + marker.y * height }))
    .filter(({ x, y }) => x >= 0 && x <= size.width && y >= 0 && y <= size.height);
  const labelFontSize = worldWidth
    ? Math.min(
        MAX_LABEL_FONT_SIZE,
        Math.max(MIN_LABEL_FONT_SIZE, (width / worldWidth) * LABEL_WORLD_SCALE),
      )
    : 11;
  const markerLabels = getMarkerLabels(visibleMarkers, size, selectedId, labelFontSize);

  function handleCloseMarker() {
    (selectedMarkerRef.current ?? zoomOutButtonRef.current)?.focus({ preventScroll: true });
    setSelectedId(undefined);
  }

  return (
    <div className={styles['map']}>
      <div
        ref={viewportRef}
        className={styles['viewport']}
        role="group"
        aria-label={`${name} 지도`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        onPointerCancel={handlePointerEnd}
        onLostPointerCapture={handlePointerEnd}
      >
        {width > 0 && height > 0 && (
          <>
            <Image
              className={styles['image']}
              src={image}
              alt={`${name} 지도`}
              draggable={false}
              sizes={`${Math.ceil(Math.min(image.width, width * 2))}px`}
              style={{ width, height, left, top }}
            />
            {visibleMarkers.map((marker) => {
              const isSelected = selectedId === marker.id;

              return (
                <RegionMapMarker
                  key={marker.id}
                  ref={isSelected ? selectedMarkerRef : undefined}
                  name={marker.name}
                  categories={marker.categories}
                  x={marker.x}
                  y={marker.y}
                  label={markerLabels.get(marker.id)}
                  isSelected={isSelected}
                  onSelect={() => setSelectedId(isSelected ? undefined : marker.id)}
                />
              );
            })}
          </>
        )}
      </div>
      <div className={styles['controls']} aria-label="지도 조작" role="group">
        <button
          type="button"
          aria-label="전체 보기"
          title="전체 보기"
          disabled={!canZoomOut && !selected}
          onClick={() => {
            resetView();
            setSelectedId(undefined);
          }}
        >
          <MdFitScreen size={22} aria-hidden="true" />
        </button>
        <div className={styles['zoom-buttons']}>
          <button
            type="button"
            aria-label="확대"
            onClick={() => handleZoom(1.5)}
            disabled={!canZoomIn}
          >
            <MdAdd size={22} aria-hidden="true" />
          </button>
          <button
            ref={zoomOutButtonRef}
            type="button"
            aria-label="축소"
            onClick={() => handleZoom(1 / 1.5)}
            disabled={!canZoomOut}
          >
            <MdRemove size={22} aria-hidden="true" />
          </button>
        </div>
      </div>
      {selected && (
        <div className={styles['marker-panel']}>
          <div className={styles['marker-details']}>
            <p role="status">{selected.name}</p>
            {selected.categories.length > 0 && (
              <p className={styles['marker-categories']}>{selected.categories.join(' · ')}</p>
            )}
            {selected.loot && (
              <ul aria-label="획득 아이템">
                {selected.loot.map(({ id, name, quantity }) => (
                  <li key={id}>
                    {name}
                    {quantity && ` ×${quantity}`}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <button type="button" aria-label="닫기" onClick={handleCloseMarker}>
            <MdClose size={20} aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  );
}

function getMarkerLabels(
  markers: TVisibleMarker[],
  size: { width: number; height: number },
  selectedId: string | undefined,
  labelFontSize: number,
) {
  const candidates = markers
    .filter(({ id, isLabelPriority }) => isLabelPriority || id === selectedId)
    .sort((a, b) => Number(b.id === selectedId) - Number(a.id === selectedId));
  const labels = new Map<
    string,
    { offsetX: number; width: number; height: number; fontSize: number }
  >();
  const occupied: { left: number; right: number; top: number; bottom: number }[] = [];

  for (const { id, name, x, y } of candidates) {
    const fontSize = id === selectedId ? MAX_LABEL_FONT_SIZE : labelFontSize;
    const width = Math.min(132, Math.ceil(name.length * fontSize) + 12);
    const height = Math.ceil(fontSize * 1.5) + 4;
    const top = y - height / 2;
    const bottom = top + height;
    if (top < LABEL_GAP || bottom > size.height - LABEL_GAP) continue;

    for (const offsetX of [LABEL_OFFSET, -LABEL_OFFSET - width]) {
      const left = x + offsetX;
      const right = left + width;
      if (left < LABEL_GAP || right > size.width - LABEL_GAP) continue;

      const overlapsLabel = occupied.some(
        (rect) =>
          left < rect.right + LABEL_GAP &&
          right > rect.left - LABEL_GAP &&
          top < rect.bottom + LABEL_GAP &&
          bottom > rect.top - LABEL_GAP,
      );
      if (overlapsLabel) continue;

      occupied.push({ left, right, top, bottom });
      labels.set(id, { offsetX: Math.sign(offsetX) * LABEL_OFFSET, width, height, fontSize });
      break;
    }
  }

  return labels;
}
