import { styled } from '@linaria/react'

import { CardCaption, CardTitle, Section, TEXT_COLORS } from '../../index.linaria'

export const PossibilitiesSection = styled(Section)`
  width: 100%;
  min-height: 400px;
  overflow: hidden;
`

// МОЗАИКА
export const PossibilitiesMosaic = styled.ul`
  display: grid;
  list-style: none;
  padding: 0;
  gap: 14px;

  /* десктоп */
  grid-template-columns: 1.2fr 1fr 1.1fr;
  grid-auto-rows: 180px;
  grid-template-areas:
    'a a b'
    'c d b'
    'c e e';

  /* планшет */
  @media (max-width: 1199px) {
    grid-template-columns: 1fr 1fr;
    grid-auto-rows: 170px;
    grid-template-areas:
      'a b'
      'c b'
      'c d'
      'e e';
  }

  /* мобила: часть строк по 2 карточки, часть — во всю ширину */
  @media (max-width: 550px) {
    grid-template-columns: 1fr 1fr;
    grid-auto-rows: 160px;
    grid-template-areas:
      'a a' /* A во всю ширину */
      'd e' /* ряд из двух карточек */
      'b b' /* D во всю ширину */
      'c c'; /* E во всю ширину */

    /* при очень узких экранах можно слегка уменьшить высоту рядов */
    @media (max-width: 360px) {
      grid-auto-rows: 150px;
    }
  }
`

export const PossibilityCardOverlay = styled.span`
  position: absolute;
  inset: 0;
  z-index: -1;
  background:
    /* лёгкая сетка */
    radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.03) 0 2px, transparent 2px),
    radial-gradient(circle at 70% 70%, rgba(255, 255, 255, 0.025) 0 1px, transparent 1px),
    /* затемнение снизу для текста */
      linear-gradient(180deg, rgba(255, 255, 255, 0) 55%, rgba(255, 255, 255, 0.2) 100%);
  background-size:
    120px 120px,
    200px 200px,
    auto;
  background-repeat: repeat, repeat, no-repeat;
  transition: opacity 0.4s;
`

// карточка
export const PossibilityCard = styled.li<{ $area: string; $hue: number }>`
  position: relative;
  grid-area: ${(p) => p.$area};
  border-radius: 14px;
  overflow: hidden;
  isolation: isolate;
  outline: 1px solid rgba(255, 255, 255, 0.06);
  background-color: #0e1216;

  transform: translateY(0);
  transition:
    outline-color 300ms ease,
    box-shadow 300ms ease,
    transform 300ms ease;

  & > img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: 50% 50%;
    filter: saturate(0.85) brightness(0.92) contrast(1.05);
    opacity: 0.88;
    z-index: -2;

    transition:
      filter 300ms ease,
      opacity 300ms ease;
  }

  &:hover {
    outline-color: rgba(255, 255, 255, 0.12);

    box-shadow:
      0 0 0 1px rgba(255, 255, 255, 0.06) inset,
      0 10px 24px rgba(255, 255, 255, 0.05),
      0 0 36px hsl(${(p) => p.$hue} 80% 60% / 0.08);

    box-shadow:
      0 0 0 1px rgba(255, 255, 255, 0.06) inset,
      0 10px 24px rgba(0, 0, 0, 0.35),
      0 0 36px hsl(${(p) => p.$hue} 80% 60% / 0.08);
    transform: translateY(-2px);

    & ${PossibilityCardOverlay} {
      opacity: 0.5;
    }
  }
`

// overlay поверх постера (улучшаем читаемость текста)

// текст
export const PossibilityCardText = styled.div`
  position: absolute;
  left: 16px;
  right: 16px;
  bottom: 14px;
  display: grid;
  gap: 6px;

  @media (min-width: 1200px) {
    left: 18px;
    right: 18px;
    bottom: 16px;
  }
`

export const PossibilityCardTitle = styled(CardTitle)`
  margin: 0;
  font-weight: 500;
  /* color: ${TEXT_COLORS.DARK_TITLE_COLOR}; */
`

export const PossibilityCardCaption = styled(CardCaption)`
  margin: 0;
  /* color: ${TEXT_COLORS.DARK_SUBTITLE_COLOR}; */
`
