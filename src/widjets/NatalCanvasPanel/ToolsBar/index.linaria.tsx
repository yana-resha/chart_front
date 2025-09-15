import { styled } from '@linaria/react'

import { MEDIA_POINTS } from '@/shared/assets/styles/media-points'

export const ToolsBarWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.625rem 1rem;
  background: rgba(255, 255, 255, 0.03);
  border: none;
  backdrop-filter: blur(0px);
  font-size: clamp(12px, 0.875rem, 16px);
  color: white;
  border-radius: 14px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
  overflow: hidden;

  @media (max-width: ${MEDIA_POINTS.TABLET}px) {
    padding: 0.5rem 0.65rem;
  }
`

export const LeftSide = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`

export const RightSide = styled.div`
  display: flex;
  align-items: center;
`

export const Icon = styled.div`
  width: 1.25rem;
  height: 1.25rem;

  & svg {
    width: 100%;
    height: 100%;
    stroke: rgba(255, 255, 255, 1);
  }

  @media (max-width: ${MEDIA_POINTS.TABLET_SMALL}px) {
    width: 1.1rem;
    height: 1.1rem;
  }
`
