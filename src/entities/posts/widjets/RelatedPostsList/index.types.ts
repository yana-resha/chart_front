import { HTMLAttributes } from 'react'

import { IPostPreview } from '@/entities/posts/types/post.types'

export interface RelatedListProps extends HTMLAttributes<HTMLElement> {
  /** исключить текущий пост */
  excludeSlug?: string
  /** сколько показать карточек */
  limit?: number
  /** только избранные (имеется ввиду для главной страницы) */
  onlyFeatured?: boolean
  /** Источник данных (по умолчанию PREVIEWS) */
  items?: IPostPreview[]
}
