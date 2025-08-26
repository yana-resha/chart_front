import { styled } from '@linaria/react'

import { MEDIA_POINTS } from '@/shared/assets/styles/media-points'

export const Card = styled.div`
  border-radius: 20px;
  padding: 1.25rem;
  box-shadow:
    inset 0 0 60px rgba(19, 22, 25, 0.1),
    0 0 10px rgba(0, 0, 0, 0.1);
  background: rgba(13, 15, 16, 0.5);
  transition: box-shadow 0.3s ease;
  backdrop-filter: blur(1px) contrast(1.1) brightness(1.1);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (max-width: ${MEDIA_POINTS.DESKTOP_SMALL}px) {
    padding: 1rem;
    padding-right: 2rem;
    padding-left: 2rem;
    gap: 1rem;
  }

  @media (max-width: ${MEDIA_POINTS.TABLET}px) {
    gap: 0.5rem;
    padding-right: 1.5rem;
    padding-left: 1.5rem;
  }
`
export const Title = styled.div`
  font-size: 1.375rem;
  font-weight: bold;
`
export const Paragraph = styled.div`
  font-size: 1rem;
  line-height: 1.75;
`
