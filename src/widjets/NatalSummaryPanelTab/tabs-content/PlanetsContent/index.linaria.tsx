import { styled } from '@linaria/react'

import { MEDIA_POINTS } from '@/shared/assets/styles/media-points'
import { CARD_TEXT_SIZE, CARD_TITLE_TEXT } from '@/shared/assets/styles/text-size'

export const PlanetsContentLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  width: 100%;
  min-width: 0;
  align-items: start;
`

export const PlanetInDegressGrid = styled.div`
  display: grid;
  gap: 16px;
  width: 100%;
  grid-template-columns: 1fr;
  align-items: stretch;
  min-width: 0;
`

export const Card = styled.div`
  background: rgba(255, 255, 255, 0.04);
  border-radius: 20px;

  padding: 1rem;
  padding-top: 0.8rem;
  font-size: ${CARD_TEXT_SIZE.S};
  color: rgba(255, 255, 255, 0.8);
  min-width: 0;
  min-height: 120px;

  backdrop-filter: blur(9.760000228881836px);
  box-shadow:
    inset 1px 1px 4px 0 rgba(255, 255, 255, 0.05),
    inset 2px 2px 9px 0 rgba(255, 255, 255, 0.05),
    -2px -2px 12px -8px rgba(0, 0, 0, 0.05),
    -11px -10px 48px -12px rgba(255, 255, 255, 0.05);

  @media (max-width: ${MEDIA_POINTS.TABLET_SMALL}px) {
    font-size: ${CARD_TEXT_SIZE.XS};
    min-height: 100px;
  }
`

/* Основные качества список и карточки */
export const BalanceGrid = styled.div`
  display: grid;
  gap: 1rem;
  width: 100%;
  grid-template-columns: repeat(3, 1fr);
  align-items: stretch;
  min-width: 0;

  @media (max-width: ${MEDIA_POINTS.DESKTOP_SMALL}px) {
    grid-template-columns: repeat(2, 1fr);
  }
`

export const ModalitiesCard = styled(Card)`
  @media (max-width: ${MEDIA_POINTS.DESKTOP_SMALL}px) {
    grid-column: 1 / -1; /* занимает всю строку */
    min-height: auto;
  }
`

export const SectionBlock = styled.div`
  width: 100%;
`

export const Title = styled.div`
  display: flex;
  align-items: center;
  color: rgba(255, 255, 255, 0.9);
  gap: 2px;
  font-weight: 600;
  font-size: ${CARD_TITLE_TEXT.S};
  margin-bottom: 8px;
  position: relative;
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
  padding-bottom: 7px;

  @media (max-width: ${MEDIA_POINTS.TABLET_SMALL}px) {
    font-size: ${CARD_TITLE_TEXT.XS};
  }

  /* &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: rgba(255, 255, 255, 0.12);
    margin-left: 8px;
    top: 100%;
  } */
`

export const List = styled.ul`
  display: grid;
  gap: 4px;
  list-style: none;
  margin: 0;
  padding: 0;
  min-width: 0;
`

/* Ретро и достоинства */
export const RetroGrid = styled.div`
  display: grid;
  gap: 16px;
  width: 100%;
  min-width: 0;
  align-items: stretch;
  grid-auto-flow: row dense; /* заполняет «дыры» при разной высоте */

  /* desktop — 5 колонок */
  grid-template-columns: repeat(5, minmax(0, 1fr));

  @media (max-width: 1250px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media (max-width: ${MEDIA_POINTS.TABLET_SMALL}px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`
