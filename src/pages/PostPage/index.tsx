import { useEffect, useMemo, useState } from 'react'

import ReactMarkdown from 'react-markdown'
import { useParams } from 'react-router-dom'
import rehypeRaw from 'rehype-raw'
import remarkDirective from 'remark-directive'
import remarkGfm from 'remark-gfm'
import { visit } from 'unist-util-visit'

import {
  MetaRowWrap,
  RelatedSection,
  RelatedGrid,
  Page,
  Article,
  Cover,
  Prose,
  Separator,
  TagCloud,
  Layout,
  TagPill,
} from './index.linaria'
import { PREVIEWS, getPostBySlug } from '@/entities/posts/data'
import type { IPost } from '@/entities/posts/types/post.types'
import { PreviewPostCard } from '@/entities/posts/ui/PreviewPostCard'
import { SharedButton } from '@/features/SharedButton'
import { PageTitle, SectionTitle } from '@/shared/assets/styles/titles.linaria'
import { HeaderBackButton } from '@/shared/components/HeaderBackButton'
import { PageHeader } from '@/shared/components/PageHeader'

// --- utils ---
const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })

const estimateReadingTime = (markdown: string) => {
  const w = markdown.split(/\s+/).filter(Boolean).length

  return `${Math.max(1, Math.round(w / 220))} мин чтения`
}

// --- remark plugin: ::img{src="" align="right" width="44%" caption="..."} ---
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

// --- UI blocks ---
function MetaRow({ post }: { post: IPost }) {
  const reading = estimateReadingTime(post.content)

  return (
    <MetaRowWrap>
      <span>{formatDate(post.createdAt)}</span>
      <span>•</span>
      <span>{reading}</span>
      {post.tags?.length ? (
        <>
          <span>•</span>
          <span>
            {post.tags.map((t) => (
              <TagPill key={t}>#{t}</TagPill>
            ))}
          </span>
        </>
      ) : null}
    </MetaRowWrap>
  )
}

function RelatedPosts({ currentSlug }: { currentSlug: string }) {
  const related = useMemo(() => PREVIEWS.filter((p) => p.slug !== currentSlug), [currentSlug])
  if (!related.length) return null

  return (
    <RelatedSection>
      <SectionTitle>Другие материалы</SectionTitle>
      <RelatedGrid>
        {related.map((p) => (
          <PreviewPostCard
            showTags
            showDate
            key={p.slug}
            post={p}
          />
        ))}
      </RelatedGrid>
    </RelatedSection>
  )
}

export default function PostPage() {
  const { slug = '' } = useParams<{ slug: string }>()
  const [post, setPost] = useState<IPost | null>(null)
  const [loading, setLoading] = useState(true)

  // загрузка поста по slug
  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setPost(null)
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

  // document.title
  useEffect(() => {
    if (post) document.title = `${post.title} — ASTRODOC`
  }, [post?.title])

  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''

  if (loading) {
    return (
      <Layout>
        <PageHeader>
          <HeaderBackButton text="Смотреть все" />
        </PageHeader>
        <Page>
          <div style={{ padding: 24, color: 'var(--text-muted)' }}>Загрузка…</div>
        </Page>
      </Layout>
    )
  }

  if (!post) {
    return (
      <Layout>
        <PageHeader>
          <HeaderBackButton text="Смотреть все" />
        </PageHeader>
        <Page>
          <div style={{ padding: 24 }}>
            <PageTitle style={{ textAlign: 'left' }}>Пост не найден</PageTitle>
            <p style={{ color: 'var(--text-muted)' }}>Возможно, он в черновиках или был перемещён.</p>
            <Separator />
            <RelatedPosts currentSlug="" />
          </div>
        </Page>
      </Layout>
    )
  }

  return (
    <Layout>
      <PageHeader>
        <HeaderBackButton text="Смотреть все" />
        <SharedButton
          buttonText="Поделиться статьей"
          shareUrl={shareUrl}
          title={post.title}
        />
      </PageHeader>

      <Page>
        <Article>
          <div>
            <PageTitle style={{ textAlign: 'left' }}>{post.title}</PageTitle>
            <MetaRow post={post} />
          </div>

          {post.cover && (
            <Cover>
              <img
                src={post.cover}
                alt="cover"
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

          <Separator />
          <TagCloud>
            {post.tags?.map((t) => (
              <TagPill key={t}>#{t}</TagPill>
            ))}
          </TagCloud>
        </Article>

        <RelatedPosts currentSlug={post.slug} />
      </Page>
    </Layout>
  )
}
