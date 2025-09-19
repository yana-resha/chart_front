import { MEDIA_POINTS } from '@/shared/assets/styles/media-points'
import { CARD_TEXT_SIZE } from '@/shared/assets/styles/text-size'
import { styled } from '@linaria/react'

export const TipBox = styled.div<{ hasSmile: boolean }>`
  border: 1px solid rgba(255, 255, 255, 0.4);
  background: rgba(242, 255, 253, 0.08);
  border-radius: 6px;
  font-weight: 500;
  padding: 1rem 1.5rem;
  padding-bottom: ${({ hasSmile }) => (hasSmile ? '0.2rem' : '1rem')};
  text-align: center;
  font-size: ${CARD_TEXT_SIZE.M};
  line-height: 1.45;
  color: rgba(255, 255, 255, 0.95);
  box-shadow: 0 0 8px rgba(255, 209, 102, 0.15);
  transition: all 0.25s ease;

  &:hover {
    background: rgba(242, 255, 253, 0.12);
    border-color: rgba(255, 255, 255, 0.55);
    box-shadow: 0 0 10px rgba(242, 255, 253, 0.25);
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
