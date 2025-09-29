import { ReactNode } from 'react'

import { styled } from '@linaria/react'

import { cardBorderVar, glassBorderSide, GlassCardRoot } from '@/shared/assets/styles/glass'
import { MEDIA_POINTS } from '@/shared/assets/styles/media-points'
import { PageContentWrapper } from '@/shared/assets/styles/pages.linaria'
import { CARD_TEXT_SIZE, CARD_TITLE_TEXT, TEXT_SIZE } from '@/shared/assets/styles/text-size'
import { H1 } from '@/shared/assets/styles/titles.linaria'

export const TEXT_COLORS = {
  LIGHT_TITLE_COLOR: 'rgba(255, 255, 255, 0.92)',
  LIGHT_SUBTITLE_COLOR: 'rgba(255, 255, 255, 0.65)',

  DARK_TITLE_COLOR: 'rgba(17, 17, 17, 0.92)',
  DARK_SUBTITLE_COLOR: 'rgba(17, 17, 17, 0.85)',

  LIGHT_CARD_COLOR: 'rgba(255, 255, 255, 0.92)',
  DARK_CARD_COLOR: 'rgba(17, 17, 17, 0.92)',
}
type Variant = 'light' | 'dark'

const LISTS_GAP = {
  desktop: '1.25rem',
  tablet: '0.8rem',
  sm_tablet: '1.25rem',
}
export const MainTitle = styled(H1)`
  margin-bottom: 0px;
`

export const MainDescription = styled.div`
  font-size: ${TEXT_SIZE.M};
  color: rgba(255, 255, 255, 0.75);
  line-height: 1.45;
  text-align: center;
  margin-bottom: 1.875rem;

  @media (max-width: ${MEDIA_POINTS.TABLET}px) {
    font-size: ${TEXT_SIZE.S};
    margin-bottom: 1.25rem;
  }
`

export const DescText = styled.div`
  font-size: ${CARD_TEXT_SIZE.M};
  line-height: 1.45;
  opacity: 0.9;

  @media (max-width: ${MEDIA_POINTS.TABLET}px) {
    font-size: ${CARD_TEXT_SIZE.XS};
  }
`

export const BaseCardHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`
/** Горизонтальная строка заголовка карточки */
export const CardTitleRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  font-weight: 500;
  line-height: 1.35;
  font-size: ${CARD_TITLE_TEXT.S};

  @media (max-width: ${MEDIA_POINTS.TABLET}px) {
    font-size: ${CARD_TITLE_TEXT.XS};
  }
`
/** Тонкая линия внутри карточек */
/* Шаги заполнения: 2 → 1 (как у тебя по смыслу) */
export const StepsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${LISTS_GAP.desktop};
  margin: 1rem 0 1.5rem;

  @media (max-width: ${MEDIA_POINTS.TABLET_SMALL}px) {
    grid-template-columns: 1fr;
  }
`
export const StepDesc = styled(DescText)``

/* ======= common blocks ======= */
export const Divider = styled.div`
  height: 1px;
  position: relative;
  width: 100%;
  ${glassBorderSide('bottom')};
`
/* ======= page layout & text ======= */
export const Layout = styled(PageContentWrapper)`
  height: 100%;
  width: 100%;
  max-width: 100%;
  position: relative;
`

export const BenefitialBlock = styled.div`
  padding: 1rem 0 0 0;
`

export const MarkdownText = styled.div<{ variant?: Variant }>`
  color: ${({ variant }) =>
    variant === 'dark' ? TEXT_COLORS.DARK_TITLE_COLOR : TEXT_COLORS.LIGHT_TITLE_COLOR};
  font-size: ${TEXT_SIZE.M};
  line-height: 1.7;
  width: 100%;

  @media (max-width: ${MEDIA_POINTS.TABLET}px) {
    font-size: ${TEXT_SIZE.S};
  }

  p:not(:last-child) {
    margin-bottom: 0.8rem;
  }

  code {
    background: ${({ variant }) =>
      variant === 'dark' ? 'rgba(17, 17, 17, 0.08)' : 'rgba(255, 255, 255, 0.08)'};
    padding: 0.15em 0.35em;
    border-radius: 4px;
    font-size: 0.95em;
  }

  strong {
    font-weight: 600;
    font-size: 110%;
  }

  em {
    font-style: italic;
    opacity: 0.75;
  }
`

export const FormWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 50px;
  padding-bottom: 50px;
  container-type: inline-size;
  background: rgba(23, 25, 26, 1);

  @media (max-width: ${MEDIA_POINTS.DESKTOP_SMALL}px) {
    /*     padding-top: 10px;
    padding-bottom: 20px; */
  }
`
/* ======= cards ======= */

export const CardDivider = styled.div`
  height: 1px;
  position: relative;
`
export const BaseCard = styled(GlassCardRoot)<{ variant?: Variant; children: ReactNode }>`
  border-radius: 14px;
  color: ${({ variant }) =>
    variant === 'dark' ? TEXT_COLORS.DARK_CARD_COLOR : TEXT_COLORS.LIGHT_CARD_COLOR};
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1rem;
  padding-top: 0.7rem;

  & ${CardDivider} {
    background: ${({ variant }) =>
      variant === 'dark' ? TEXT_COLORS.DARK_CARD_COLOR : TEXT_COLORS.LIGHT_CARD_COLOR};
  }
`
/* ======= sections ======= */

