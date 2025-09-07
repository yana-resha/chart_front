import { styled } from '@linaria/react'

import { MEDIA_POINTS } from '@/shared/assets/styles/media-points'
import { CARD_TEXT_SIZE, CARD_TITLE_TEXT } from '@/shared/assets/styles/text-size'
import { addAlpha } from '@/shared/helpers/addAlpha'

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

export const Card = styled.div<{ color: string }>`
  flex: 1;
  border-radius: 8px;
  border: 1px solid ${(props) => addAlpha(props.color, 0.25)};
  background: linear-gradient(
    to bottom,
    ${(props) => addAlpha(props.color, 0.15)},
    ${(props) => addAlpha(props.color, 0.1)} 70%,
    rgba(255, 255, 255, 0.02) 100%
  );
  color: rgba(255, 255, 255, 0.85);
  padding: 0.8rem;
  transition: all 0.3s;

  &:hover {
    background: linear-gradient(
      to bottom,
      ${(props) => addAlpha(props.color, 0.25)},
      ${(props) => addAlpha(props.color, 0.15)} 70%,
      rgba(255, 255, 255, 0.04) 100%
    );
    border-color: ${(props) => addAlpha(props.color, 0.4)};
  }
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

export const Summary = styled.div`
  width: 100%;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.03));
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
