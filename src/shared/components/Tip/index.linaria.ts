import { styled } from '@linaria/react'

import { MEDIA_POINTS } from '@/shared/assets/styles/media-points'
import { CARD_TEXT_SIZE } from '@/shared/assets/styles/text-size'

export const TipBox = styled.div<{ hasSmile: boolean }>`
  /* background: rgba(245, 245, 245, 0.08); */
  border-radius: 20px;
  font-weight: 500;
  padding: 1rem 1.5rem;
  padding-bottom: ${({ hasSmile }) => (hasSmile ? '0.2rem' : '1rem')};
  text-align: center;
  font-size: ${CARD_TEXT_SIZE.M};
  line-height: 1.45;
  color: rgba(255, 255, 255, 0.95);
  transition: all 0.25s ease;

  &:hover {
    background: rgba(242, 255, 253, 0.12);
    transform: translateY(-1px);
  }

  @media (max-width: ${MEDIA_POINTS.TABLET}px) {
    font-size: ${CARD_TEXT_SIZE.XS};
    padding: 0.65rem 0.8rem;
    padding-bottom: ${({ hasSmile }) => (hasSmile ? '0.2rem' : '0.65rem')};
  }
`

export const TipSmile = styled.div`
  font-size: 28px;
`
