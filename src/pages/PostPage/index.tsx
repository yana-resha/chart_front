import { useEffect, useState } from 'react'

import { useParams } from 'react-router-dom'

import { Container, Separator, ContentWrapper } from './index.linaria'
import { getPostBySlug } from '@/entities/posts/data'
import type { IPost } from '@/entities/posts/types/post.types'
import PostArticle from '@/entities/posts/widjets/PostArticle'
import RelatedPostsList from '@/entities/posts/widjets/RelatedPostsList'
import { SharedButton } from '@/features/SharedButton'
import { H1, H2 } from '@/shared/assets/styles/titles.linaria'
import { HeaderBackButton } from '@/shared/components/HeaderBackButton'
import { PageHeader } from '@/shared/components/PageHeader'
import { SeoHelmet } from '@/shared/components/SeoHelmet'

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

  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''

  return (
    <Container>
      <SeoHelmet
        title={post?.title ?? ''}
        description={post?.excerpt}
      />

      <PageHeader>
        <HeaderBackButton />
        {post && (
          <SharedButton
            buttonText="Поделиться статьей"
            shareUrl={shareUrl}
            title={post.title}
          />
        )}
      </PageHeader>
      <ContentWrapper>
        {loading && <div style={{ padding: 24, color: 'rgba(255,255,255,.85)' }}>Загрузка…</div>}
        {!loading && !post && (
          <>
            <H1 style={{ textAlign: 'left' }}>Пост не найден</H1>
            <p style={{ color: 'rgba(255,255,255,.85)' }}>Возможно, он в черновиках или был перемещён.</p>
            <Separator />
            <section aria-labelledby="related-heading">
              <H2 id="related-heading">Другие материалы</H2>
              <RelatedPostsList />
            </section>
          </>
        )}
        {!loading && post && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <PostArticle post={post} />

            <section aria-labelledby="related-heading">
              <H2 id="related-heading">Другие материалы</H2>
              <RelatedPostsList excludeSlug={post.slug} />
            </section>
          </div>
        )}
      </ContentWrapper>
    </Container>
  )
}
