// src/entities/posts/data/md-helpers.ts
import { parse as yamlParse } from 'yaml'

import { assetFiles } from './loaders'

export function parseFrontmatter(raw: unknown): { data: Record<string, unknown>; content: string } {
  const text = typeof raw === 'string' ? raw.replace(/^\uFEFF/, '') : ''
  if (!text.startsWith('---')) return { data: {}, content: text }

  // --- поддержка \n и \r\n
  const m = text.match(/^---\s*\r?\n([\s\S]*?)\r?\n---\s*\r?\n?/)
  if (!m) return { data: {}, content: text }

  const fmText = m[1].trim()
  const content = text.slice(m[0].length)
  let data: Record<string, unknown> = {}
  try {
    data = yamlParse(fmText) || {}
  } catch {
    /* empty */
  }

  return { data, content }
}

export function makeExcerpt(md: string, max = 180) {
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

/** Подменяем относительные пути внутри Markdown на реальные URL ассетов из бандла */
export function resolveAssetsInMarkdown(md: string, baseDir: string) {
  // Соберём карту './foo.jpg' → 'hash-url' для конкретной папки
  const map = new Map<string, string>()
  Object.entries(assetFiles).forEach(([path, url]) => {
    if (path.startsWith(`./${baseDir}/`)) {
      const rel = path.replace(`./${baseDir}/`, './')
      map.set(rel, url)
    }
  })

  let out = md
  // Markdown-изображения ![alt](./rel)
  out = out.replace(/!\[[^\]]*]\((\.\/[^)]+)\)/g, (m, rel) => m.replace(rel, map.get(rel) ?? rel))
  // HTML/директивы и т.п.: src="./rel"
  out = out.replace(/src="(\.\/[^"]+)"/g, (_m, rel) => `src="${map.get(rel) ?? rel}"`)

  return out
}
