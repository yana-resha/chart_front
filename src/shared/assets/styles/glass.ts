import { styled } from '@linaria/react'

interface CardProps {
  /** RGB без альфы: "255, 255, 255" */
  color?: string
  /** включить/выключить бордер */
  border?: boolean
  /** включить/выключить hover */
  hover?: boolean
}

/** CSS-переменные */
export const CARD_COLOR_VAR = '--card-color'
export const CARD_BORDER_VAR = '--card-border'
export const CARD_HOVER_VAR = '--card-hover'

/** Установить var с цветом */
export const cardColorVar = (rgb: string) => `${CARD_COLOR_VAR}: ${rgb};`

/** Установить var для бордера (1 = включен, 0 = выключен) */
export const cardBorderVar = (on: boolean) => `${CARD_BORDER_VAR}: ${on ? 1 : 0};`

/** Установить var для hover (1 = включен, 0 = выключен) */
export const cardHoverVar = (on: boolean) => `${CARD_HOVER_VAR}: ${on ? 1 : 0};`

/** Дефолтные значения */
export const CARD_DEFAULT_COLOR = '255, 255, 255'

/** Фон стекла */
export const glassBackground = () => `
  background: rgba(var(${CARD_COLOR_VAR}, ${CARD_DEFAULT_COLOR}), 0.04);
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
`

/** Градиентная рамка (::before), включается если --card-border=1 */
export const glassBorder = () => `
  border: 1px solid transparent;
  background-clip: padding-box;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    padding: 1px;
    background: linear-gradient(
      135deg,
      rgba(var(${CARD_COLOR_VAR}, ${CARD_DEFAULT_COLOR}), 0.4),
      rgba(var(${CARD_COLOR_VAR}, ${CARD_DEFAULT_COLOR}), 0.05)
    );
    -webkit-mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
            mask-composite: exclude;
    pointer-events: none;

    opacity: var(${CARD_BORDER_VAR}, 1);
  }
`
/** Градиент по одной стороне (::after) */
export type BorderSide = 'top' | 'right' | 'bottom' | 'left'

export const glassBorderSide = (side: BorderSide, color?: string, thickness: number = 1) => {
  const col = color
    ? (alpha: number) => `rgba(${color}, ${alpha})`
    : (alpha: number) => `rgba(var(${CARD_COLOR_VAR}, ${CARD_DEFAULT_COLOR}), ${alpha})`

  const edge =
    side === 'top'
      ? `top:0; left:0; right:0; height:${thickness}px; border-top-left-radius:inherit; border-top-right-radius:inherit;`
      : side === 'bottom'
        ? `bottom:0; left:0; right:0; height:${thickness}px; border-bottom-left-radius:inherit; border-bottom-right-radius:inherit;`
        : side === 'left'
          ? `top:0; bottom:0; left:0; width:${thickness}px; border-top-left-radius:inherit; border-bottom-left-radius:inherit;`
          : /* right */ `top:0; bottom:0; right:0; width:${thickness}px; border-top-right-radius:inherit; border-bottom-right-radius:inherit;`

  return `
    border-${side}: 1px solid transparent;
    background-clip: padding-box;

    &::after {
      content: '';
      position: absolute;
      ${edge}
      background: linear-gradient(
        135deg,
        ${col(0.4)},
        ${col(0.05)}
      );
      pointer-events: none;
    }
  `
}

export const glassShadow = (color?: string) =>
  `box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3), inset 0 0 1px ${color ? `rgba(${color}, 0.2)` : `rgba(var(${CARD_COLOR_VAR}, ${CARD_DEFAULT_COLOR}), 0.2)`}`
/** Карточка */
export const GlassCardRoot = styled.div<CardProps>`
  ${CARD_COLOR_VAR}: ${({ color }) => color ?? CARD_DEFAULT_COLOR};
  ${CARD_BORDER_VAR}: ${({ border = true }) => (border ? 1 : 0)};
  ${CARD_HOVER_VAR}: ${({ hover = true }) => (hover ? 1 : 0)};

  position: relative;
  isolation: isolate;
  border-radius: 20px;

  ${glassBackground()};
  ${glassBorder()};
  ${glassShadow()};

  transition:
    background 0.25s ease,
    box-shadow 0.25s ease;

/*   &:hover {
    background: ${({ color }) => (color ? 'rgba(${color}, 0.08)' : `rgba(var(${CARD_COLOR_VAR}), 0.08)`)};
    box-shadow: 0 6px 40px rgba(0, 0, 0, 0.35);
  } */
`
