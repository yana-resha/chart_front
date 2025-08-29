// hooks/usePointerTooltip.ts
import { KonvaEventObject } from 'konva/lib/Node'

type PointerCoords = { x: number; y: number }

type TooltipCallbacks = {
  onEnter?: (coords: PointerCoords, evt: KonvaEventObject<PointerEvent>) => void
  onMove?: (coords: PointerCoords, evt: KonvaEventObject<PointerEvent>) => void
  onLeave?: (evt: KonvaEventObject<PointerEvent>) => void
  onDown?: (coords: PointerCoords, evt: KonvaEventObject<PointerEvent>) => void
  onUp?: (evt: KonvaEventObject<PointerEvent>) => void
}

function getCoords(evt: KonvaEventObject<PointerEvent>): PointerCoords {
  const e = evt.evt

  return { x: e.clientX, y: e.clientY }
}

// ✅ Чистая фабрика (НЕ хук) — можно вызывать в map/условиях
export function createPointerTooltipHandlers(callbacks: TooltipCallbacks) {
  return {
    onPointerEnter: (evt: KonvaEventObject<PointerEvent>) => {
      callbacks.onEnter?.(getCoords(evt), evt)
    },
    onPointerMove: (evt: KonvaEventObject<PointerEvent>) => {
      callbacks.onMove?.(getCoords(evt), evt)
    },
    onPointerLeave: (evt: KonvaEventObject<PointerEvent>) => {
      callbacks.onLeave?.(evt)
    },
    onPointerDown: (evt: KonvaEventObject<PointerEvent>) => {
      callbacks.onDown?.(getCoords(evt), evt)
    },
    onPointerUp: (evt: KonvaEventObject<PointerEvent>) => {
      callbacks.onUp?.(evt)
    },
  }
}

// (Опционально) Хук-обёртка для компонентов, где удобно именно "use*"
export function usePointerTooltip(callbacks: TooltipCallbacks) {
  // тут нет реальных хуков — просто возвращаем фабрику,
  // поэтому это не нарушает правила, если вызывать на верхнем уровне компонента
  return createPointerTooltipHandlers(callbacks)
}
