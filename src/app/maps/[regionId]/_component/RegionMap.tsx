import Image, { type StaticImageData } from 'next/image';
import { useState } from 'react';

import type { getMapMarkerSamples } from '@/app/maps/[regionId]/mapMarkerSamples';

import useMapViewport from './useMapViewport';

import styles from './RegionMap.module.scss';

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
        onPointerDown={(event) => {
          if (handlePointerDown(event)) setSelectedId(undefined);
        }}
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
          aria-label="확대"
          onClick={() => handleZoom(1.5)}
          disabled={!canZoomIn}
        >
          +
        </button>
        <button
          type="button"
          aria-label="축소"
          onClick={() => handleZoom(1 / 1.5)}
          disabled={!canZoomOut}
        >
          −
        </button>
        <button
          type="button"
          onClick={() => {
            resetView();
            setSelectedId(undefined);
          }}
        >
          전체 보기
        </button>
      </div>
      {selected && (
        <p className={styles['item-name']} role="status">
          {selected.name}
        </p>
      )}
    </div>
  );
}
