import { styled } from '@linaria/react'

import { MEDIA_POINTS } from '@/shared/assets/styles/media-points'

/* поповер (desktop) */
export const DropdownContainer = styled.div`
  background-color: rgba(19, 22, 25, 1);
  border-radius: 8px;
  border: 1px solid rgba(54, 58, 61, 0.9);
  padding: 0.75rem;
  font-size: 0.875rem;
  color: white;
  position: relative;
  max-width: 90vw;
  z-index: 1000;

  backdrop-filter: blur(6px);
  box-shadow:
    0 8px 30px rgba(0, 0, 0, 0.35),
    0 0 20px rgba(22, 238, 246, 0.05);

  transition: box-shadow 0.25s ease;

  &:hover {
    box-shadow:
      0 10px 36px rgba(0, 0, 0, 0.4),
      0 0 36px rgba(22, 238, 246, 0.08);
  }

  @media (max-width: ${MEDIA_POINTS.MOBILE_ALERTS}px) {
    display: none; /* на мобилке используем шит, поповер не показываем */
  }
`

/* вуаль для мобильного шита */
export const DropdownVeil = styled.div`
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

/* сам bottom-sheet на мобилке */
export const DropdownSheet = styled.div`
  background: rgba(26, 29, 33, 1);
  border-radius: 16px 16px 0 0;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-bottom: none;
  width: 100%;
  max-width: 100%;
  max-height: 80vh;
  overflow-y: auto;
  overscroll-behavior: contain;
  -webkit-overflow-scrolling: touch;
  padding: 1rem 1rem calc(1rem + env(safe-area-inset-bottom));
  box-shadow:
    0 -6px 24px rgba(0, 0, 0, 0.35),
    0 -2px 8px rgba(0, 0, 0, 0.25);

  display: none;

  @media (max-width: ${MEDIA_POINTS.MOBILE_ALERTS}px) {
    display: block;
  }
`
