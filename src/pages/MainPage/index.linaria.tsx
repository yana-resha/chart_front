import { styled } from '@linaria/react'

import { MEDIA_POINTS } from '@/shared/assets/styles/media-points'

export const SECTION_CONTENT_PADDINGS = {
  padding_x: {
    large: '36px',
    medium: '28px',
    small: '16px',
  },

  padding_top: {
    large: '40px',
    medium: '32px',
    small: '32px',
  },

  padding_bottom: {
    large: '45px',
    medium: '32px',
    small: '32px',
  },
}

export const Layout = styled.div`
  height: 100%;
  width: 100%;
  max-width: 100%;
  position: relative;
`

export const HeroSection = styled.article`
  width: 100%;
  height: calc(100dvh - 25px);
  max-height: 1080px;
  position: relative;

  display: flex;
  flex-direction: column;

  @media (max-width: ${MEDIA_POINTS.TABLET}px) {
    height: calc(100dvh - 15px - 50px);
  }

  & > img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: 50% 50%;
    filter: saturate(0.85) brightness(0.9) contrast(1.05);
    opacity: 1;
    z-index: -2;
  }
`

export const HeroContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: rgba(255, 255, 255, 0.85);
  padding-left: ${SECTION_CONTENT_PADDINGS.padding_x.large};
  padding-right: ${SECTION_CONTENT_PADDINGS.padding_x.large};
  padding-top: ${SECTION_CONTENT_PADDINGS.padding_top.large};
  padding-bottom: ${SECTION_CONTENT_PADDINGS.padding_bottom.large};

  @media (max-width: ${MEDIA_POINTS.DESKTOP_SMALL}px) {
    padding-left: ${SECTION_CONTENT_PADDINGS.padding_x.medium};
    padding-right: ${SECTION_CONTENT_PADDINGS.padding_x.medium};
    padding-top: ${SECTION_CONTENT_PADDINGS.padding_top.medium};
    padding-bottom: ${SECTION_CONTENT_PADDINGS.padding_bottom.medium};
  }

  @media (max-width: ${MEDIA_POINTS.TABLET_SMALL}px) {
    padding-left: ${SECTION_CONTENT_PADDINGS.padding_x.small};
    padding-right: ${SECTION_CONTENT_PADDINGS.padding_x.small};
    padding-top: ${SECTION_CONTENT_PADDINGS.padding_top.small};
    padding-bottom: ${SECTION_CONTENT_PADDINGS.padding_bottom.small};
  }
`

export const HeroTitle = styled.h1`
  margin: 0;
  color: rgba(255, 255, 255, 0.92);
  font-size: clamp(40px, 7vw, 80px);
  font-weight: 800;
  line-height: 1.05;
`

export const HeroSubtitle = styled.h2`
  margin: 0 0 20px 0;
  font-weight: 500;
  line-height: 1.15;
  color: rgba(255, 255, 255, 0.92);
  font-size: clamp(16px, 2.4vw, 28px);
  letter-spacing: 1.2px;

  @media (max-width: 850px) {
    letter-spacing: 1px;
    margin: 0 0 15px 0;
  }

  @media (max-width: 685px) {
    letter-spacing: 0.8px;
  }
`

export const HeroLead = styled.p`
  margin: 0 0 30px 0;
  font-weight: 400;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.65);
  font-size: clamp(14px, 1.6vw, 18px);

  @media (max-width: 750px) {
    font-size: 14px;
    line-height: 1.4;
    margin: 0 0 20px 0;
  }
`

export const HeroButtonsBlock = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: fit-content;
  gap: 10px;

  /* ширина ровно по кнопкам, не растягиваем */
  align-self: flex-start;

  @media (max-width: 400px) {
    width: 100%;
    grid-template-columns: 1fr;
  }
`

/* Возможности блок */

// секция
export const AdvantagesSection = styled.section`
  width: 100%;
  min-height: 400px;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.05) 0%,
    rgba(19, 22, 25, 0.9) 50%,
    rgba(255, 255, 255, 0.05) 100%
  );
  overflow: hidden;
`

