// src/entities/posts/data/loaders.ts
// Храним тут только import.meta.glob и резолверы путей/ассетов

/** index.md во всех подпапках (eager raw — только для превью и меты) */
export const mdFiles = import.meta.glob('./**/index.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>

/** ленивый лоадер markdown по slug (raw string) */
export const mdLoader = import.meta.glob('./**/index.md', {
  query: '?raw',
  import: 'default',
}) as Record<string, () => Promise<string>>

/** ассеты как URL (для cover/preview и замены относительных путей) */
export const assetFiles = import.meta.glob('./**/*.{png,jpg,jpeg,webp,svg,gif}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>

/** './slug/index.md' -> 'slug' */
export function dirFromPath(path: string) {
  const parts = path.split('/')

  return parts.length >= 3 ? parts[1] : 'post'
}

/** первый ассет в папке (на случай, если не задан cover/preview) */
export function firstAssetIn(dir: string): string | undefined {
  const prefix = `./${dir}/`
  const entry = Object.entries(assetFiles).find(([p]) => p.startsWith(prefix))

  return entry?.[1]
}

/** резолв относительного пути из фронтматтера ('./cover.jpg') → реальный URL */
export function resolveAssetFromFM(dir: string, rel?: string) {
  if (!rel || !rel.startsWith('./')) return rel
  const key = `./${dir}/${rel.slice(2)}`

  return assetFiles[key] ?? rel
}
