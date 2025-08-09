import { styled } from '@linaria/react'

import { TEXT_COLOR_VARIABLES } from '@/shared/assets/styles/colors'
import { addAlpha } from '@/shared/helpers/addAlpha'

export const Layout = styled.section`
  color: rgba(255, 255, 255, 1);
  height: 100%;
  display: grid;
  grid-template-rows: auto 1fr;
  min-width: 0;
`

export const TopBlock = styled.div`
  margin-bottom: 50px;
`
export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  container-type: inline-size;
`

export const FormBlock = styled.div`
  width: clamp(350px, 76.19cqw, 500px);
`

export const MarkdownText = styled.div`
  margin-top: 1.25rem;
  color: rgba(255, 255, 255, 0.95);
  font-size: clamp(12px, 1rem, 18px);
  line-height: 1.7;
  width: 100%;

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
    color: ${TEXT_COLOR_VARIABLES.BRIGHT_TEXT};
  }
`

export const BenefitsList = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 2 карточки в ряд */
  gap: 1.5rem;
  margin: 2.5rem 0;
  padding: 0;
  list-style: none;

  @media (max-width: 768px) {
    grid-template-columns: 1fr; /* на мобилках по одной */
  }
`

export const BenefitCard = styled.li<{ color: string }>`
  position: relative;
  border-radius: 12px;
  padding: 1.25rem;
  border: 1px solid ${(props) => addAlpha(props.color, 0.25)};
  background: linear-gradient(135deg, ${(props) => addAlpha(props.color, 0.12)}, rgba(255, 255, 255, 0.02));
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
    background: linear-gradient(135deg, ${(props) => addAlpha(props.color, 0.22)}, rgba(255, 255, 255, 0.04));
    border-color: ${(props) => addAlpha(props.color, 0.4)};
    box-shadow: 0 8px 22px rgba(0, 0, 0, 0.25);
    transform: translateY(-1px); /* лёгкий подъём */
  }

  .title {
    font-weight: 500;
    font-size: 1.05rem;
    line-height: 1.25;
    color: ${(props) => props.color};
  }

  .desc {
    font-size: 0.9rem;
    line-height: 1.4;
    opacity: 0.88;
  }
`

export const Divider = styled.div`
  height: 1px;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.35) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  box-shadow: 0 0 6px rgba(255, 255, 255, 0.15);
  margin: 1rem 0;
  width: 100%;
`
