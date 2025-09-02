import { css } from '@linaria/core'
import { styled } from '@linaria/react'

import LoaderSVG from '../assets/louder.svg?react'
import CheckSVG from '@/shared/assets/icons/check.svg?react'
import { SHARED_COLORS_VARIABLES } from '@/shared/assets/styles/colors'
import { MEDIA_POINTS } from '@/shared/assets/styles/media-points'

/* ────────────────────────────── */
/*   Кнопка закрытия (крестик)    */
/* ────────────────────────────── */
export const CrossContainer = styled.div`
  position: absolute;
  top: 0.75rem;
  right: 1rem;
  background: none;
  border: none;
  cursor: pointer;
`

/* ────────────────────────────── */
/*        Панель модалки          */
/* ────────────────────────────── */
export const modalFlex = css`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 500px;
  gap: 1rem;
  min-height: 120px;

  @media (max-width: ${MEDIA_POINTS.MOBILE_ALERTS}px) {
    width: 100%;
    min-height: 45vh;
  }
`

export const Loader = styled(LoaderSVG)`
  color: rgba(255, 255, 255, 0.6);
  width: 40px;
  height: 40px;
`

export const CheckAnimated = styled(CheckSVG)`
  width: 40px;
  height: 40px;
  stroke: ${SHARED_COLORS_VARIABLES.SUCCESS_COLOR};
  stroke-dasharray: 60;
  stroke-dashoffset: 60;
  animation:
    check-draw 520ms ease forwards,
    check-pop 220ms cubic-bezier(0.2, 0.8, 0.2, 1) 360ms both;

  @keyframes check-draw {
    to {
      stroke-dashoffset: 0;
    }
  }
  @keyframes check-pop {
    from {
      transform: scale(0.92);
    }
    to {
      transform: scale(1);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    stroke-dashoffset: 0;
  }
`

/* ────────────────────────────── */
/*        Тексты внутри панели    */
/* ────────────────────────────── */

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0rem;
`
export const Title = styled.div`
  color: rgba(255, 255, 255, 0.9);
  font-weight: 600;
  font-size: clamp(14px, 1rem, 18px);
  line-height: 1.45;
  letter-spacing: 0.2px;
  text-align: center;
  text-wrap: balance;
`

export const Subtitle = styled.div`
  color: rgba(255, 255, 255, 0.72);
  font-weight: 400;
  font-size: clamp(12px, 0.92rem, 16px);
  line-height: 1.55;
  letter-spacing: 0.15px;
`
