import Image, { type StaticImageData } from 'next/image';
import { useState } from 'react';

import type { getMapMarkerSamples } from '@/app/maps/[regionId]/mapMarkerSamples';

import useMapViewport from './useMapViewport';

import styles from './RegionMap.module.scss';

import { MdAdd, MdClose, MdFitScreen, MdRemove } from 'react-icons/md';

export default function RegionMap({
  image,
  name,
  markers,
}: {
  image: StaticImageData;
  name: string;
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
            {markers.map((marker) => {
              const x = left + marker.x * width;
              const y = top + marker.y * height;
              if (x < 0 || x > size.width || y < 0 || y > size.height) return null;

              return (
                <button
                  key={marker.id}
                  type="button"
                  className={styles['marker']}
                  aria-label={marker.name}
                  aria-pressed={selectedId === marker.id}
                  style={{ left: x, top: y }}
                  onPointerDown={(event) => event.stopPropagation()}
                  onClick={() => setSelectedId(selectedId === marker.id ? undefined : marker.id)}
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
          disabled={!canZoomOut}
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
          <p role="status">{selected.name}</p>
          <button type="button" aria-label="닫기" onClick={() => setSelectedId(undefined)}>
            <MdClose size={20} aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  );
}
