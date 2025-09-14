import { useEffect, useState } from 'react'

import ReactMarkdown from 'react-markdown'
import { useParams } from 'react-router-dom'
import rehypeRaw from 'rehype-raw'
import remarkDirective from 'remark-directive'
import remarkGfm from 'remark-gfm'
import { visit } from 'unist-util-visit'

import {
  Container,
  MetaRowWrap,
  Article,
  Cover,
  Prose,
  Separator,
  TagCloud,
  ContentWrapper,
  MetaRowTime,
} from './index.linaria'
import { getPostBySlug } from '@/entities/posts/data'
import type { IPost } from '@/entities/posts/types/post.types'
import Tag from '@/entities/posts/ui/Tag'
import RelatedPostsList from '@/entities/posts/widjets/RelatedPostsList'
import { SharedButton } from '@/features/SharedButton'
import { PageTitle, SectionTitle } from '@/shared/assets/styles/titles.linaria'
import { HeaderBackButton } from '@/shared/components/HeaderBackButton'
import { PageHeader } from '@/shared/components/PageHeader'

// utils
const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })

const estimateReadingTime = (markdown: string) => {
  const w = markdown.split(/\s+/).filter(Boolean).length

  return `${Math.max(1, Math.round(w / 220))} мин чтения`
}

// remark ::img{...}
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

// UI bits

function MetaRow({ post }: { post: IPost }) {
  const reading = estimateReadingTime(post.content)
  const iso = post.createdAt
  const human = formatDate(iso)

  return (
    <MetaRowWrap>
      <MetaRowTime dateTime={iso}>{human}</MetaRowTime>
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

export default function PostPage() {
  const { slug = '' } = useParams<{ slug: string }>()
  const [post, setPost] = useState<IPost | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setPost(null)

    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })

    getPostBySlug(slug).then((p) => {
      if (!cancelled) {
        setPost(p)
        setLoading(false)
      }
    })

    return () => {
      cancelled = true
    }
  }, [slug])

  useEffect(() => {
    if (post) document.title = `${post.title} — ASTRODOC`
  }, [post?.title])

  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''

  return (
    <Container>
      <PageHeader>
        <HeaderBackButton text="Смотреть все" />
        {post && (
          <SharedButton
            buttonText="Поделиться статьей"
            shareUrl={shareUrl}
            title={post.title}
          />
        )}
      </PageHeader>
      <ContentWrapper>
        {loading && <div style={{ padding: 24, color: 'rgba(255,255,255,.56)' }}>Загрузка…</div>}
        {!loading && !post && (
          <>
            <PageTitle style={{ textAlign: 'left' }}>Пост не найден</PageTitle>
            <p style={{ color: 'rgba(255,255,255,.56)' }}>Возможно, он в черновиках или был перемещён.</p>
            <Separator />
            <RelatedPosts currentSlug="" />
          </>
        )}
        {!loading && post && (
          <>
            <Article>
              <header>
                <PageTitle style={{ textAlign: 'left' }}>{post.title}</PageTitle>
                <MetaRow post={post} />
              </header>

              {post.cover && (
                <Cover>
                  <img
                    src={post.cover}
                    alt=""
                  />
                </Cover>
              )}

              <Prose>
                <ReactMarkdown
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

            <section aria-labelledby="related-heading">
              <SectionTitle id="related-heading">Другие материалы</SectionTitle>
              <RelatedPostsList excludeSlug={post.slug} />
            </section>
          </>
        )}
      </ContentWrapper>
    </Container>
  )
}
