/* eslint-disable @typescript-eslint/no-explicit-any */
import 'mdast-util-directive'
import type { Root, Html, PhrasingContent, Text } from 'mdast'
import type { Plugin } from 'unified'
import { visit } from 'unist-util-visit'

import { ServiceLinkId, SERVICE_LINKS } from '../types/post-to-service'
import { linkTextCss } from '@/shared/assets/styles/links.linaria'

const escapeHtml = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

// Собираем текст из детей директивы (если она распарсилась)
function collectLabel(children?: PhrasingContent[]): string {
  if (!children) return ''

  return children
    .map((c: any) => (typeof c.value === 'string' ? c.value : ''))
    .join('')
    .trim()
}

// HTML-узел ссылки
function makeLinkHtml(href: string, label: string): Html {
  const text = label || 'перейти'

  return {
    type: 'html',
    value: `<a href="${href}" class="${linkTextCss}">${escapeHtml(text)}</a>`,
  }
}

// --- Фолбэк: парсим сырой текст, если директива не отработала ---
// Поддерживаем оба порядка []{} и {}[]
const RE_LINK = /(::|:)\s*link\s*(?:\[([^\]]+)\]\s*\{id="([^"]+)"\}|\{id="([^"]+)"\}\s*\[([^\]]+)\])/g

export const remarkPostLinkDirective: Plugin<[], Root> = () => (tree) => {
  // 1) Нормальный путь: распознанные директивы text/leafDirective
  visit(tree, ['textDirective', 'leafDirective'], (node: any, index?: number, parent?: any) => {
    if (index === undefined || !parent) return
    if (node.name !== 'link') return

    const id = node.attributes?.id as ServiceLinkId | undefined
    const href = id ? SERVICE_LINKS[id] : undefined
    if (!href) return

    const label = collectLabel(node.children) || 'перейти'
    parent.children.splice(index, 1, makeLinkHtml(href, label))
  })

  // 2) Фолбэк: если директива НЕ распознана и осталась обычным текстом
  visit(tree, 'text', (node: Text, index?: number, parent?: any) => {
    if (index === undefined || !parent) return

    const { value } = node
    if (typeof value !== 'string') return

    RE_LINK.lastIndex = 0
    let match: RegExpExecArray | null
    let last = 0
    const out: (Text | Html)[] = []

    while ((match = RE_LINK.exec(value))) {
      const start = match.index
      const end = start + match[0].length

      // хвост до совпадения — текстом
      if (start > last) out.push({ type: 'text', value: value.slice(last, start) })

      const id = (match.groups?.id1 || match.groups?.id2) as ServiceLinkId | undefined
      const label = match.groups?.label1 || match.groups?.label2 || 'перейти'
      const href = id ? SERVICE_LINKS[id] : undefined

      if (href) {
        out.push(makeLinkHtml(href, label))
      } else {
        // если id не найден — оставим исходный кусок как текст
        out.push({ type: 'text', value: match[0] })
      }

      last = end
    }

    if (out.length) {
      if (last < value.length) out.push({ type: 'text', value: value.slice(last) })
      parent.children.splice(index, 1, ...out)
      // сместим курсор визитора

      return index + out.length
    }
  })
}
