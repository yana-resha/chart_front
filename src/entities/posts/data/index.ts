import { mdFiles, mdLoader, dirFromPath, firstAssetIn, resolveAssetFromFM } from './loaders'
import { parseFrontmatter, makeExcerpt, resolveAssetsInMarkdown } from './md-helpers'
import type { IPost, IPostPreview } from '../types/post.types'

/* ========= PREVIEWS (без content) ========= */
export const PREVIEWS: IPostPreview[] = Object.entries(mdFiles)
  .map(([path, raw]) => {
    const slug = dirFromPath(path)
    const { data, content } = parseFrontmatter(raw)

    const title = (data.title as string) ?? slug
    const createdAt = (data.createdAt as string) ?? new Date().toISOString()
    const featured = Boolean(data.featured)
    const isDraft = Boolean(data.isDraft)
    const tags = (data.tags as string[] | undefined) ?? []
    const excerpt = (data.excerpt as string | undefined) ?? makeExcerpt(content)

    // требуем preview: FM.preview → FM.cover → первый ассет
    const preview =
      resolveAssetFromFM(slug, data.preview as string | undefined) ||
      resolveAssetFromFM(slug, data.cover as string | undefined) ||
      firstAssetIn(slug)

    if (!preview) {
      if (import.meta.env.DEV) {
        console.warn(`[posts] Skip "${slug}" — no preview/cover assets found`)
      }

      return null
    }

    return isDraft
      ? null
      : ({
          slug,
          title,
          createdAt,
          preview,
          tags,
          excerpt,
          featured,
          isDraft,
        } as IPostPreview)
  })
  .filter((p): p is IPostPreview => Boolean(p))
  .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

/* ========= Один пост по slug (лениво) ========= */
export async function getPostBySlug(slug: string): Promise<IPost | null> {
  const key = `./${slug}/index.md`
  const load = mdLoader[key]
  if (!load) {
    if (import.meta.env.DEV) console.warn(`[posts] getPostBySlug: no loader for ${key}`)

    return null
  }

  const raw = await load()
  if (typeof raw !== 'string') {
    if (import.meta.env.DEV) console.warn(`[posts] getPostBySlug: loader for ${key} did not return string`)

    return null
  }

  const { data, content } = parseFrontmatter(raw)
  const title = (data.title as string) ?? slug
  const createdAt = (data.createdAt as string) ?? new Date().toISOString()
  const tags = (data.tags as string[] | undefined) ?? []
  const featured = Boolean(data.featured)
  const isDraft = Boolean(data.isDraft)
  if (isDraft) return null

  // cover обязателен: FM.cover → FM.preview → первый ассет
  const cover =
    resolveAssetFromFM(slug, data.cover as string | undefined) ||
    resolveAssetFromFM(slug, data.preview as string | undefined) ||
    firstAssetIn(slug)
  if (!cover) {
    if (import.meta.env.DEV) console.warn(`[posts] Cannot open "${slug}" — no cover/preview assets found`)

    return null
  }

  // preview обязателен в типе превью
  const preview =
    resolveAssetFromFM(slug, data.preview as string | undefined) ||
    resolveAssetFromFM(slug, data.cover as string | undefined) ||
    firstAssetIn(slug)

  const excerpt = (data.excerpt as string | undefined) ?? makeExcerpt(content)
  const resolvedContent = resolveAssetsInMarkdown(content, slug)

  return {
    slug,
    title,
    createdAt,
    cover,
    preview: preview!,
    tags,
    excerpt,
    featured,
    content: resolvedContent,
  }
}

/* ========= Удобные селекторы (опционально) ========= */
export const getFeaturedPreviews = () => PREVIEWS.filter((p) => p.featured)
export const getPreviewsByTags = (tags: string[]) =>
  PREVIEWS.filter((p) => p.tags?.some((t) => tags.includes(t)))
export const findNeighbors = (slug: string) => {
  const idx = PREVIEWS.findIndex((p) => p.slug === slug)

  return {
    prev: idx > 0 ? PREVIEWS[idx - 1] : null,
    next: idx >= 0 && idx < PREVIEWS.length - 1 ? PREVIEWS[idx + 1] : null,
  }
}
