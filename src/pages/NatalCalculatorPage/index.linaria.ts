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

export const Divider = styled.div`
  height: 1px;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.07) 0%,
    rgba(255, 255, 255, 0.35) 50%,
    rgba(255, 255, 255, 0.07) 100%
  );
  box-shadow: 0 0 6px rgba(255, 255, 255, 0.15);
  width: 100%;
`

export const MarkdownText = styled.div`
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

export const FormWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 25px;
  padding-bottom: 30px;
  container-type: inline-size;
`

export const CalculatorCard = styled.div`
  position: relative;
  width: clamp(340px, 75cqw, 560px);
  border-radius: 16px;
  padding: 18px 18px 14px;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02)), rgba(16, 18, 22, 0.65);
  border: 1px solid rgba(255, 255, 255, 0.06);
  box-shadow:
    0 10px 30px rgba(0, 0, 0, 0.45),
    inset 0 1px 0 rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
  transition:
    box-shadow 0.2s ease,
    transform 0.2s ease;

  &:hover {
    box-shadow:
      0 14px 40px rgba(255, 255, 255, 0.05),
      inset 0 1px 0 rgba(255, 255, 255, 0.04);
  }

  @container (min-width: 520px) {
    padding: 22px 22px 16px;
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
`

export const CardHint = styled.div`
  color: rgba(255, 255, 255, 0.6);
  font-size: 12px;
  line-height: 1.3;
`

export const CardBody = styled.div`
  padding: 14px 4px 4px;
  /* чтобы кнопка/итог внутри формы не липли к краю */
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

export const IntroductionBlock = styled.div`
  padding-bottom: 30px;

  & ${Divider} {
    margin: 1rem 0;
  }
`

export const DataInfoBlock = styled.div`
  padding-top: 30px;
  padding-bottom: 30px;
`

export const CalculatorInstructionBlock = styled.div`
  padding-top: 30px;
  padding-bottom: 30px;
`

export const CalculationsInfoBlock = styled.div`
  padding-top: 30px;
  padding-bottom: 30px;
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
  padding: 0.75rem 1.25rem 1.25rem 1.25rem;
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

export const InstructionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
  margin: 1.25rem 0 1.75rem;
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`
export const InstructionCard = styled.div`
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.01) 70%);
  border-radius: 14px;
  padding: 1rem 1.1rem;
  color: rgba(255, 255, 255, 0.95);

  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  transition:
    background 0.25s ease,
    border-color 0.25s ease,
    box-shadow 0.25s ease,
    transform 0.25s ease;

  &:hover {
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.04), rgba(255, 255, 255, 0.02) 70%);
    border-color: rgba(255, 255, 255, 0.18);
    box-shadow: 0 8px 22px rgba(255, 255, 255, 0.02);
    transform: translateY(-1px);
  }

  .title {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    font-weight: 500;
    font-size: 1rem;
    line-height: 1.35;

    .icon {
      flex-shrink: 0;
      width: 24px;
      height: 24px;

      svg,
      img {
        width: 100%;
        height: 100%;
        display: block;
        filter: drop-shadow(0 0 3px rgba(255, 255, 255, 0.35)) drop-shadow(0 0 6px rgba(255, 255, 255, 0.25));
        -webkit-filter: drop-shadow(0 0 3px rgba(255, 255, 255, 0.35))
          drop-shadow(0 0 6px rgba(255, 255, 255, 0.25));
      }
    }
  }

  .divider {
    height: 1px;
    background: rgba(255, 255, 255, 0.15);
    box-shadow: 0 0 4px rgba(255, 255, 255, 0.15);
  }

  .desc {
    font-size: 0.92rem;
    line-height: 1.45;
    opacity: 0.9;
  }
`

export const StepsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem 1.25rem;
  margin: 1rem 0 2.5rem;

  @media (max-width: 920px) {
    grid-template-columns: 1fr;
  }
`

export const StepCard = styled.div`
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.01) 70%);
  border-radius: 14px;
  padding: 1rem 1.1rem;
  color: rgba(255, 255, 255, 0.95);

  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  transition:
    background 0.25s ease,
    border-color 0.25s ease,
    box-shadow 0.25s ease,
    transform 0.25s ease;

  &:hover {
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.04), rgba(255, 255, 255, 0.02) 70%);
    border-color: rgba(255, 255, 255, 0.18);
    box-shadow: 0 8px 22px rgba(255, 255, 255, 0.02);
    transform: translateY(-1px);
  }

  .title {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 500;
    font-size: 1rem;
    line-height: 1.35;
  }

  .badge {
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
    font-weight: 600;
    color: #fff;
    box-shadow: 0 0 6px rgba(255, 255 255, 0.4);
  }

  .divider {
    height: 1px;
    background: rgba(255, 255, 255, 0.15);
    box-shadow: 0 0 4px rgba(255, 255, 255, 0.15);
  }

  .desc {
    font-size: 0.92rem;
    line-height: 1.45;
    opacity: 0.9;
  }
`

export const Tip = styled.div`
  border: 1px solid rgba(255, 209, 102, 0.4);
  background: rgba(255, 209, 102, 0.08);
  border-radius: 10px;
  padding: 0.75rem 0.9rem;
  font-size: 0.9rem;
  line-height: 1.45;
  color: rgba(255, 255, 255, 0.95);
  box-shadow: 0 0 8px rgba(255, 209, 102, 0.15);

  transition: all 0.25s ease;

  &:hover {
    background: ${addAlpha('#ffd166', 0.12)};
    border-color: ${addAlpha('#ffd166', 0.55)};
    box-shadow: 0 0 10px ${addAlpha('#ffd166', 0.25)};
    transform: translateY(-1px);
  }
`

export const CalculationStepsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem 1.25rem;
  margin: 1.25rem 0 2rem;

  @media (max-width: 920px) {
    grid-template-columns: 1fr;
  }
`

export const CalculationCard = styled.div`
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.01) 70%);
  border-radius: 14px;
  padding: 1rem 1.1rem;
  color: rgba(255, 255, 255, 0.95);
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  transition:
    background 0.25s ease,
    border-color 0.25s ease,
    box-shadow 0.25s ease,
    transform 0.25s ease;

  &:hover {
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.04), rgba(255, 255, 255, 0.02) 70%);
    border-color: rgba(255, 255, 255, 0.18);
    box-shadow: 0 8px 22px rgba(255, 255, 255, 0.02);
    transform: translateY(-1px);
  }

  .title {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 500;
    font-size: 1rem;
    line-height: 1.35;
  }

  .badge {
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
    font-weight: 600;
    color: #fff;
    box-shadow: 0 0 6px rgba(255, 255, 255, 0.4);
  }

  .divider {
    height: 1px;
    background: rgba(255, 255, 255, 0.15);
    box-shadow: 0 0 4px rgba(255, 255, 255, 0.15);
  }

  .desc {
    font-size: 0.92rem;
    line-height: 1.45;
    opacity: 0.9;
  }

  .term {
    font-weight: 500;
    font-style: italic;
    /* color: rgb(72 178 182) !important; */
    color: rgb(4, 187, 209) !important;
    /* color: ${TEXT_COLOR_VARIABLES.BRIGHT_TEXT}!important; */
    cursor: pointer;
  }
`
