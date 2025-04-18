import { css } from '@linaria/core'
import { styled } from '@linaria/react'

import { TOOLTIP_X_POSITION, TOOLTIP_Y_POSITION } from './types'

export const tailPadding = 16
export const tooltipTailHeight = 16
export const tooltipMaxWidth = 404
export const xpaddingTooltip = 12

export const tailIconCSS = css`
  width: 8.99px;
  height: 16px;
`

export const closedIconCSS = css`
  width: 8px;
  height: 8px;
`
export const TailContainer = styled.div`
  position: absolute;
`

export const TooltipContainer = styled.div<{
  parentHeight: number
  translateX: number
  xPosition: TOOLTIP_X_POSITION
  yPosition: TOOLTIP_Y_POSITION
}>`
  display: grid;
  grid-template-columns: 1fr 8px;
  position: fixed;
  width: max-content;
  max-width: ${tooltipMaxWidth}px;
  padding: 7px 12px;
  gap: 6px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  background: rgb(0, 0, 0);
  font-size: 12px;
  font-weight: 500;
  line-height: 18px;
  letter-spacing: 0.15px;
  color: rgb(155, 156, 158);

  // позиционируем сверху/снизу и слева/справа
  --x: ${(props) =>
    props.xPosition === TOOLTIP_X_POSITION.LEFT
      ? `-${xpaddingTooltip}px`
      : `calc(-100% + ${props.translateX}px + ${xpaddingTooltip}px)`};
  --y: ${({ yPosition, parentHeight }) =>
    yPosition === TOOLTIP_Y_POSITION.TOP
      ? `calc(-100% - ${tooltipTailHeight}px)`
      : `calc(${parentHeight}px + ${tooltipTailHeight}px)`};

  transform: translate(var(--x), var(--y));

  // позиционируем хвостик тултипа
  & ${TailContainer} {
    left: ${({ xPosition }) => (xPosition === 'left' ? '16px' : 'auto')};
    right: ${({ xPosition }) => (xPosition === 'right' ? '16px' : 'auto')};
    top: ${({ yPosition }) => (yPosition === 'top' ? 'calc(100% - 4px)' : 'auto')};
    bottom: ${({ yPosition }) => (yPosition === 'bottom' ? 'calc(100% - 5px)' : 'auto')};
  }

  & .${tailIconCSS} {
    transform: ${({ yPosition }) => (yPosition === 'bottom' ? 'rotate(180deg)' : 'none')};
  }
`

export const Container = styled.div`
  display: inline-flex;
  flex-direction: column;
  position: relative;
  transform: translate(0%, 0%);
  &:has(${TooltipContainer}) {
    z-index: 1;
  }
`

export const ClosedButton = styled.button`
  cursor: pointer;
  outline: none;
  border: none;
  background: transparent;
  padding: 0;
  margin: 0;
  width: fit-content;
  display: flex;
  align-items: center;
`
