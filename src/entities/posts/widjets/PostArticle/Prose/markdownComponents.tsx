import type { Components } from 'react-markdown'

import { CodeRenderer } from './CodeRenderer'
import {
  PostH2,
  PostH3,
  P,
  A,
  Blockquote,
  Figure,
  Figcaption,
  Pre,
  TableScroll,
  Table,
  Tr,
  Th,
  Td,
  Caption,
} from './index.linaria'
import { UlWithCtx, OlWithCtx, LiSwitch } from './ProseListCtx'
import { ImageReveal } from '@/shared/components/ImageReveal'

export const markdownComponents: Components = {
  h2: ({ ...props }) => <PostH2 {...props} />,
  h3: ({ ...props }) => <PostH3 {...props} />,
  p: ({ ...props }) => <P {...props} />,
  a: ({ ...props }) => <A {...props} />,

  ul: ({ ...props }) => <UlWithCtx {...props} />,
  ol: ({ ...props }) => <OlWithCtx {...props} />,
  li: ({ ...props }) => <LiSwitch {...props} />,

  blockquote: ({ ...props }) => <Blockquote {...props} />,

  // картинки
  img: ({ ...props }) => (
    <ImageReveal
      imgProps={props} // сюда попадут правильные ImgHTMLAttributes
      frameProps={{ style: { borderRadius: 12 } }}
    />
  ),
  figure: ({ ...props }) => <Figure {...props} />,
  figcaption: ({ ...props }) => <Figcaption {...props} />,

  // код
  code: CodeRenderer,
  pre: ({ ...props }) => <Pre {...props} />,

  // таблицы
  table: ({ children, ...props }) => (
    <TableScroll>
      <Table {...props}>{children}</Table>
    </TableScroll>
  ),
  thead: ({ ...props }) => <thead {...props} />,
  tbody: ({ ...props }) => <tbody {...props} />,
  tr: ({ ...props }) => <Tr {...props} />,
  th: ({ ...props }) => <Th {...props} />,
  td: ({ ...props }) => <Td {...props} />,
  caption: ({ ...props }) => <Caption {...props} />,
}
