import { styled } from '@linaria/react'

import { MEDIA_POINTS } from './media-points'

export const PageTitle = styled.div`
  font-size: 1.875rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  margin-bottom: 1.875rem;
  text-align: center;
  text-shadow:
    0 0 6px rgba(22, 238, 246, 0.1),
    0 0 12px rgba(22, 238, 246, 0.1),
    0 0 20px rgba(22, 238, 246, 0.15);

  @media (max-width: ${MEDIA_POINTS.DESKTOP_SMALL}px) {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
  }

  @media (max-width: ${MEDIA_POINTS.TABLET}px) {
    font-size: 1.5rem;
    margin-bottom: 1.2rem;
  }
`

export const SectionTitle = styled.h2`
  font-size: 1.375rem;
  margin-bottom: 1rem;
  padding-left: 1rem;
  line-height: 1.4;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
  text-shadow:
    0 0 6px rgba(22, 238, 246, 0.1),
    0 0 12px rgba(22, 238, 246, 0.1),
    0 0 20px rgba(22, 238, 246, 0.15);

  @media (max-width: ${MEDIA_POINTS.DESKTOP_SMALL}px) {
    font-size: 1.3rem;
    margin-bottom: 0.95rem;
    padding-left: 0.95rem;
  }
  @media (max-width: ${MEDIA_POINTS.TABLET}px) {
    font-size: 1.2rem;
    margin-bottom: 0.85rem;
    padding-left: 0.85rem;
  }

  @media (max-width: ${MEDIA_POINTS.TABLET_SMALL}px) {
    padding-left: 0.5rem;
  }
`
export const SubSectionTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 500;
  padding-left: 0.8rem;
  margin-bottom: 0.75rem;
  line-height: 1.4;
  color: rgba(255, 255, 255, 0.9);
  text-shadow:
    0 0 6px rgba(22, 238, 246, 0.1),
    0 0 12px rgba(22, 238, 246, 0.1),
    0 0 20px rgba(22, 238, 246, 0.15);
`
