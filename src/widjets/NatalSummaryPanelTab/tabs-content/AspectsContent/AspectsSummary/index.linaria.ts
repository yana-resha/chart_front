import { styled } from '@linaria/react'

import { GlassCardRoot } from '@/shared/assets/styles/glass'
import { MEDIA_POINTS } from '@/shared/assets/styles/media-points'
import { CARD_TEXT_SIZE, CARD_TITLE_TEXT } from '@/shared/assets/styles/text-size'

export const Wrapper = styled.div`
  container-type: inline-size;
  container-name: summary;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  min-width: 0;
  padding: 1px;
`

export const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr; /* базово: одна колонка */
  gap: 1rem;

  /* чтобы дети нормально сжимались */
  & > * {
    min-width: 0;
  }

  @container summary (min-width: 540px) {
    grid-template-columns: 1fr 1fr 1fr; /* 2 колонки при ширине родителя ≥ 398px */
  }
`

export const Card = styled(GlassCardRoot)`
  flex: 1;
  border-radius: 8px;
  padding: 0.8rem;
  color: rgba(255, 255, 255, 0.85);
`

export const CardTitle = styled.h3`
  margin: 0 0 0.5rem 0;
  font-size: ${CARD_TITLE_TEXT.S};
  font-weight: 500;
  color: rgba(255, 255, 255, 1);

  @media (max-width: ${MEDIA_POINTS.TABLET_SMALL}px) {
    font-size: ${CARD_TITLE_TEXT.XS};
  }
`

export const CardText = styled.p`
  margin: 0.2rem 0;
  font-size: ${CARD_TEXT_SIZE.S};
  line-height: 1.4;
  color: rgba(255, 255, 255, 0.8);

  @media (max-width: ${MEDIA_POINTS.TABLET_SMALL}px) {
    font-size: ${CARD_TEXT_SIZE.XS};
  }
`

export const Summary = styled(GlassCardRoot)`
  width: 100%;
  border-radius: 8px;
  padding: 0.8rem;
`

export const SummaryLine = styled.p`
  margin: 0.3rem 0;
  font-size: ${CARD_TEXT_SIZE.S};
  line-height: 1.4;
  color: rgba(255, 255, 255, 0.8);

  @media (max-width: ${MEDIA_POINTS.TABLET_SMALL}px) {
    font-size: ${CARD_TEXT_SIZE.XS};
  }
`

export const Highlight = styled.span`
  color: rgb(22, 238, 246);
`
