// remarkPostImgDirective.ts
// ВАЖНО: эта строка аугментирует типы mdast так, что узлы директив валидны
import 'mdast-util-directive'

import type { Root, Html, Text } from 'mdast'
import type { LeafDirective, TextDirective } from 'mdast-util-directive'
import type { Plugin } from 'unified'
import { visit } from 'unist-util-visit'

type AnyDirective = LeafDirective | TextDirective

export const remarkPostImgDirective: Plugin<[], Root> = () => (tree) => {
  visit(tree, ['leafDirective', 'textDirective'], (node, index, parent) => {
    if (!parent || typeof index !== 'number') return
    const dir = node as AnyDirective

    // 1) Рендерим только нашу директиву ::img
    if (dir.type === 'leafDirective' && dir.name === 'img') {
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

      return
    }

    // 2) Любые другие директивы (в т.ч. ":30") превращаем обратно в текст
    //    Чтобы ничего не терялось в обычных строках.
    const textNode: Text = {
      type: 'text',
      // Простая реконструкция исходника: для кейса ":30" даст ровно ":30"
      value: `:${dir.name}`,
    }
    parent.children.splice(index, 1, textNode)
  })
}
