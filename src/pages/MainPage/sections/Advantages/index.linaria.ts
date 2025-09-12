import { styled } from '@linaria/react'

import { CardCaption, CardTitle } from '../../index.linaria'

interface CardProps {
  gradientFrom: string
  gradientTo: string
  patternUrl: string
  patternOpacity?: number
  align?: 'left' | 'center'
}

export const AdvantagesSection = styled.section`
  position: relative;
  width: 100%;
  overflow: hidden;
  background: rgba(240, 242, 245, 0.1);
  background: rgba(0, 0, 0, 0.3);
`

export const Grid = styled.ul`
  list-style: none;
  padding: 0;
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  @media (max-width: 1000px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`

export const AdvantagesCardOverlay = styled.span`
  position: absolute;
  inset: 0;
  z-index: 1;
  background:
    /* лёгкая сетка */
    radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.03) 0 2px, transparent 2px),
    radial-gradient(circle at 70% 70%, rgba(255, 255, 255, 0.025) 0 1px, transparent 1px),
    /* затемнение снизу для текста */
      linear-gradient(180deg, rgba(255, 255, 255, 0) 55%, rgba(0, 0, 0, 0.4) 100%);
  background-size:
    120px 120px,
    200px 200px,
    auto;
  background-repeat: repeat, repeat, no-repeat;
  transition: opacity 0.3s;
`

export const Card = styled.li<CardProps>`
  /* переменные */
  --from: ${({ gradientFrom }) => gradientFrom};
  --to: ${({ gradientTo }) => gradientTo};
  --patternOpacity: ${({ patternOpacity = 0.5 }) => patternOpacity};

  position: relative;
  overflow: hidden;
  border-radius: 14px; /* как в Possibilities */
  outline: 1px solid rgba(255, 255, 255, 0.06);

  transform: translateZ(0);
  transition:
    outline-color 300ms ease,
    box-shadow 300ms ease,
    transform 300ms ease;

  /* полупрозрачный ГРАДИЕНТ-слой (как фон постера) */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: linear-gradient(135deg, var(--from) 0%, var(--to) 100%);
    opacity: 0.8;
    transition: opacity 300ms ease;
    z-index: 0;
    pointer-events: none;
  }

  /* ПАТТЕРН поверх градиента (чуть крупнее, как постер-изображение) */
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: ${({ patternUrl }) => `url(${patternUrl}) center/cover no-repeat`};
    opacity: var(--patternOpacity);
    mix-blend-mode: screen;
    z-index: 0; /* тот же слой, что и ::before */
    pointer-events: none;
    transition: transform 500ms ease;
  }

  /* бликовая полоса — оставляем */
  & > .glare {
    position: absolute;
    inset: -40%;
    background: linear-gradient(
      60deg,
      rgba(255, 255, 255, 0) 30%,
      rgba(255, 255, 255, 0.22) 45%,
      rgba(255, 255, 255, 0) 60%
    );
    transform: translateX(-60%);
    filter: blur(2px);
    transition: transform 0.8s cubic-bezier(0.22, 0.61, 0.36, 1);
    z-index: 1;
    pointer-events: none;
  }

  /* Текст/иконка — поверх фоновых слоёв */
  > *:not(.glare):not(.card-overlay) {
    position: relative;
    z-index: 2;
  }

  /* HOVER как в Possibilities: outline чуть ярче, подъём и мягкий цветной glow */
  &:hover {
    outline-color: rgba(255, 255, 255, 0.12);
    transform: translateY(-2px);
    box-shadow:
      0 0 0 1px rgba(255, 255, 255, 0.06) inset,
      0 10px 24px rgba(0, 0, 0, 0.35),
      0 0 16px color-mix(in srgb, var(--to) 80%, transparent); /* цветное свечение */
  }

  /* при наведении «фон становится ярче» */
  &:hover::before {
    opacity: 0.95;
  }

  /* лёгкий сдвиг блика */
  &:hover > .glare {
    transform: translateX(40%);
  }

  @media (prefers-reduced-motion: reduce) {
    transition:
      outline-color 200ms ease,
      box-shadow 200ms ease;
    &:hover {
      transform: none;
      box-shadow: 0 10px 24px rgba(0, 0, 0, 0.35);
    }
    &:hover::before {
      opacity: 0.64;
    }
    &:hover > .glare {
      transform: none;
    }
  }
`

/* ИКОНКА: по центру сверху, без подложки, только stroke */
export const Icon = styled.div`
  position: relative;
  display: grid;
  place-items: center;

  width: 56px;
  height: 56px;
  margin: 26px auto 14px;

  svg {
    width: 100%;
    height: 100%;
    stroke: #fff;
    fill: none;
    stroke-width: 1.8;
    /* чуть-чуть «воздуха» над градиентом */
    filter: drop-shadow(0 1px 6px rgba(0, 0, 0, 0.25));
  }
`

export const CardContent = styled.div<Pick<CardProps, 'align'>>`
  position: relative;
  height: 100%;
  display: grid;
  align-content: start;
  padding: 0 18px 24px;
  z-index: 1;

  text-align: ${({ align }) => (align === 'center' ? 'center' : 'left')};

  @media (max-width: 720px) {
    text-align: center;
    padding: 0 16px 20px;
  }
`

/* крупный, плотный заголовок */
export const AdvantageCardTitle = styled(CardTitle)`
  margin: 0 0 8px;
`

/* компактный подзаголовок */
export const CardText = styled(CardCaption)`
  margin: 0;
`
