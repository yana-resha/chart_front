import { ReactNode, MutableRefObject, useContext, useRef, useMemo, createContext } from 'react'

import { useContainerSize } from './hooks/useContainerSize'
import { Tooltip } from './index.linaria'
import { AstroChartCanvasProps } from './types'

interface TooltipMethods {
  showTooltip: ({ text, x, y }: { text: ReactNode; x: number; y: number }) => void
  changeTooltipPosition: ({ x, y }: { x: number; y: number }) => void
  hideTooltip: () => void
}

interface AstroChartContextType extends TooltipMethods, AstroChartCanvasProps {
  containerRef: MutableRefObject<HTMLDivElement | null>
  CANVAS_SIZE: number
  CENTER: number
  RADIUS: number
  HOUSES_INSIDE_RADIUS: number
  ZODIAC_ARC_WEIGHT: number
  ZODIAC_INSIDE_RADIUS: number
  PLANET_INSIDE_RADIUS: number
  PLANET_OUTSIDE_RADIUS: number
  FAKE_ASCENDANT: number
  GENERAL_FIRST_RENDER_ANIMATION: number
}

const AstroChartContext = createContext<AstroChartContextType | null>(null)

export const useAstroChartContext = () => {
  const context = useContext(AstroChartContext)
  if (!context) throw new Error('useAstroChartContext must be used within AstroChartProvider')

  return context
}

interface Props extends AstroChartCanvasProps {
  children: ReactNode
}

export const AstroChartProvider = ({ children, planets, aspects, houseCusps }: Props) => {
  const FAKE_ASCENDANT = 360
  const { containerRef, size } = useContainerSize()
  const CANVAS_SIZE = size
  const PADDING = CANVAS_SIZE * 0.06
  const CENTER = CANVAS_SIZE / 2
  const RADIUS = CENTER - PADDING
  const HOUSES_INSIDE_RADIUS = RADIUS - RADIUS * 0.1
  const ZODIAC_ARC_WEIGHT = RADIUS * 0.08
  const ZODIAC_INSIDE_RADIUS = HOUSES_INSIDE_RADIUS - ZODIAC_ARC_WEIGHT
  const PLANET_INSIDE_RADIUS = ZODIAC_INSIDE_RADIUS - ZODIAC_INSIDE_RADIUS * 0.3
  const PLANET_OUTSIDE_RADIUS = PLANET_INSIDE_RADIUS + PLANET_INSIDE_RADIUS * 0.04

  const GENERAL_FIRST_RENDER_ANIMATION = 1.5

  const tooltipRef = useRef<HTMLDivElement | null>(null)

  const showTooltip = ({ text, x, y }: { text: ReactNode; x: number; y: number }) => {
    if (!tooltipRef.current) return
    tooltipRef.current.style.display = 'block'
    tooltipRef.current.style.setProperty('--x', (x + 12).toString() + 'px')
    tooltipRef.current.style.setProperty('--y', (y + 12).toString() + 'px')
    tooltipRef.current.innerHTML = text?.toString() ?? ''
  }

  const changeTooltipPosition = ({ x, y }: { x: number; y: number }) => {
    if (!tooltipRef.current) return
    tooltipRef.current.style.setProperty('--x', (x + 12).toString() + 'px')
    tooltipRef.current.style.setProperty('--y', (y + 12).toString() + 'px')
  }

  const hideTooltip = () => {
    if (!tooltipRef.current) return
    tooltipRef.current.style.display = 'none'
    tooltipRef.current.style.setProperty('--x', '0px')
    tooltipRef.current.style.setProperty('--y', '0px')
    tooltipRef.current.innerHTML = ''
  }

  const contextValue = useMemo(
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
      FAKE_ASCENDANT,
      GENERAL_FIRST_RENDER_ANIMATION,
    }),
    [CANVAS_SIZE],
  )

  return (
    <AstroChartContext.Provider value={contextValue}>
      {children}
      <Tooltip ref={tooltipRef} />
    </AstroChartContext.Provider>
  )
}
