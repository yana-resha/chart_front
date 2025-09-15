// ВАЖНО: эта строка аугментирует типы mdast так, что 'leafDirective' становится валидным узлом
import 'mdast-util-directive'

import type { Root, Html } from 'mdast'
import type { LeafDirective } from 'mdast-util-directive'
import type { Plugin } from 'unified'
import { visit } from 'unist-util-visit'

export const remarkPostImgDirective: Plugin<[], Root> = () => (tree) => {
  // Не передаём дженерики в visit — TypeScript сам сузит тип по 'leafDirective'
  visit(tree, 'leafDirective', (node, index, parent) => {
    if (!parent || typeof index !== 'number') return

    // Явно укажем тип узла колбэка:
    const dir = node as LeafDirective
    if (dir.name !== 'img') return

    // attributes: Record<string, string | null | undefined>
    const a = dir.attributes ?? {}
    const src = String(a.src ?? '')
    const alt = String(a.alt ?? '')
    const align = a.align === 'left' ? 'left' : 'right'
    const width = String(a.width ?? '44%')
    const caption = a.caption != null && a.caption !== '' ? `<figcaption>${a.caption}</figcaption>` : ''

    const htmlNode: Html = {
      type: 'html',
      value: `<figure class="wrap-${align}" style="max-width:${width}"><img src="${src}" alt="${alt}"/>${caption}</figure>`,
    }

    parent.children.splice(index, 1, htmlNode)
  })
}
