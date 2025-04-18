import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'

import CloseIcon from './assets/close.svg?react'
import Tail from './assets/tail.svg?react'
import {
  ClosedButton,
  closedIconCSS,
  Container,
  TailContainer,
  tailIconCSS,
  TooltipContainer,
} from './index.linaria'
import { TooltipProps, TOOLTIP_X_POSITION, TOOLTIP_Y_POSITION } from './types'

export const Tooltip = ({
  children,
  tooltipContent,
  defaultYPosition = TOOLTIP_Y_POSITION.TOP,
  defaultXPosition = TOOLTIP_X_POSITION.LEFT,
}: TooltipProps) => {
  const [showToolTip, setShowToolTip] = useState<boolean>(false)
  const containerRef = useRef<null | HTMLDivElement>(null)
  const tooltipRef = useRef<null | HTMLDivElement>(null)
  const [yPosition, setYPosition] = useState<TOOLTIP_Y_POSITION>(defaultYPosition)
  const [xPosition, setXPosition] = useState<TOOLTIP_X_POSITION>(defaultXPosition)

  const defineTooltipYPosition = useCallback(() => {
    const intersectionRect = tooltipRef.current?.getBoundingClientRect()
    if (!intersectionRect) return yPosition
    if (intersectionRect.top + window.pageYOffset < window.scrollY) {
      return TOOLTIP_Y_POSITION.BOTTOM
    }
    if (intersectionRect.bottom > window.innerHeight) return TOOLTIP_Y_POSITION.TOP

    return yPosition
  }, [yPosition])

  const defineTooltipXPosition = useCallback(() => {
    const intersectionRect = tooltipRef.current?.getBoundingClientRect()
    if (!intersectionRect) return xPosition
    if (intersectionRect.left < window.scrollX) {
      return TOOLTIP_X_POSITION.LEFT
    }
    if (intersectionRect.right > window.innerWidth + window.scrollX) return TOOLTIP_X_POSITION.RIGHT

    return xPosition
  }, [xPosition])

  const closeTooltip = () => {
    setYPosition(defaultYPosition)
    setXPosition(defaultXPosition)
    setShowToolTip(false)
  }

  useLayoutEffect(() => {
    if (showToolTip) {
      setYPosition(defineTooltipYPosition())
      setXPosition(defineTooltipXPosition())
    }
  }, [defineTooltipXPosition, defineTooltipYPosition, showToolTip])

  useEffect(() => {
    if (showToolTip) {
      containerRef.current?.focus()
    }
  }, [showToolTip])

  return (
    <Container
      tabIndex="-1"
      ref={containerRef}
      onClick={() => setShowToolTip(true)}
      onBlur={closeTooltip}
    >
      {children}
      {showToolTip && (
        <TooltipContainer
          xPosition={xPosition}
          yPosition={yPosition}
          translateX={
            xPosition === TOOLTIP_X_POSITION.LEFT ? 0 : containerRef.current?.getBoundingClientRect().width
          }
          parentHeight={containerRef.current?.getBoundingClientRect().height ?? 0}
          ref={tooltipRef}
        >
          {tooltipContent}
          <TailContainer>
            <Tail className={tailIconCSS} />
          </TailContainer>
          <ClosedButton onClick={() => setShowToolTip(false)}>
            <CloseIcon className={closedIconCSS} />
          </ClosedButton>
        </TooltipContainer>
      )}
    </Container>
  )
}
