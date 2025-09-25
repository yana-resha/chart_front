import { styled } from '@linaria/react'

import { MEDIA_POINTS } from './media-points'

export const TEXT_COLORS = {
  LIGHT_H1_COLOR: 'rgba(255, 255, 255, 1)',
  LIGHT_H2_COLOR: 'rgba(255, 255, 255, 0.92)',
  LIGHT_H3_COLOR: 'rgba(255, 255, 255, 0.92)',

  DARK_H1_COLOR: 'rgba(17, 17, 17, 1)',
  DARK_H2_COLOR: 'rgba(17, 17, 17, 0.92)',
  DARK_H3_COLOR: 'rgba(17, 17, 17, 0.92)',
}

type ModeProps = {
  variant?: 'light' | 'dark'
}

export const H1 = styled.h1<ModeProps>`
  font-size: 1.875rem;
  color: ${({ variant }) => (variant === 'dark' ? TEXT_COLORS.DARK_H1_COLOR : TEXT_COLORS.LIGHT_H1_COLOR)};
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

export const H2 = styled.h2<ModeProps>`
  font-size: 1.375rem;
  margin-bottom: 1rem;
  padding-left: 1rem;
  line-height: 1.4;
  font-weight: 800;
  letter-spacing: 0.2px;

  color: ${({ variant }) => (variant === 'dark' ? TEXT_COLORS.DARK_H2_COLOR : TEXT_COLORS.LIGHT_H2_COLOR)};

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

export const H3 = styled.h3<ModeProps>`
  font-size: 1.125rem;
  margin-bottom: 0.875rem;
  padding-left: 1rem;
  line-height: 1.4;
  font-weight: 800;
  letter-spacing: 0.2px;

  color: ${({ variant }) => (variant === 'dark' ? TEXT_COLORS.DARK_H3_COLOR : TEXT_COLORS.LIGHT_H3_COLOR)};

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
