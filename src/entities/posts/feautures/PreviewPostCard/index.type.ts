import { HTMLAttributes } from 'react'

import type { IPostPreview } from '@/entities/posts/types/post.types'

export interface IPreviewPostCardProps extends HTMLAttributes<HTMLDivElement> {
  post: IPostPreview
  /** базовый путь для ссылки — по умолчанию '/posts' */
  basePath?: string
  /** текст кнопки */
  ctaText?: string
  /** показывать дату */
  showDate?: boolean
  /** показывать теги */
  showTags?: boolean
  /** alt для изображения (по умолчанию = title) */
  imageAltOverride?: string
}
