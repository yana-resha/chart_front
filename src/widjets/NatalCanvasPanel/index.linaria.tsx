import { styled } from '@linaria/react'

import { cardHoverVar, GlassCardRoot } from '@/shared/assets/styles/glass'
import { MEDIA_POINTS } from '@/shared/assets/styles/media-points'

export const Container = styled(GlassCardRoot)`
  width: 100%;
  height: fit-content;
  border-radius: 12px;
  position: relative;
  padding: 10px;
  overflow: hidden;

  ${cardHoverVar(false)};

  @media (max-width: ${MEDIA_POINTS.TABLET}px) {
    padding: 5px;
  }
`
export const ChartContainer = styled.div`
  display: flex;
  justify-content: center;
`

export const AspectRatioCanvasWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 600px;
  aspect-ratio: 1 / 1; /* Квадратный холст */

  @media (max-width: 500px) {
    max-width: 100%;
  }
`
