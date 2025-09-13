export interface IPostPreview {
  slug: string
  title: string
  createdAt: string

  preview: string // картинка карточки (для списка/главной)
  tags?: string[]
  excerpt: string
  featured?: boolean
  isDraft?: boolean
}

export interface IPost extends IPostPreview {
  cover: string // большая обложка (для детальной)
  content: string
}
