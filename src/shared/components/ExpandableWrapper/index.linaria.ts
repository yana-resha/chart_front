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
  font-weight: 400;
  background: linear-gradient(to top, rgba(22, 238, 246, 0.5), rgba(22, 238, 246, 0));
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-top: none; /* чтобы не было двойной линии */
  font-size: 0.92rem;

  @media (max-width: ${MEDIA_POINTS.TABLET_SMALL}px) {
    font-size: 0.82rem;
  }
`
