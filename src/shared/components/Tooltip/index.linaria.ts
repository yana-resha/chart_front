import { css } from '@linaria/core'
import { styled } from '@linaria/react'

import ClosedSVG from '@/shared/assets/icons/cross.svg?react'
import { MEDIA_POINTS } from '@/shared/assets/styles/media-points'

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

export const ClosedIcon = styled(ClosedSVG)`
  width: 10px;
  height: 10px;
  color: rgba(255, 255, 255, 0.9);

  @media (max-width: ${MEDIA_POINTS.MOBILE_ALERTS}px) {
    width: 18px;
    height: 18px;
  }
`

/* общий контейнер тултипа (используется и в поповере, и внутри шита) */
export const TooltipContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 8px;
  width: max-content;
  max-width: ${tooltipMaxWidth}px;
  padding: 7px 12px;
  gap: 6px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  background:
    radial-gradient(120% 80% at 50% -10%, rgba(255, 255, 255, 0.06) 0%, transparent 60%),
    rgba(18, 20, 26, 0.92);
  font-size: 12px;
  font-weight: 500;
  line-height: 18px;
  letter-spacing: 0.15px;
  color: rgb(255, 255, 255, 0.8);
  z-index: 999;
`

/* вуаль + шит для мобилки */
export const TooltipVeil = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;

  display: none;
  @media (max-width: ${MEDIA_POINTS.MOBILE_ALERTS}px) {
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
  }
`

export const TooltipSheet = styled.div`
  position: relative; /* нужно для абсолютной кнопки */
  background:
    radial-gradient(120% 80% at 50% -10%, rgba(255, 255, 255, 0.06) 0%, transparent 60%),
    rgba(18, 20, 26, 0.92);
  border-radius: 16px 16px 0 0;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-bottom: none;
  width: 100%;
  max-width: 100%;
  max-height: 85vh;
  min-height: 30vh;
  overflow-y: hidden;
  overscroll-behavior: contain;
  -webkit-overflow-scrolling: touch;

  font-size: 0.8rem;
  line-height: 1.5;
  letter-spacing: 0.15px;
  color: rgb(255, 255, 255, 0.8);
  box-shadow:
    0 -6px 24px rgba(255, 255, 255, 0.15),
    0 -2px 8px rgba(255, 255, 255, 0.05);
  padding: 1rem 1rem 1rem;
  display: flex;
  flex-direction: column;
`

export const TooltipSheetContainer = styled.div`
  height: 100%;
  overflow-y: auto;
  width: 100%;
`

export const CrossContainer = styled.div`
  display: flex;
  justify-content: flex-end; /* прижимаем вправо */
  align-items: flex-start;
  position: sticky;
  top: 0;

  @media (max-width: ${MEDIA_POINTS.MOBILE_ALERTS}px) {
    display: flex;
    justify-content: flex-end; /* прижимаем вправо */
  }
`
