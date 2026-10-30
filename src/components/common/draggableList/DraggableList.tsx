'use client';

import { type ComponentProps, useId } from 'react';

import {
  DndContext,
  type DragEndEvent,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  closestCenter,
} from '@dnd-kit/core';
import {
  type AnimateLayoutChanges,
  SortableContext,
  horizontalListSortingStrategy,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import styles from './DraggableList.module.scss';

export type TDragHandleProps = ComponentProps<'button'>;

export default function DraggableList<T>(props: {
  items: T[];
  getId: (item: T) => string;
  direction: 'horizontal' | 'vertical';
  onReorder: (newItems: T[]) => void;
  children: (item: T, props: { dragHandleProps: TDragHandleProps }) => React.ReactNode;
  className?: string;
  isDropLayoutAnimationEnabled?: boolean;
}) {
  const {
    items,
    getId,
    direction,
    onReorder,
    children,
    className,
    isDropLayoutAnimationEnabled = true,
  } = props;

  const contextId = useId();
  const pointerSensor = useSensor(PointerSensor);
  const keyboardSensor = useSensor(KeyboardSensor, {
    coordinateGetter: sortableKeyboardCoordinates,
  });
  const sensors = useSensors(pointerSensor, keyboardSensor);

  const ids = items.map(getId);
  const strategy =
    direction === 'horizontal' ? horizontalListSortingStrategy : verticalListSortingStrategy;

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = ids.indexOf(active.id as string);
    const newIndex = ids.indexOf(over.id as string);
    if (oldIndex === -1 || newIndex === -1) return;
    onReorder(arrayMove(items, oldIndex, newIndex));
  }

  return (
    <DndContext
      id={contextId}
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={ids} strategy={strategy}>
        <div
          className={`
            ${styles['draggable-list']}
            ${direction === 'horizontal' ? styles['horizontal'] : styles['vertical']}
            ${className ?? ''}
          `}
        >
          {items.map((item) => (
            <SortableItem
              key={getId(item)}
              id={getId(item)}
              isDropLayoutAnimationEnabled={isDropLayoutAnimationEnabled}
            >
              {(dragHandleProps) => children(item, { dragHandleProps })}
            </SortableItem>
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}

function animateWhileSorting({ isSorting }: Parameters<AnimateLayoutChanges>[0]) {
  return isSorting;
}

function SortableItem(props: {
  id: string;
  isDropLayoutAnimationEnabled: boolean;
  children: (dragHandleProps: TDragHandleProps) => React.ReactNode;
}) {
  const { id, isDropLayoutAnimationEnabled, children } = props;

  const {
    transform,
    transition,
    isDragging,
    setActivatorNodeRef,
    listeners,
    attributes,
    setNodeRef,
  } = useSortable({
    id,
    animateLayoutChanges: isDropLayoutAnimationEnabled ? undefined : animateWhileSorting,
  });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const dragHandleProps: TDragHandleProps = {
    ...attributes,
    ...listeners,
    ref: setActivatorNodeRef,
    type: 'button',
  };

  return (
    <div ref={setNodeRef} style={style}>
      {children(dragHandleProps)}
    </div>
  );
}
