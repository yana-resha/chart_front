import { Tag } from 'react-konva'

import { estimatePostReadingTime } from '@/entities/posts/helpers/estimatePostReadingTime'
import { formatePostDate } from '@/entities/posts/helpers/formatePostDate'
import { IPost } from '@/entities/posts/types/post.types'
import { MetaRowWrap } from './index.linaria'
import { TagCloud } from '../index.linaria'

export function MetaRow({ post }: { post: IPost }) {
  const reading = estimatePostReadingTime(post.content)

  return (
    <MetaRowWrap>
      <time dateTime={post.createdAt}>{formatePostDate(post.createdAt)}</time>
      <span>•</span>
      <span>{reading}</span>
      {post.tags?.length ? (
        <>
          <span>•</span>
          <TagCloud>
            {post.tags.map((t) => (
              <Tag
                key={t}
                size="md"
              >
                {t}
              </Tag>
            ))}
          </TagCloud>
        </>
      ) : null}
    </MetaRowWrap>
  )
}
