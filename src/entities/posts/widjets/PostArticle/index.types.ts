import { IPost } from '../../types/post.types'

export interface PostArticleProps {
  post: IPost
  /** можно подмешать свои remark/rehype плагины при желании */
  extraRemarkPlugins?: any []
  extraRehypePlugins?: any []
  /** если cover нужен как декоративный — alt пустой (по умолчанию) */
  coverAlt?: string
}
