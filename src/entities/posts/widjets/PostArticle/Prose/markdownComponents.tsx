import type { Components } from 'react-markdown'

import { CodeRenderer } from './CodeRenderer'
import {
  PostH2,
  PostH3,
  P,
  Figure,
  Figcaption,
  Pre,
  TableScroll,
  Table,
  Tr,
  Th,
  Td,
  Caption,
  Strong,
} from './index.linaria'
import { UlWithCtx, OlWithCtx, LiSwitch } from './ProseListCtx'
import { linkTextCss } from '@/shared/assets/styles/links.linaria'
import { ImageReveal } from '@/shared/components/ImageReveal'
import { Tip } from '@/shared/components/Tip'

export const markdownComponents: Components = {
  h2: ({ ...props }) => <PostH2 {...props} />,
  h3: ({ ...props }) => <PostH3 {...props} />,
  p: ({ ...props }) => <P {...props} />,
  strong: ({ ...props }) => <Strong {...props} />,

  ul: ({ ...props }) => <UlWithCtx {...props} />,
  ol: ({ ...props }) => <OlWithCtx {...props} />,
  li: ({ ...props }) => <LiSwitch {...props} />,

  blockquote: ({ children, ...rest }) => <Tip {...rest}>{children}</Tip>,

  // картинки
  img: ({ ...props }) => (
    <ImageReveal
      imgProps={props} // сюда попадут правильные ImgHTMLAttributes
      frameProps={{ style: { borderRadius: 12 } }}
    />
  ),
  a: ({ ...props }) => (
    <a
      {...props}
      className={linkTextCss}
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