// внутренности
export const AdvantagesInner = styled.div`
  padding-left: ${SECTION_CONTENT_PADDINGS.padding_x.large};
  padding-right: ${SECTION_CONTENT_PADDINGS.padding_x.large};
  padding-top: ${SECTION_CONTENT_PADDINGS.padding_top.large};
  padding-bottom: ${SECTION_CONTENT_PADDINGS.padding_bottom.large};

  @media (max-width: ${MEDIA_POINTS.DESKTOP_SMALL}px) {
    padding-left: ${SECTION_CONTENT_PADDINGS.padding_x.medium};
    padding-right: ${SECTION_CONTENT_PADDINGS.padding_x.medium};
    padding-top: ${SECTION_CONTENT_PADDINGS.padding_top.medium};
    padding-bottom: ${SECTION_CONTENT_PADDINGS.padding_bottom.medium};
  }

  @media (max-width: ${MEDIA_POINTS.TABLET_SMALL}px) {
    padding-left: ${SECTION_CONTENT_PADDINGS.padding_x.small};
    padding-right: ${SECTION_CONTENT_PADDINGS.padding_x.small};
    padding-top: ${SECTION_CONTENT_PADDINGS.padding_top.small};
    padding-bottom: ${SECTION_CONTENT_PADDINGS.padding_bottom.small};
  }
`

// заголовочная часть
export const AdvantagesHeadWrapper = styled.div`
  margin-bottom: 20px;
`

export const AdvantagesTitle = styled.h2`
  margin: 0 0 6px;
  font-weight: 800;
  letter-spacing: 0.2px;
  color: rgba(255, 255, 255, 0.92);

  /* адаптивная типографика */
  font-size: clamp(20px, 2.2vw, 28px);
  line-height: 1.15;
`

export const AdvantagesSubtitle = styled.div`
  margin: 0;
  color: rgba(255, 255, 255, 0.65);
  font-size: clamp(12px, 1.4vw, 14px);
`

// МОЗАИКА
export const AdvantagesMosaic = styled.ul`
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

// карточка
export const AdvantageCard = styled.li<{ $area: string; $hue: number }>`
  position: relative;
  grid-area: ${(p) => p.$area};
  border-radius: 14px;
  overflow: hidden;
  isolation: isolate;
  outline: 1px solid rgba(255, 255, 255, 0.06);
  background-color: #0e1216; /* фикс опечатки */

  transform: translateZ(0);
  transition:
    outline-color 300ms ease,
    box-shadow 300ms ease,
    transform 300ms ease;

  @media (hover: hover) {
    &:hover {
      outline-color: rgba(255, 255, 255, 0.12);
      box-shadow:
        0 0 0 1px rgba(255, 255, 255, 0.06) inset,
        0 10px 24px rgba(0, 0, 0, 0.35),
        0 0 36px hsl(${(p) => p.$hue} 80% 60% / 0.08);
      transform: translateY(-2px);
    }
  }

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
  }
`

// overlay поверх постера (улучшаем читаемость текста)
export const AdvantageCardOverlay = styled.span`
  position: absolute;
  inset: 0;
  z-index: -1;
  background:
    /* лёгкая сетка */
    radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.03) 0 2px, transparent 2px),
    radial-gradient(circle at 70% 70%, rgba(255, 255, 255, 0.025) 0 1px, transparent 1px),
    /* затемнение снизу для текста */ linear-gradient(180deg, rgba(0, 0, 0, 0) 55%, rgba(0, 0, 0, 0.4) 100%);
  background-size:
    120px 120px,
    200px 200px,
    auto;
  background-repeat: repeat, repeat, no-repeat;
`

// текст
export const AdvantageCardText = styled.div`
  position: absolute;
  left: 16px;
  right: 16px;
  bottom: 14px;
  display: grid;
  gap: 6px;
  pointer-events: none;

  @media (min-width: 1200px) {
    left: 18px;
    right: 18px;
    bottom: 16px;
  }
`

export const AdvantageCardTitle = styled.h3`
  margin: 0;
  font-weight: 500;
  letter-spacing: 0.2px;
  color: rgba(255, 255, 255, 0.92);
  text-shadow: 0 1px 10px rgba(200, 220, 255, 0.08);

  /* адаптивный размер */
  font-size: clamp(15px, 1.8vw, 18px);
  line-height: 1.2;
`

export const AdvantageCardCaption = styled.p`
  margin: 0;
  color: rgba(255, 255, 255, 0.74);

  /* адаптивный размер */
  font-size: clamp(10px, 1.5vw, 13px);
  line-height: 1.35;
`
