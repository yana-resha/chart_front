import { styled } from '@linaria/react'
import { CardCaption, CardTitle, TEXT_COLORS } from '../../index.linaria'

export const AdvantagesSection = styled.section`
  width: 100%;
  min-height: 700px;
  overflow: hidden;
  background: rgba(240, 242, 245, 0.1);
  background: rgba(0, 0, 0, 0.3);
  /* background:
    radial-gradient(1200px 600px at 50% 10%, rgba(160, 200, 255, 0.08), transparent 60%),
    radial-gradient(1000px 500px at 80% 0%, rgba(255, 255, 255, 0.08), transparent 60%),
    linear-gradient(180deg, #1a2127, #0e1114);

  background: rgba(0, 0, 0, 0.3); */
`

export const Heading = styled.h2`
  font-size: 36px;
  font-weight: 800;
  letter-spacing: 0.01em;
  margin: 0 0 12px;
  color: rgba(17, 17, 17, 0.92);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.06); /* тонкая подсветка */
`

export const Subhead = styled.p`
  font-size: 16px;
  color: rgba(17, 17, 17, 0.85);
  margin: 0 0 40px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
`

export const Grid = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(4, minmax(0, 1fr));

  @media (max-width: 1000px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`

export const Card = styled.article`
  border-radius: 14px; /* без огромных скруглений */
  padding: 20px 18px;
  text-align: left; /* выровняем по левому, “продуктово” */
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.06); /* лёгкая тень, без размазывания */
  transition:
    transform 0.16s ease,
    box-shadow 0.16s ease,
    border-color 0.16s ease;
  outline: none;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
  }
  &:focus-visible {
    border-color: rgba(0, 180, 216, 0.6);
    box-shadow:
      0 0 0 3px rgba(0, 180, 216, 0.18),
      0 10px 22px rgba(0, 0, 0, 0.12);
  }
`

export const Icon = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 10px;
  display: grid;
  place-items: center;
  margin-bottom: 14px;
  background: #f6fbff; /* нейтральная подложка */
  border: 1px solid #d9eef7;

  & > svg {
    width: 22px;
    height: 22px;
    stroke: #0e7490;
    fill: none;
    stroke-width: 1.6;
  }
`

export const AdvantageCardTitle = styled(CardTitle)`
  margin: 0 0 6px;
  color: ${TEXT_COLORS.DARK_TITLE_COLOR};
`

export const CardText = styled(CardCaption)`
  margin: 0;
  color: ${TEXT_COLORS.DARK_SUBTITLE_COLOR};
`
