import { HTMLAttributes, MouseEvent, ReactNode } from 'react'

import { LinkProps } from 'react-router-dom'

export type TagSize = 'sm' | 'md'
export type TagVariant = 'default' | 'muted' | 'accent'

export interface BaseTagProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode
  size?: TagSize
  variant?: TagVariant
  /** добавлять ли # перед текстом */
  withHash?: boolean
  /** состояние выбора (можно подсветить) */
  selected?: boolean
  /** доступность: aria-label на всю пилюлю */
  ariaLabel?: string
}

/** Как ссылка (react-router) */
export interface TagLinkProps extends BaseTagProps {
  as?: 'link'
  to: LinkProps['to']
  onClick?: never
}

/** Как кнопка */
export interface TagButtonProps extends BaseTagProps {
  as?: 'button'
  onClick: (e: MouseEvent<HTMLButtonElement>) => void
  to?: never
}

/** Как просто span */
export interface TagSpanProps extends BaseTagProps {
  as?: 'span'
  to?: never
  onClick?: never
}

export type TagProps = TagLinkProps | TagButtonProps | TagSpanProps
