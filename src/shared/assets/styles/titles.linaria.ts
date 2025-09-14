import { styled } from '@linaria/react'

import { MEDIA_POINTS } from './media-points'

export const H1 = styled.h1`
  font-size: 1.875rem;
  color: rgba(255, 255, 255, 1);
  margin-bottom: 1.875rem;
  text-align: center;

  font-weight: 800;
  letter-spacing: 0.2px;

  @media (max-width: ${MEDIA_POINTS.DESKTOP_SMALL}px) {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
  }

  @media (max-width: ${MEDIA_POINTS.TABLET}px) {
    font-size: 1.5rem;
    margin-bottom: 1.2rem;
  }
`

export const H2 = styled.h2`
  font-size: 1.375rem;
  margin-bottom: 1rem;
  padding-left: 1rem;
  line-height: 1.4;
  font-weight: 500;

  font-weight: 800;
  letter-spacing: 0.2px;
  color: rgba(255, 255, 255, 0.92);

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
export const H3 = styled.h3`
  font-size: 1.125rem;
  margin-bottom: 0.875rem;
  padding-left: 1rem;
  line-height: 1.4;

  font-weight: 800;
  letter-spacing: 0.2px;
  color: rgba(255, 255, 255, 0.92);

  @media (max-width: ${MEDIA_POINTS.DESKTOP_SMALL}px) {
    font-size: 1rem;
    margin-bottom: 0.95rem;
    padding-left: 0.95rem;
  }
  @media (max-width: ${MEDIA_POINTS.TABLET}px) {
    padding-left: 0.85rem;
  }

  @media (max-width: ${MEDIA_POINTS.TABLET_SMALL}px) {
    padding-left: 0.5rem;
  }
`
