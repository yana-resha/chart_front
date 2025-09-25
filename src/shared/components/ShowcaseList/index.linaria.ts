import { styled } from '@linaria/react'

export const TEXT_COLORS = {
  LIGHT_TITLE_COLOR: 'rgba(255, 255, 255, 0.92)',
  LIGHT_SUBTITLE_COLOR: 'rgba(255, 255, 255, 0.65)',
  DARK_TITLE_COLOR: 'rgba(17, 17, 17, 0.92)',
  DARK_SUBTITLE_COLOR: 'rgba(17, 17, 17, 0.85)',
}

type Variant = 'light' | 'dark'

/* Контейнер списка */
export const List = styled.div`
  display: flex;
  flex-direction: column;
`

/* Элемент */
export const Item = styled.div<{ variant?: Variant }>`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: stretch;
  min-height: 170px;

  border-bottom: 1px solid
    ${({ variant }) => (variant === 'dark' ? 'rgba(17, 17, 17, 1)' : 'rgba(255, 255, 255, 1)')};

  &:first-child {
    border-top: 1px solid
      ${({ variant }) => (variant === 'dark' ? 'rgba(17, 17, 17, 1)' : 'rgba(255, 255, 255, 1)')};
  }

  &:nth-child(even) {
    direction: rtl;

    & > * {
      direction: ltr;
    }
  }
`

/* Обёртка для картинки */
export const ImageWrapper = styled.div`
  position: relative;
  overflow: hidden;

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`

/* Контент */
export const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  height: 100%;
  padding: 1rem;
  @media (max-width: 720px) {
    padding: 1.25rem;
  }
`

/* Заголовок */
export const Title = styled.h3<{ variant?: Variant }>`
  font-size: 1rem;
  margin-bottom: 8px;
  font-weight: 500;
  letter-spacing: 0.2px;
  color: ${({ variant }) =>
    variant === 'dark' ? TEXT_COLORS.DARK_TITLE_COLOR : TEXT_COLORS.LIGHT_TITLE_COLOR};
  line-height: 1.2;
`

/* Текст */
export const Text = styled.p<{ variant?: Variant }>`
  font-size: 0.85rem;
  color: ${({ variant }) =>
    variant === 'dark' ? TEXT_COLORS.DARK_SUBTITLE_COLOR : TEXT_COLORS.LIGHT_SUBTITLE_COLOR};
  line-height: 1.35;
`
