import { styled } from '@linaria/react'

export const Container = styled.div`
  width: 100%;
  height: fit-content;
`

export const ChartContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px;
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
