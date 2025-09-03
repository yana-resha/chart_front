import {
  ReactNode,
  RefObject,
  useContext,
  useRef,
  useMemo,
  createContext,
  forwardRef,
  useCallback,
} from 'react'

import { createPortal } from 'react-dom'

import { useContainerSize } from './hooks/useContainerSize'
import { Tooltip as TooltipBox, ClosedIcon } from './index.linaria'
import { AstroSingleCanvasProps } from './types'
import { MEDIA_POINTS } from '@/shared/assets/styles/media-points'
import { useMedia } from '@/shared/hooks/useMedia'

type CoordsSpace = 'client' | 'local'

interface TooltipMethods {
  showTooltip: (args: { text: ReactNode; x: number; y: number; space?: CoordsSpace }) => void
  changeTooltipPosition: (args: { x: number; y: number; space?: CoordsSpace }) => void
  hideTooltip: () => void
}

interface AstroChartContextType extends TooltipMethods, AstroSingleCanvasProps {
  containerRef: RefObject<HTMLDivElement | null>
  CANVAS_SIZE: number
  CENTER: number
  RADIUS: number
  HOUSES_INSIDE_RADIUS: number
  ZODIAC_ARC_WEIGHT: number
  ZODIAC_INSIDE_RADIUS: number
  PLANET_INSIDE_RADIUS: number
  PLANET_OUTSIDE_RADIUS: number
  ASPECT_INSIDE_RADIUS: number
  FAKE_ASCENDANT: number
  GENERAL_FIRST_RENDER_ANIMATION: number
  isMobile: boolean
}

const AstroChartContext = createContext<AstroChartContextType | null>(null)

export const useAstroCanvasContext = () => {
  const ctx = useContext(AstroChartContext)
  if (!ctx) throw new Error('useAstroCanvasContext must be used within AstroCanvasProvider')

  return ctx
}

interface Props extends AstroSingleCanvasProps {
  children: ReactNode
}

const TooltipBody = forwardRef<HTMLDivElement, { onClose: () => void }>(function TooltipBody(
  { onClose },
  ref,
) {
  return (
    <TooltipBox ref={ref}>
      {/* Контент будет заполняться из провайдера через querySelector */}
      <div data-role="content" />
      {/* Крестик показывается только на мобилке (см. CSS) */}
      <button
        className="close"
        aria-label="Закрыть"
        onClick={onClose}
      >
        <ClosedIcon />
      </button>
    </TooltipBox>
  )
})

