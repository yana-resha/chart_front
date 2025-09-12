import { parse as yamlParse } from 'yaml'

import type { Post } from './types/post.types'
/** 1) Грузим ВСЕ index.md из подпапок */
const mdFiles = import.meta.glob('./**/index.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>

/** 2) Грузим все ассеты как URL (для подмены относительных путей в контенте) */
const assetFiles = import.meta.glob('./**/*.{png,jpg,jpeg,webp,svg,gif}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>

function dirFromPath(path: string) {
  // './chto-takoe-natalnaya-karta/index.md' → 'chto-takoe-natalnaya-karta'
  const parts = path.split('/')

  return parts.length >= 3 ? parts[1] : 'post'
}

function parseFrontmatter(raw: string): { data: Record<string, any>; content: string } {
  if (!raw.startsWith('---')) return { data: {}, content: raw }
  const endIdx = raw.indexOf('\n---')
  if (endIdx === -1) return { data: {}, content: raw }
  const fmText = raw.slice(3, endIdx).trim()
  const content = raw.slice(endIdx + 4).replace(/^\s+/, '')
  let data: Record<string, any> = {}
  try {
    data = yamlParse(fmText) || {}
  } catch {}

  return { data, content }
}

/** Подрезаем MD до превью */
function makeExcerpt(md: string, max = 180) {
  const plain = md
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`[^`]+`/g, '')
    .replace(/!\[[^\]]*]\([^)]+\)/g, '')
    .replace(/\[[^\]]*]\([^)]+\)/g, '')
    .replace(/[#>*_~`-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

  return plain.length > max ? plain.slice(0, max - 1) + '…' : plain
}

/** 3) Резолвим относительные пути в MD на реальные URL ассетов из бандла */
function resolveAssetsInMarkdown(md: string, baseDir: string) {
  // собираем карту './foo.jpg' → 'blob/hash.jpg'
  const map = new Map<string, string>()
  Object.entries(assetFiles).forEach(([path, url]) => {
    // path: './chto-takoe-natalnaya-karta/cover.jpg'
    if (path.startsWith(`./${baseDir}/`)) {
      const rel = path.replace(`./${baseDir}/`, './')
      map.set(rel, url)
    }
  })

  let out = md

  // Markdown-изображения ![alt](./rel)
  out = out.replace(/!\[[^\]]*]\((\.\/[^)]+)\)/g, (_m, rel) => {
    const url = map.get(rel) ?? rel

    return _m.replace(rel, url)
  })

  // HTML/директивы: src="./rel"
  out = out.replace(/src="(\.\/[^"]+)"/g, (_m, rel) => {
    const url = map.get(rel) ?? rel

    return `src="${url}"`
  })

  // frontmatter-пути внутри текста на всякий случай: cover:"./rel" — обычно не нужно
  return out
}

export const POSTS: Post[] = Object.entries(mdFiles)
  .map(([path, raw]) => {
    const dir = dirFromPath(path) // slug по имени папки
    const { data, content } = parseFrontmatter(raw)

    const slug = (data.slug as string) ?? dir

    const title = (data.title as string) ?? slug
    const createdAt = (data.createdAt as string) ?? new Date().toISOString()

    // cover может быть относительным путём из фронтматтера ('./cover.jpg')
    let cover = (data.cover as string | undefined) ?? undefined
    if (cover?.startsWith('./')) {
      const key = `./${dir}/${cover.slice(2)}`
      cover = assetFiles[key] ?? cover
    }

    const tags = (data.tags as string[] | undefined) ?? []
    const excerpt = (data.excerpt as string | undefined) ?? makeExcerpt(content)

    // подменяем относительные src внутри Markdown
    const resolvedContent = resolveAssetsInMarkdown(content, dir)

    return { slug, title, createdAt, cover, tags, excerpt, content: resolvedContent }
  })
  .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
