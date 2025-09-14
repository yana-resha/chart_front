import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import remarkDirective from 'remark-directive'
import remarkGfm from 'remark-gfm'
import { visit } from 'unist-util-visit'

import { MetaRowWrap, Article, Cover, Separator, TagCloud } from './index.linaria'
import { PostArticleProps } from './index.types'
import { markdownComponents, Prose } from './Prose'
import { estimatePostReadingTime } from '../../helpers/estimatePostReadingTime'
import { formatePostDate } from '../../helpers/formatePostDate'
import Tag from '../../ui/Tag'
import type { IPost } from '@/entities/posts/types/post.types'
import { H1 } from '@/shared/assets/styles/titles.linaria'
import { ImageReveal } from '@/shared/components/ImageReveal'

function remarkImgDirective() {
  return (tree: any) => {
    visit(tree, (node: any) => {
      if (node.type === 'leafDirective' && node.name === 'img') {
        const attrs = node.attributes || {}
        const src = attrs.src || ''
        const alt = attrs.alt || ''
        const align = attrs.align === 'left' ? 'left' : 'right'
        const width = attrs.width || '44%'
        const caption = attrs.caption ? `<figcaption>${attrs.caption}</figcaption>` : ''
        const html = `<figure class="wrap-${align}" style="max-width:${width}"><img src="${src}" alt="${alt}"/>${caption}</figure>`
        node.type = 'html'
        node.value = html
        node.children = []
      }
    })
  }
}

function MetaRow({ post }: { post: IPost }) {
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
              style: { borderRadius: 24, height: 'clamp(260px, 45vh, 440px)' },
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
          remarkPlugins={[remarkGfm, remarkDirective, remarkImgDirective]}
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
