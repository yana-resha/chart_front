import { styled } from '@linaria/react'

import { GlassCardRoot, glassBorderSide } from '@/shared/assets/styles/glass'
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

export const Card = styled(GlassCardRoot)`
  border-radius: 20px;
  padding: 1rem;
  padding-top: 0.8rem;
  font-size: ${CARD_TEXT_SIZE.S};
  color: rgba(255, 255, 255, 0.8);
  min-width: 0;
  min-height: 150px;

  @media (max-width: ${MEDIA_POINTS.TABLET_SMALL}px) {
    font-size: ${CARD_TEXT_SIZE.XS};
  }
`

/* Основные качества список и карточки */

export const BalanceGrid = styled.div`
  display: grid;
  gap: 1rem;
  width: 100%;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto;
  align-items: stretch;
  min-width: 0;

  /* Стихии */
  & > :nth-child(1) {
    grid-column: 1;
    grid-row: 1;
  }

  /* Знаки */
  & > :nth-child(2) {
    grid-column: 2;
    grid-row: 1 / span 2; /* по умолчанию на 2 строки */
  }

  /* Качества */
  & > :nth-child(3) {
    grid-column: 1;
    grid-row: 2;
  }

  @media (max-width: ${MEDIA_POINTS.DESKTOP_SMALL}px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto;

    & > :nth-child(2) {
      grid-column: auto;
      grid-row: auto; /* сбрасываем растяжение */
    }
  }

  @media (max-width: ${MEDIA_POINTS.TABLET_SMALL}px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
  }
`

export const ModalitiesCard = styled(Card)`
  @media (max-width: ${MEDIA_POINTS.DESKTOP_SMALL}px) {
    /* grid-column: 1 / -1; /* занимает всю строку */ */
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
  padding-bottom: 7px;

  ${glassBorderSide('bottom', undefined, 1)};

  @media (max-width: ${MEDIA_POINTS.TABLET_SMALL}px) {
    font-size: ${CARD_TITLE_TEXT.XS};
  }
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

  /* desktop: слева ретро на 2 ряда, справа 2x2 */
  grid-template-columns: 1fr 1fr 1fr;
  grid-auto-rows: auto;

  @media (max-width: ${MEDIA_POINTS.TABLET_SMALL}px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  /* ретро занимает 2 строки */
  & > :first-child {
    grid-row: span 2;
  }
`
