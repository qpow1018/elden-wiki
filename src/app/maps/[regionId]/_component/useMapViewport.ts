import { useEffect, useRef, useState, type PointerEvent } from 'react';

type TPoint = { x: number; y: number };
type TView = TPoint & { zoom: number };
type TGestureEvent = UIEvent & { scale: number; clientX?: number; clientY?: number };

const INITIAL_VIEW: TView = { x: 0.5, y: 0.5, zoom: 1 };
const MAX_ZOOM = 8;

export default function useMapViewport(image: { width: number; height: number }) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const pointers = useRef(new Map<number, TPoint>());
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [view, setView] = useState(INITIAL_VIEW);
  const fitScale = Math.min(size.width / image.width, size.height / image.height);
  const baseWidth = image.width * fitScale;
  const baseHeight = image.height * fitScale;
  const width = baseWidth * view.zoom;
  const height = baseHeight * view.zoom;
  const left = size.width / 2 - boundedCenter(view.x, width, size.width) * width;
  const top = size.height / 2 - boundedCenter(view.y, height, size.height) * height;

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });
    observer.observe(viewport);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport || !baseWidth || !baseHeight) return;

    const mapViewport = viewport;
    let gestureScale = 1;

    function zoomAt(factor: number, clientX?: number, clientY?: number) {
      const rect = mapViewport.getBoundingClientRect();
      const anchor = {
        x: clientX === undefined ? 0 : clientX - rect.left - rect.width / 2,
        y: clientY === undefined ? 0 : clientY - rect.top - rect.height / 2,
      };
      setView((current) =>
        updateView(current, factor, anchor, anchor, baseWidth, baseHeight, size),
      );
    }

    function handleWheel(event: WheelEvent) {
      if (!event.deltaY) return;

      event.preventDefault();
      const factor = event.ctrlKey ? Math.exp(-event.deltaY * 0.01) : event.deltaY < 0 ? 1.25 : 0.8;
      zoomAt(factor, event.clientX, event.clientY);
    }

    function handleGestureStart(event: Event) {
      event.preventDefault();
      gestureScale = 1;
    }

    function handleGestureChange(event: Event) {
      event.preventDefault();
      const gesture = event as TGestureEvent;
      zoomAt(gesture.scale / gestureScale, gesture.clientX, gesture.clientY);
      gestureScale = gesture.scale;
    }

    viewport.addEventListener('wheel', handleWheel, { passive: false });
    viewport.addEventListener('gesturestart', handleGestureStart, { passive: false });
    viewport.addEventListener('gesturechange', handleGestureChange, { passive: false });
    return () => {
      viewport.removeEventListener('wheel', handleWheel);
      viewport.removeEventListener('gesturestart', handleGestureStart);
      viewport.removeEventListener('gesturechange', handleGestureChange);
    };
  }, [baseWidth, baseHeight, size]);

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    if (event.button !== 0 || pointers.current.size === 2) return false;

    event.currentTarget.setPointerCapture(event.pointerId);
    pointers.current.set(event.pointerId, pointerPoint(event));
    return true;
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!pointers.current.has(event.pointerId) || !baseWidth || !baseHeight) return;

    const before = getGesture([...pointers.current.values()]);
    pointers.current.set(event.pointerId, pointerPoint(event));
    const after = getGesture([...pointers.current.values()]);
    setView((current) =>
      updateView(
        current,
        after.distance / before.distance,
        before.center,
        after.center,
        baseWidth,
        baseHeight,
        size,
      ),
    );
  }

  function handlePointerEnd(event: PointerEvent<HTMLDivElement>) {
    pointers.current.delete(event.pointerId);
  }

  function handleZoom(factor: number) {
    const center = { x: 0, y: 0 };
    setView((current) => updateView(current, factor, center, center, baseWidth, baseHeight, size));
  }

  function resetView() {
    setView(INITIAL_VIEW);
  }

  return {
    viewportRef,
    size,
    width,
    height,
    left,
    top,
    canZoomIn: view.zoom < MAX_ZOOM && width > 0,
    canZoomOut: view.zoom > 1,
    handlePointerDown,
    handlePointerMove,
    handlePointerEnd,
    handleZoom,
    resetView,
  };
}

function pointerPoint(event: PointerEvent<HTMLDivElement>): TPoint {
  const rect = event.currentTarget.getBoundingClientRect();
  return {
    x: event.clientX - rect.left - rect.width / 2,
    y: event.clientY - rect.top - rect.height / 2,
  };
}

function getGesture([first, second]: TPoint[]) {
  if (!second) return { center: first, distance: 1 };

  return {
    center: { x: (first.x + second.x) / 2, y: (first.y + second.y) / 2 },
    distance: Math.max(1, Math.hypot(first.x - second.x, first.y - second.y)),
  };
}

function boundedCenter(center: number, extent: number, available: number) {
  const half = Math.min(0.5, available / (2 * extent));
  return Math.max(half, Math.min(1 - half, center));
}

function updateView(
  view: TView,
  factor: number,
  before: TPoint,
  after: TPoint,
  width: number,
  height: number,
  size: { width: number; height: number },
): TView {
  const zoom = Math.max(1, Math.min(MAX_ZOOM, view.zoom * factor));
  const x =
    boundedCenter(view.x, width * view.zoom, size.width) +
    before.x / (width * view.zoom) -
    after.x / (width * zoom);
  const y =
    boundedCenter(view.y, height * view.zoom, size.height) +
    before.y / (height * view.zoom) -
    after.y / (height * zoom);

  return {
    zoom,
    x: boundedCenter(x, width * zoom, size.width),
    y: boundedCenter(y, height * zoom, size.height),
  };
}
