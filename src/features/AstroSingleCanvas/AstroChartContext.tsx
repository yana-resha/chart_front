import { ReactNode, RefObject, useContext, useMemo, createContext, useCallback, useState } from 'react'

import { createPortal } from 'react-dom'

import { useContainerSize } from './hooks/useContainerSize'
import { AstroSingleCanvasProps, CoordsSpace, TooltipMethods } from './types'
import { MEDIA_POINTS } from '@/shared/assets/styles/media-points'
import { Tooltip as UiTooltip } from '@/shared/components/Tooltip' // <-- твой обычный Tooltip
import { useMedia } from '@/shared/hooks/useMedia'

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

  // --- Tooltip state (для обычного UI Tooltip)
  const [tipOpen, setTipOpen] = useState(false)
  const [tipContent, setTipContent] = useState<ReactNode | null>(null)
  const [tipMobileTitle, setTipMobileTitle] = useState<ReactNode | string | undefined>(undefined)
  // координаты якоря (fixed к окну)
  const [anchorPos, setAnchorPos] = useState<{ x: number; y: number }>({ x: -9999, y: -9999 })

  // Перевод координат из локальных (внутри контейнера) в клиентские (окно)
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

  const positionAnchor = useCallback((cx: number, cy: number) => {
    // Чуть сместим якорь, чтобы тултип появлялся рядом с курсором/точкой
    const OFFSET = 0
    setAnchorPos({ x: cx + OFFSET, y: cy + OFFSET })
  }, [])

  const showTooltip: TooltipMethods['showTooltip'] = useCallback(
    ({ text, x, y, space = 'client', mobileTitle }) => {
      const { cx, cy } = toClientCoords(x, y, space)
      setTipContent(text)
      setTipMobileTitle(mobileTitle)
      positionAnchor(cx, cy)
      setTipOpen(true)
    },
    [positionAnchor, toClientCoords],
  )

  const changeTooltipPosition: TooltipMethods['changeTooltipPosition'] = useCallback(
    ({ x, y, space = 'client' }) => {
      const { cx, cy } = toClientCoords(x, y, space)
      positionAnchor(cx, cy)
    },
    [positionAnchor, toClientCoords],
  )

  const hideTooltip = useCallback(() => {
    setTipOpen(false)
    /* setTipContent(null) */
  }, [])

  // Пробросим контекст наружу
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

  // SSR guard: рендерим якорь и тултип только в браузере
  const canMount = typeof document !== 'undefined' && typeof window !== 'undefined'

  return (
    <AstroChartContext.Provider value={ctx}>
      {children}

      {canMount &&
        createPortal(
          <span
            style={{
              position: 'fixed',
              left: `${anchorPos.x}px`,
              top: `${anchorPos.y}px`,
              width: 1,
              height: 1,
              pointerEvents: 'none', // не мешаем
              zIndex: 0,
            }}
          >
            <UiTooltip
              trigger="manual"
              open={tipOpen}
              onOpenChange={setTipOpen} // на случай закрытия по Esc/кнопке
              tooltipContent={tipContent ?? null}
              mobileTitle={tipMobileTitle}
              placement="top-start"
            >
              <span style={{ display: 'inline-block', width: 1, height: 1 }} />
            </UiTooltip>
          </span>,
          document.body,
        )}
    </AstroChartContext.Provider>
  )
}
