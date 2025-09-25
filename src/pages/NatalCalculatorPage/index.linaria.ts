import { styled } from '@linaria/react'

import {
  cardBorderVar,
  cardColorVar,
  glassBorder,
  glassBorderSide,
  GlassCardRoot,
} from '@/shared/assets/styles/glass'
import { addAlpha } from '@/shared/assets/styles/helpers/addAlpha'
import { MEDIA_POINTS } from '@/shared/assets/styles/media-points'
import { PageContentWrapper } from '@/shared/assets/styles/pages.linaria'
import { CARD_TEXT_SIZE, CARD_TITLE_TEXT, TEXT_SIZE } from '@/shared/assets/styles/text-size'
import { H1 } from '@/shared/assets/styles/titles.linaria'

const LISTS_GAP = {
  desktop: '1.25rem',
  tablet: '0.8rem',
  sm_tablet: '1.25rem',
}

export const PageWrapper = styled(PageContentWrapper)`
  padding-left: 1rem;
  padding-right: 1rem;

  @media (max-width: ${MEDIA_POINTS.TABLET}px) {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }
`

export const MainTitle = styled(H1)``

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

/** Обёртка под иконку слева в заголовке */
export const CardIcon = styled.div`
  flex-shrink: 0;
  width: clamp(20px, 2.2vw, 24px);
  height: clamp(20px, 2.2vw, 24px);

  svg,
  img {
    width: 100%;
    height: 100%;
    display: block;
  }

  @media (max-width: ${MEDIA_POINTS.TABLET}px) {
    width: clamp(18px, 2vw, 22px);
    height: clamp(18px, 2vw, 22px);
  }
`

/** Тонкая линия внутри карточек */
export const CardDivider = styled.div`
  height: 1px;
  position: relative;
  ${glassBorderSide('bottom')};
`

export const BenefitCard = styled.li<{ color: string }>`
  ${cardColorVar('255, 255, 0')};
  ${glassBorder()};
  position: relative;
  border-radius: 12px;
  border-radius: 0px;
  padding: 0.75rem 1.25rem 1.25rem;

  background: linear-gradient(135deg, ${(p) => addAlpha(p.color, 0.5)}, rgba(0, 0, 0, 0));
  color: rgba(255, 255, 255, 0.95);
  transition:
    all 0.25s ease,
    transform 0.25s ease;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.4rem;
  text-align: left;

  &:hover {
    background: linear-gradient(135deg, ${(p) => addAlpha(p.color, 0.22)}, rgba(255, 255, 255, 0.04));
    box-shadow: 0 8px 22px rgba(0, 0, 0, 0.25);
    transform: translateY(-1px);
  }

  .title {
    font-weight: 500;
    font-size: ${CARD_TITLE_TEXT.S};
    line-height: 1.25;
    color: ${(p) => p.color};
  }

  @media (max-width: ${MEDIA_POINTS.TABLET}px) {
    padding: 0.5rem 1rem 1rem;
    .title {
      font-size: ${CARD_TITLE_TEXT.XS};
    }
  }
`
export const BenefitGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${LISTS_GAP.desktop};
  margin: 1.25rem 0 1.75rem;

  @media (max-width: ${MEDIA_POINTS.DESKTOP_SMALL}px) {
    gap: ${LISTS_GAP.tablet};
  }
`
export const InstructionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${LISTS_GAP.desktop};
  margin: 1.25rem 0 1.75rem;

  @media (max-width: ${MEDIA_POINTS.DESKTOP_SMALL}px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${MEDIA_POINTS.TABLET}px) {
    grid-template-columns: repeat(3, 1fr);
    gap: ${LISTS_GAP.tablet};
  }

  @media (max-width: ${MEDIA_POINTS.TABLET_SMALL}px) {
    grid-template-columns: 1fr;
    gap: ${LISTS_GAP.sm_tablet};
  }
`

export const InstructionDesc = styled(DescText)`
  min-height: 60px;
`

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

/** Кружок-номер для шагов/этапов */
export const Badge = styled.span`
  flex-shrink: 0;
  width: 26px;
  height: 26px;
  border-radius: 50%;

  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 0.85rem;
  line-height: 0;
  font-weight: 600;
  color: #fff;

  @media (max-width: ${MEDIA_POINTS.DESKTOP_SMALL}px) {
    width: 22px;
    height: 22px;
    font-size: 0.75rem;
    font-weight: 500;
  }
`

/* ======= common blocks ======= */
export const Divider = styled.div`
  height: 1px;
  position: relative;
  width: 100%;
  ${glassBorderSide('bottom')};
`

export const SectionBlock = styled.div`
  padding-top: 1.875rem;
  padding-bottom: 1.875rem;

  @media (max-width: ${MEDIA_POINTS.TABLET}px) {
    padding-top: 1rem;
    padding-bottom: 1rem;
  }
`
/* ======= page layout & text ======= */
export const Layout = styled.section`
  height: 100%;
  width: 100%;
  max-width: 100%;
  position: relative;
`

export const MarkdownText = styled.div`
  color: rgba(255, 255, 255, 0.95);
  font-size: ${TEXT_SIZE.M};
  line-height: 1.7;
  width: 100%;

  @media (max-width: ${MEDIA_POINTS.TABLET}px) {
    font-size: ${TEXT_SIZE.S};
  }

  p {
    margin-bottom: 0.5rem;
  }
  code {
    background: rgba(255, 255, 255, 0.08);
    padding: 0.15em 0.35em;
    border-radius: 4px;
    font-size: 0.95em;
  }
  strong {
    font-weight: 600;
    font-size: 110%;
  }
`

export const FormWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 25px;
  padding-bottom: 30px;
  container-type: inline-size;

  @media (max-width: ${MEDIA_POINTS.DESKTOP_SMALL}px) {
    padding-top: 10px;
    padding-bottom: 20px;
  }
`

/* ======= cards ======= */
export const BaseCard = styled(GlassCardRoot)`
  border-radius: 14px;
  color: rgba(255, 255, 255, 0.95);
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1rem;
  padding-top: 0.7rem;
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

/* ======= sections ======= */
export const IntroductionBlock = styled(SectionBlock)`
  padding-top: 0px;
  & ${Divider} {
    margin: 1rem 0;

    @media (max-width: ${MEDIA_POINTS.TABLET}px) {
      margin: 0.7rem 0;
    }
  }
`
export const DataInfoBlock = styled(SectionBlock)``
export const CalculatorInstructionBlock = styled(SectionBlock)``
export const CalculationsInfoBlock = styled(SectionBlock)``
export const PostsBlock = styled(SectionBlock)``

/* ======= lists & specific cards ======= */

/* Инструкция */
export const InstructionCard = styled(BaseCard)``

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
