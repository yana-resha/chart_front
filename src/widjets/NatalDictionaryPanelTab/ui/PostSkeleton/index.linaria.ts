import { styled } from '@linaria/react'

import { cardBorderVar, GlassCardRoot } from '@/shared/assets/styles/glass'
import { MEDIA_POINTS } from '@/shared/assets/styles/media-points'

export const Card = styled(GlassCardRoot)`
  border-radius: 20px;
  padding: 1.25rem;
  transition: box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  ${cardBorderVar(false)};

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
