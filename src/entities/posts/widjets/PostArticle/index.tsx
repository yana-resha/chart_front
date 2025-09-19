import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import remarkDirective from 'remark-directive'
import remarkGfm from 'remark-gfm'

import { Article, Cover, Separator, TagCloud } from './index.linaria'
import { PostArticleProps } from './index.types'
import { MetaRow } from './MetaRow'
import { markdownComponents, Prose } from './Prose'
import { remarkPostImgDirective } from '../../helpers/remarkPostImgDirective'
import { remarkPostLinkDirective } from '../../helpers/remarkPostLinkDirective'
import Tag from '../../ui/Tag'
import { H1 } from '@/shared/assets/styles/titles.linaria'
import { ImageReveal } from '@/shared/components/ImageReveal'

export function PostArticle({ post, coverAlt = '' }: PostArticleProps) {
  return (
    <Article>
      <header>
        <H1 style={{ textAlign: 'left' }}>{post.title}</H1>
        <MetaRow post={post} />
      </header>

      {post.cover && (
        <Cover>
          <ImageReveal
            frameProps={{
              style: { borderRadius: 24, height: 'clamp(260px, 50vh, 440px)' },
            }}
            imgProps={{
              src: post.cover,
              alt: coverAlt, // сюда можно подставить title поста как fallback
              style: { objectFit: 'cover', height: '100%', width: '100%' },
            }}
          />
        </Cover>
      )}

      <Prose>
        <ReactMarkdown
          components={markdownComponents}
          remarkPlugins={[remarkGfm, remarkDirective, remarkPostLinkDirective, remarkPostImgDirective]}
          rehypePlugins={[rehypeRaw]}
        >
          {post.content}
        </ReactMarkdown>
      </Prose>

      <footer>
        <Separator />
        <TagCloud>
          {post.tags?.map((t) => (
            <Tag
              key={t}
              size="md"
            >
              {t}
            </Tag>
          ))}
        </TagCloud>
      </footer>
    </Article>
  )
}

export default PostArticle
