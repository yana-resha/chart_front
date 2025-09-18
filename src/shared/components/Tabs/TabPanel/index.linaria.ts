import { styled } from '@linaria/react'

import { MEDIA_POINTS } from '@/shared/assets/styles/media-points'

interface TabContainerProps {
  $active?: boolean
}

export const Label = styled.div``

export const TabContainer = styled.div<TabContainerProps>`
  flex: 100 1 0;
  white-space: nowrap;

  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0rem 1.25rem 0.625rem 1.25rem;
  outline: none;
  transition:
    color 0.3s,
    box-shadow 0.3s,
    background 0.3s;

  /* мягкое свечение под активным табом */
  &::before {
    content: '';
    position: absolute;
    bottom: -0.625rem;
    left: 50%;
    transform: translateX(-50%) scaleX(${({ $active }) => ($active ? 1 : 0.6)});
    width: 60%;
    height: 0.375rem;
    pointer-events: none;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.4) 0%, transparent 80%);
    opacity: ${({ $active }) => ($active ? 1 : 0)};
    transition:
      opacity 0.3s,
      transform 0.4s ease;
  }

  /* одна линия — работает только для активной */
  &::after {
    content: '';
    position: absolute;
    left: 50%;
    bottom: -5px;
    transform: translateX(-50%) scaleX(${({ $active }) => ($active ? 1 : 0.5)});
    transform-origin: 0 50%;
    width: 100%;
    height: 2px;
    background: linear-gradient(to right, transparent, rgba(255, 255, 255, 1), transparent);
    opacity: ${({ $active }) => ($active ? 1 : 0)};
    pointer-events: none;
    transition:
      opacity 0.3s,
      transform 0.7s ease;
  }

  &:focus-visible::after,
  &:hover::after {
    height: 8px; /* контейнер для 2 линий */
    background:
      linear-gradient(to right, transparent, rgba(255, 255, 255, 0.7), transparent) center bottom / 100% 2px
        no-repeat,
      linear-gradient(to right, transparent, rgba(255, 255, 255, 0.3), transparent) center top / 100% 2px
        no-repeat;
    opacity: 1;
    transform: translateX(-50%) scaleX(1);
  }

  & ${Label} {
    color: ${({ $active }) => ($active ? 'rgba(255, 255, 255, 0.92)' : 'rgba(255, 255, 255, 0.85)')};
    font-size: 1rem;
    font-weight: 500;
    transition:
      color 0.3s,
      font-size 0.3s,
      text-shadow 0.3s;

    @media (max-width: ${MEDIA_POINTS.DESKTOP_SMALL}px) {
      font-size: 0.92rem;
    }
  }

  &:hover ${Label}, &:focus-visible ${Label} {
    color: ${({ $active }) => ($active ? 'rgba(255, 255, 255, 0.85)' : 'rgba(255, 255, 255, 0.95)')};
  }

  @media (prefers-reduced-motion: reduce) {
    &::after,
    &::before {
      transition: none;
    }
  }
`
