import { css } from '@linaria/core'
import { styled } from '@linaria/react'

export const tooltipMaxWidth = 404
export const tooltipTailHeight = 16

export const TailContainer = styled.div`
  width: 16px;
  height: 8px;
  pointer-events: none;
`

export const tailIconCSS = css`
  width: 100%;
  height: 100%;
  display: block;
  transform-origin: center;
`

export const closedIconCSS = css`
  width: 8px;
  height: 8px;
`

export const TooltipContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 8px;
  width: max-content;
  max-width: ${tooltipMaxWidth}px;
  padding: 7px 12px;
  gap: 6px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  background: rgb(0, 0, 0);
  font-size: 12px;
  font-weight: 500;
  line-height: 18px;
  letter-spacing: 0.15px;
  color: rgb(155, 156, 158);
  z-index: 999;
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
  align-items: flex-start;
`
