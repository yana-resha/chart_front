import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'

export type TKind = 'gradient' | 'outline' | 'text' | 'ghost'
export type TTheme = 'primary' | 'secondary'
export type TSize = 'small' | 'medium' | 'large'

type AsProp<C extends ElementType> = { as?: C }

type PolymorphicProps<C extends ElementType, OwnProps> = OwnProps &
  AsProp<C> &
  Omit<ComponentPropsWithoutRef<C>, keyof OwnProps | 'as'>

type ButtonOwnProps = {
  kind?: TKind
  theme?: TTheme
  size?: TSize
  roundedCorner?: boolean
  children?: ReactNode
  isLoading?: boolean
  className?: string
}

export type ButtonProps<C extends ElementType = 'button'> = PolymorphicProps<C, ButtonOwnProps>