const SECTION_PADDINGS = {
  padding_x_desktop: '1.875rem',
  padding_y_desktop: '1rem',

  padding_x_tablet: '0.5rem',
  padding_y_tablet: '1rem',
}

export const SectionBlock = styled.div`
  padding-top: ${SECTION_PADDINGS.padding_y_desktop};
  padding-bottom: ${SECTION_PADDINGS.padding_y_desktop};
  padding-left: ${SECTION_PADDINGS.padding_x_desktop};
  padding-right: ${SECTION_PADDINGS.padding_x_desktop};

  @media (max-width: ${MEDIA_POINTS.TABLET}px) {
    padding-top: ${SECTION_PADDINGS.padding_y_tablet};
    padding-bottom: ${SECTION_PADDINGS.padding_y_tablet};
    padding-left: ${SECTION_PADDINGS.padding_x_tablet};
    padding-right: ${SECTION_PADDINGS.padding_x_tablet};
  }
`
export const IntroductionBlock = styled(SectionBlock)`
  padding-bottom: 0px;
  padding-top: 0;
  background: rgba(23, 25, 26, 1);
`
export const ContentWithoutXPaddings = styled.div`
  padding-top: 0;
  padding-bottom: 0;
  margin-left: -${SECTION_PADDINGS.padding_x_desktop};
  margin-right: -${SECTION_PADDINGS.padding_x_desktop};

  @media (max-width: ${MEDIA_POINTS.TABLET}px) {
    margin-left: -${SECTION_PADDINGS.padding_x_tablet};
    margin-right: -${SECTION_PADDINGS.padding_x_tablet};
  }
`
export const ContentWithXPaddings = styled.div`
  padding-top: 0;
  padding-bottom: 0;
  margin-left: ${SECTION_PADDINGS.padding_x_desktop};
  margin-right: ${SECTION_PADDINGS.padding_x_desktop};

  @media (max-width: ${MEDIA_POINTS.TABLET}px) {
    padding-left: ${SECTION_PADDINGS.padding_x_tablet};
    padding-right: ${SECTION_PADDINGS.padding_x_tablet};
  }
`
export const DataInfoBlock = styled(SectionBlock)`
  background: rgba(23, 25, 26, 1);
  background: rgba(159, 166, 167, 1);
`
export const CalculatorInstructionBlock = styled(SectionBlock)`
  background: rgba(23, 25, 26, 1);
`
export const CalculationsInfoBlock = styled(SectionBlock)`
  background: rgba(159, 166, 167, 1);
`
export const PostsBlock = styled(SectionBlock)`
  background: rgba(23, 25, 26, 1);
`

/* ======= lists & specific cards ======= */

/* Шаги заполнения */
export const StepCard = styled(BaseCard)``

/* Как считаем */
export const CalculationStepsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${LISTS_GAP.desktop};
  margin: 1.25rem 0 2rem;
  @media (max-width: ${MEDIA_POINTS.DESKTOP_SMALL}px) {
    grid-template-columns: 1fr;
  }

  @media (max-width: ${MEDIA_POINTS.TABLET}px) {
    grid-template-columns: repeat(2, 1fr);
    gap: ${LISTS_GAP.tablet};
  }

  @media (max-width: ${MEDIA_POINTS.TABLET_SMALL}px) {
    grid-template-columns: 1fr;
    gap: ${LISTS_GAP.sm_tablet};
  }
`
export const CalculationCard = styled(BaseCard)``

export const PostsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 20px;
`

/* — Специальная карточка калькулятора — */
export const CalculatorCard = styled(GlassCardRoot)`
  position: relative;
  width: clamp(340px, 75cqw, 560px);
  border-radius: 16px;
  padding: 18px 18px 14px;
  ${cardBorderVar(false)}
  backdrop-filter: blur(60px);
  -webkit-backdrop-filter: blur(60px);

  @media (max-width: ${MEDIA_POINTS.DESKTOP_SMALL}px) {
    width: 100%;
  }

  @media (max-width: ${MEDIA_POINTS.TABLET}px) {
    width: 85%;
  }

  @media (max-width: ${MEDIA_POINTS.TABLET_SMALL}px) {
    width: 100%;
  }
`

export const CardHeader = styled.div`
  display: grid;
  gap: 6px;
  padding: 2px 4px 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
`

export const CardTitle = styled.h2`
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 0.2px;
  color: rgba(255, 255, 255, 1);
`

export const CardHint = styled.div`
  color: rgba(255, 255, 255, 0.6);
  font-size: 12px;
  line-height: 1.3;
`

export const CardBody = styled.div`
  padding: 14px 4px 4px;
  & > *:last-child {
    margin-bottom: 6px;
  }
`

export const CardFooter = styled.div`
  margin-top: 10px;
  padding: 10px 4px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
`

export const FooterNote = styled.div`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.55);
`