export const AstroCanvasProvider = ({ children, planets, aspects, houseCusps }: Props) => {
  const FAKE_ASCENDANT = 360
  const { containerRef, size } = useContainerSize()

  const CANVAS_SIZE = size
  const PADDING = CANVAS_SIZE * 0.06
  const CENTER = CANVAS_SIZE / 2
  const RADIUS = CENTER - PADDING
  const HOUSES_INSIDE_RADIUS = RADIUS - RADIUS * 0.1
  const ZODIAC_ARC_WEIGHT = RADIUS * 0.08
  const ZODIAC_INSIDE_RADIUS = HOUSES_INSIDE_RADIUS - ZODIAC_ARC_WEIGHT
  const PLANET_INSIDE_RADIUS = ZODIAC_INSIDE_RADIUS - ZODIAC_INSIDE_RADIUS * 0.4
  const PLANET_OUTSIDE_RADIUS = PLANET_INSIDE_RADIUS + PLANET_INSIDE_RADIUS * 0.07
  const ASPECT_INSIDE_RADIUS = PLANET_INSIDE_RADIUS * 0.87
  const GENERAL_FIRST_RENDER_ANIMATION = 1.5
  const isMobile = useMedia(`(max-width: ${MEDIA_POINTS.MOBILE_ALERTS}px)`)

  const tipRef = useRef<HTMLDivElement | null>(null)

  // --- Tooltip: fixed по окну с flip/clamp
  const OFFSET = 12
  const PADDING_VP = 6

  const toClientCoords = useCallback(
    (x: number, y: number, space: CoordsSpace = 'client'): { cx: number; cy: number } => {
      if (space === 'client') return { cx: x, cy: y }
      const host = containerRef.current
      if (!host) return { cx: x, cy: y }
      const r = host.getBoundingClientRect()

      return { cx: r.left + x, cy: r.top + y }
    },
    [containerRef],
  )
  function getContentEl() {
    const root = tipRef.current
    if (!root) return null

    return root.querySelector('[data-role="content"]') as HTMLElement | null
  }

  const setTipContent = useCallback((text: ReactNode) => {
    const el = getContentEl()
    if (!el) return
    // Если приходит строка с HTML — рендерим как HTML (как у тебя было ранее).
    // Иначе пытаемся toString().
    el.innerHTML = typeof text === 'string' ? text : (text?.toString?.() ?? '')
  }, [])

  function placeFixed(client: { x: number; y: number }) {
    const tip = tipRef.current
    if (!tip) return

    tip.style.visibility = 'hidden'
    tip.style.display = 'block'

    const vw = window.innerWidth
    const vh = window.innerHeight
    const rect = tip.getBoundingClientRect()

    const baseX = client.x
    const baseY = client.y

    // по умолчанию — справа/снизу
    let x = baseX + OFFSET
    let y = baseY + OFFSET
    let sideX: 'left' | 'right' = 'right'
    let sideY: 'top' | 'bottom' = 'bottom'

    // flip X
    if (x + rect.width > vw - PADDING_VP) {
      x = baseX - rect.width - OFFSET
      sideX = 'left'
    }
    // flip Y
    if (y + rect.height > vh - PADDING_VP) {
      y = baseY - rect.height - OFFSET
      sideY = 'top'
    }

    // clamp
    x = Math.min(Math.max(x, PADDING_VP), vw - rect.width - PADDING_VP)
    y = Math.min(Math.max(y, PADDING_VP), vh - rect.height - PADDING_VP)

    tip.style.setProperty('--x', `${x}px`)
    tip.style.setProperty('--y', `${y}px`)
    tip.dataset.sidex = sideX
    tip.dataset.sidey = sideY

    tip.style.visibility = 'visible'
  }

  const showTooltip: TooltipMethods['showTooltip'] = useCallback(
    ({ text, x, y, space = 'client' }) => {
      const tip = tipRef.current
      if (!tip) return
      setTipContent(text)
      const { cx, cy } = toClientCoords(x, y, space)
      placeFixed({ x: cx, y: cy })
    },
    [setTipContent, toClientCoords],
  )

  const changeTooltipPosition: TooltipMethods['changeTooltipPosition'] = useCallback(
    ({ x, y, space = 'client' }) => {
      const tip = tipRef.current
      if (!tip) return
      const { cx, cy } = toClientCoords(x, y, space)
      placeFixed({ x: cx, y: cy })
    },
    [toClientCoords],
  )

  const hideTooltip = useCallback(() => {
    const tip = tipRef.current
    if (!tip) return
    tip.style.display = 'none'
    tip.style.removeProperty('--x')
    tip.style.removeProperty('--y')
    tip.removeAttribute('data-sidex')
    tip.removeAttribute('data-sidey')
    const el = getContentEl()
    if (el) el.innerHTML = ''
  }, [])

  const ctx = useMemo(
    () => ({
      containerRef,
      CANVAS_SIZE,
      CENTER,
      RADIUS,
      HOUSES_INSIDE_RADIUS,
      ZODIAC_ARC_WEIGHT,
      ZODIAC_INSIDE_RADIUS,
      PLANET_INSIDE_RADIUS,
      PLANET_OUTSIDE_RADIUS,
      showTooltip,
      changeTooltipPosition,
      hideTooltip,
      houseCusps,
      aspects,
      planets,
      isMobile,
      FAKE_ASCENDANT,
      GENERAL_FIRST_RENDER_ANIMATION,
      ASPECT_INSIDE_RADIUS,
    }),
    [
      containerRef,
      CANVAS_SIZE,
      CENTER,
      RADIUS,
      HOUSES_INSIDE_RADIUS,
      ZODIAC_ARC_WEIGHT,
      ZODIAC_INSIDE_RADIUS,
      PLANET_INSIDE_RADIUS,
      PLANET_OUTSIDE_RADIUS,
      showTooltip,
      changeTooltipPosition,
      hideTooltip,
      houseCusps,
      aspects,
      planets,
      isMobile,
      ASPECT_INSIDE_RADIUS,
    ],
  )

  return (
    <AstroChartContext.Provider value={ctx}>
      {children}
      {typeof document !== 'undefined' &&
        createPortal(
          <TooltipBody
            ref={tipRef}
            onClose={hideTooltip}
            data-astro-tooltip-root="1"
          />,
          document.body,
        )}
    </AstroChartContext.Provider>
  )
}
