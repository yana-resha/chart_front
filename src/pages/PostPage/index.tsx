import { useEffect, useMemo, useState } from 'react'

import ReactMarkdown from 'react-markdown'
import { useParams, Link, useLocation, useMatch } from 'react-router-dom'
import rehypeRaw from 'rehype-raw'
import remarkDirective from 'remark-directive'
import remarkGfm from 'remark-gfm'
import { visit } from 'unist-util-visit'

import {
  MetaRowWrap,
  GalleryWrap,
  GalleryHeader,
  GalleryGrid,
  ThumbButton,
  Lightbox,
  LightboxInner,
  LightboxPrev,
  LightboxImg,
  LightboxNext,
  RelatedSection,
  RelatedGrid,
  RelatedCard,
  Page,
  Article,
  Cover,
  Prose,
  Separator,
  TagCloud,
  Layout,
  TagPill,
} from './index.linaria'
import { Post } from '../../entities/posts/types/post.types'
import { POSTS } from '@/entities/posts'
import { HeaderBackButton } from '@/shared/components/HeaderBackButton'
import { PageHeader } from '@/shared/components/PageHeader'
import { SharedButton } from '@/features/SharedButton'
import { PageTitle } from '@/shared/assets/styles/titles.linaria'

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
function MetaRow({ post }: { post: Post }) {
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

function ImageGallery({ images }: { images: string[] }) {
  const [open, setOpen] = useState(false)
  const [current, setCurrent] = useState(0)

  const openAt = (i: number) => {
    setCurrent(i)
    setOpen(true)
  }
  const prev = () => setCurrent((c) => (c - 1 + images.length) % images.length)
  const next = () => setCurrent((c) => (c + 1) % images.length)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)

    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  if (!images?.length) return null

  return (
    <GalleryWrap>
      <GalleryHeader>
        <span>Галерея ({images.length})</span>
      </GalleryHeader>
      <GalleryGrid>
        {images.map((src, i) => (
          <ThumbButton
            key={src}
            onClick={() => openAt(i)}
            aria-label={`Открыть изображение ${i + 1}`}
          >
            <img
              src={src}
              alt="Post image"
              loading="lazy"
            />
          </ThumbButton>
        ))}
      </GalleryGrid>

      {open && (
        <Lightbox onClick={() => setOpen(false)}>
          <LightboxInner onClick={(e) => e.stopPropagation()}>
            <LightboxPrev
              onClick={prev}
              aria-label="Предыдущее"
            >
              ‹
            </LightboxPrev>
            <LightboxImg
              src={images[current]}
              alt="Full"
            />
            <LightboxNext
              onClick={next}
              aria-label="Следующее"
            >
              ›
            </LightboxNext>
          </LightboxInner>
        </Lightbox>
      )}
    </GalleryWrap>
  )
}

function RelatedPosts({ currentSlug }: { currentSlug: string }) {
  console.log(currentSlug)
  const related = useMemo(() => POSTS.filter((p) => p.slug !== currentSlug).slice(0, 3), [currentSlug])
  if (!related.length) return null

  return (
    <RelatedSection>
      <h2 style={{ fontSize: 20, margin: '0 0 12px' }}>Другие материалы</h2>
      <RelatedGrid>
        {related.map((post) => (
          <RelatedCard key={post.slug}>
            {post.cover && (
              <img
                src={post.cover}
                alt="cover"
                loading="lazy"
              />
            )}
            <h3>
              <Link
                to={`/posts/${post.slug}`}
                style={{ color: 'inherit', textDecoration: 'none' }}
              >
                {post.title}
              </Link>
            </h3>
            <p>{post.excerpt}</p>
            <div className="card-tags">
              {post.tags?.slice(0, 3).map((t) => (
                <TagPill key={t}>{t}</TagPill>
              ))}
            </div>
          </RelatedCard>
        ))}
      </RelatedGrid>
    </RelatedSection>
  )
}

export default function PostPage() {
  const slug = useMatch('/:posts/:slug')?.params.slug
  const post = useMemo(() => POSTS.find((p) => p.slug === slug) ?? POSTS[0], [slug])

  useEffect(() => {
    document.title = `${post.title} — ASTRODOC`
  }, [post.title])

  return (
    <Layout>
      <PageHeader>
        <HeaderBackButton text="Смотреть все" />
        <SharedButton
          buttonText="Поделиться статьей"
          shareUrl={''}
          title="Поделиться статьей"
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

          <Prose className="Prose">
            <ReactMarkdown
              remarkPlugins={[remarkGfm, remarkDirective, remarkImgDirective]}
              rehypePlugins={[rehypeRaw]}
            >
              {post.content}
            </ReactMarkdown>
          </Prose>

          {post.images && <ImageGallery images={post.images} />}

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
