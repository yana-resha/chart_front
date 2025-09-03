import { styled } from '@linaria/react'

import ClosedSVG from '@/shared/assets/icons/cross.svg?react'
import { OVERLAYS_BACKGROUND_COLORS } from '@/shared/assets/styles/overlays/colors'
import { MEDIA_POINTS } from '@/shared/assets/styles/media-points'

const tooltipMaxWidth = 404

export const ClosedIcon = styled(ClosedSVG)`
  width: 10px;
  height: 10px;
  color: rgba(255, 255, 255, 0.9);

  @media (max-width: ${MEDIA_POINTS.MOBILE_ALERTS}px) {
    width: 18px;
    height: 18px;
  }
`

export const Tooltip = styled.div`
  position: fixed;
  left: var(--x, -9999px);
  top: var(--y, -9999px);
  z-index: 999999;
  pointer-events: none;
  will-change: left, top, transform;

  &[data-role] {
    display: contents;
  }

  display: none;
  width: max-content;
  max-width: ${tooltipMaxWidth}px;
  padding: 7px 12px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  background: ${OVERLAYS_BACKGROUND_COLORS.WINDOW_BACK};
  font-size: 12px;
  font-weight: 500;
  line-height: 18px;
  letter-spacing: 0.15px;
  color: rgba(255, 255, 255, 0.8);

  &[data-role='content'],
  [data-role='content'] {
    pointer-events: auto;
  }

  .close {
    display: none;
    pointer-events: auto;
    background: transparent;
    border: 0;
    padding: 0;
    margin: 0;
    cursor: pointer;
  }

  /* ======= Мобилка: обычный тултип, приклеенный к НИЗУ окна ======= */
  @media (max-width: ${MEDIA_POINTS.MOBILE_ALERTS}px) {
    /* игнорируем координаты */
    --x: 0px;
    --y: 0px;
    left: 0 !important;
    right: 0;
    top: auto !important;
    bottom: 0 !important;
    inset: auto 0 0 0; /* ← низ, без вуали */

    width: 100%;
    max-width: 100%;
    border-radius: 16px 16px 0 0; /* скругляем верхние углы */
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-bottom: none;
    padding: 1rem 1rem calc(1rem + env(safe-area-inset-bottom)) 1rem;
    box-shadow:
      0 -6px 24px rgba(255, 255, 255, 0.15),
      0 -2px 8px rgba(255, 255, 255, 0.05);

    pointer-events: auto; /* чтобы крестик работал */
    grid-template-columns: 1fr;

    max-height: 85vh;
    height: fit-content; /* <-- исправлена опечатка */
    min-height: 30vh;
    overflow: hidden;

    [data-role='content'] {
      max-height: 100%;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
    }

    .close {
      display: inline-flex;
      position: absolute;
      top: 10px;
      right: 10px;
      align-items: center;
      justify-content: center;
    }
  }
`
