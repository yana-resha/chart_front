import { styled } from '@linaria/react'

export const Container = styled.div`
  width: 100%;
  height: fit-content;
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  position: relative;
  padding: 10px;
  overflow: hidden;
  transition:
    background 0.3s ease,
    border-color 0.3s ease,
    box-shadow 0.3s ease;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: 0;
    background: rgba(255, 255, 255, 0.02);
    backdrop-filter: blur(1px);
    pointer-events: none;
    border-radius: 14px;
    transition: background 0.3s ease;
  }

  &:hover {
    border-color: rgba(255, 255, 255, 0.15);
    box-shadow: 0 4px 12px rgba(255, 255, 255, 0.05);
  }

  &:hover::before {
    background: rgba(255, 255, 255, 0.04);
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
