// hooks/usePointerTooltip.ts
import { useMemo } from 'react'

import { KonvaEventObject } from 'konva/lib/Node'

import { MEDIA_POINTS } from '@/shared/assets/styles/media-points'
import { useMedia } from '@/shared/hooks/useMedia'

type PointerCoords = { x: number; y: number }

type TooltipCallbacks = {
  onEnter?: (coords: PointerCoords, evt: KonvaEventObject<PointerEvent>) => void
  onMove?: (coords: PointerCoords, evt: KonvaEventObject<PointerEvent>) => void
  onLeave?: (evt: KonvaEventObject<PointerEvent>) => void
  onDown?: (coords: PointerCoords, evt: KonvaEventObject<PointerEvent>) => void
  onUp?: (evt: KonvaEventObject<PointerEvent>) => void
  onOpen?: (key: string | null, origin: 'hover' | 'tap', evt: KonvaEventObject<PointerEvent>) => void
  onClose?: (reason: 'leave' | 'tap-outside' | 'program', evt?: unknown) => void
}

function getCoords(evt: KonvaEventObject<PointerEvent>): PointerCoords {
  const e = evt.evt

  return { x: e.clientX, y: e.clientY }
}

function getKey(evt: KonvaEventObject<PointerEvent>): string {
  const t = evt.target
  const byId = typeof t?.id === 'function' ? t.id() : undefined
  const byName = typeof t?.name === 'function' ? t.name() : undefined
  const internal = t?._id != null ? String(t._id) : undefined

  return String(byId ?? byName ?? internal ?? 'unknown')
}

/** фабрика без хуков — принимает флаг isMobile */
export function createPointerTooltipHandlers(callbacks: TooltipCallbacks = {}, isMobile: boolean) {
  let isOpen = false
  let openedKey: string | null = null
  let openedAt = 0
  let bound = false
  let lastClosedAt = 0 // защита от мгновенного «закрыл → тут же открыл тем же событием»

  const onDocPointerDown = (e: PointerEvent) => {
    // не закрываем тем же событием, которым только что открыли
    if (Date.now() - openedAt < 120) return

    const tip = document.querySelector('[data-astro-tooltip-root="1"]') as HTMLElement | null
    if (tip && e.target instanceof Node && tip.contains(e.target)) return

    if (isOpen) {
      isOpen = false
      openedKey = null
      lastClosedAt = Date.now()
      unbind()
      callbacks.onClose?.('tap-outside', e)
    }
  }

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key !== 'Escape') return
    if (!isOpen) return
    isOpen = false
    openedKey = null
    lastClosedAt = Date.now()
    unbind()
    callbacks.onClose?.('program', e)
  }

  const onResize = () => {
    if (!isOpen) return
    isOpen = false
    openedKey = null
    lastClosedAt = Date.now()
    unbind()
    callbacks.onClose?.('program')
  }

  function bind() {
    if (bound || typeof window === 'undefined') return
    bound = true
    window.addEventListener('pointerdown', onDocPointerDown, true) // capture, чтобы отработать раньше таргета
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('resize', onResize)
  }
  function unbind() {
    if (!bound || typeof window === 'undefined') return
    bound = false
    window.removeEventListener('pointerdown', onDocPointerDown, true)
    window.removeEventListener('keydown', onKeyDown)
    window.removeEventListener('resize', onResize)
  }

  return {
    // === Десктоп — hover / move / leave ===
    onPointerEnter: (evt: KonvaEventObject<PointerEvent>) => {
      if (isMobile) return
      const coords = getCoords(evt)
      callbacks.onEnter?.(coords, evt)
      callbacks.onOpen?.(getKey(evt), 'hover', evt)
    },
    onPointerMove: (evt: KonvaEventObject<PointerEvent>) => {
      if (isMobile) return
      callbacks.onMove?.(getCoords(evt), evt)
    },
    onPointerLeave: (evt: KonvaEventObject<PointerEvent>) => {
      if (isMobile) return
      callbacks.onLeave?.(evt)
      callbacks.onClose?.('leave', evt)
    },

    // === Мобилка — один тап открывает, следующий тап вне тултипа закрывает ===
    onPointerDown: (evt: KonvaEventObject<PointerEvent>) => {
      const coords = getCoords(evt)
      callbacks.onDown?.(coords, evt)

      if (!isMobile) return

      // если только что закрыли этим же pointerdown — не открываем снова
      if (Date.now() - lastClosedAt < 60) return

      if (!isOpen) {
        isOpen = true
        openedKey = getKey(evt)
        openedAt = Date.now()
        bind()
        callbacks.onOpen?.(openedKey, 'tap', evt)
        // закрытие произойдёт на следующий тап вне тултипа (см. onDocPointerDown)
      }
      // Если уже открыт — ничего не делаем (ожидаем глобальный «тап вне», чтобы закрыть)
    },

    onPointerUp: (evt: KonvaEventObject<PointerEvent>) => {
      callbacks.onUp?.(evt)
    },

    /** на всякий случай — ручное закрытие из кода */
    _forceClose: (reason: Parameters<NonNullable<TooltipCallbacks['onClose']>>[0] = 'program') => {
      if (!isOpen) return
      isOpen = false
      openedKey = null
      lastClosedAt = Date.now()
      unbind()
      callbacks.onClose?.(reason)
    },
  }
}

/** Хук — определяем мобилку через твой useMedia */
export function usePointerTooltip(callbacks: TooltipCallbacks = {}, mobileBp = MEDIA_POINTS.MOBILE_ALERTS) {
  const isMobile = useMedia(`(max-width: ${mobileBp}px)`)

  return useMemo(() => createPointerTooltipHandlers(callbacks, isMobile), [callbacks, isMobile])
}
