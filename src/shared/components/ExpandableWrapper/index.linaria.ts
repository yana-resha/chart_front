import { styled } from '@linaria/react'

import { MEDIA_POINTS } from '@/shared/assets/styles/media-points'

export const Container = styled.div`
  width: 100%;
  min-width: 0;
  display: flex; /* было grid — можно оставить grid с align-items:stretch,
                          но внутри этого компонента нам нужен flex-столбик */
  flex-direction: column;
  height: 100%; /* важно для выравнивания по высоте со второй колонкой */
  position: relative;
`

export const ToggleButton = styled.button`
  display: block;
  width: 100%;
  margin: 0;
  color: black;
  font-weight: 400;
  border: none;
  padding: 0.75rem;
  margin-top: -2px;
  cursor: pointer;
  background: linear-gradient(to top, rgba(22, 238, 246, 0.5), rgba(22, 238, 246, 0));
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-top: none; /* чтобы не было двойной линии */
  font-size: 0.92rem;
  transition:
    background 0.25s ease,
    color 0.25s ease,
    box-shadow 0.25s ease;

  @media (max-width: ${MEDIA_POINTS.TABLET_SMALL}px) {
    font-size: 0.82rem;
  }

  &:hover,
  &:focus-visible {
    background: linear-gradient(to top, rgba(22, 238, 246, 0.7), rgba(22, 238, 246, 0.1));
    color: #000; /* чёрный, можно заменить на белый, если фон станет ярче */
    outline: none;
  }

  &:active {
    background: linear-gradient(to top, rgba(22, 238, 246, 0.9), rgba(22, 238, 246, 0.2));
    box-shadow: inset 0 2px 6px rgba(0, 0, 0, 0.15);
  }
`
