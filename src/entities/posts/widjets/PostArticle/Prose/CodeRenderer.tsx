import React from 'react'
import type { DetailedHTMLProps, HTMLAttributes } from 'react'

import type { Element } from 'hast'

import { InlineCode, Pre, BlockCode } from './index.linaria'

// ✅ Явный тип пропсов для рендера <code> в react-markdown
type CodeProps = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
  inline?: boolean
  node?: Element
}

export const CodeRenderer: React.FC<CodeProps> = ({
  inline,
  className,
  children,
  ...props // <- теперь это точно объектный тип
}) =>
  inline ? (
    <InlineCode
      className={className}
      {...props}
    >
      {children}
    </InlineCode>
  ) : (
    <Pre>
      <BlockCode
        className={className}
        {...props}
      >
        {children}
      </BlockCode>
    </Pre>
  )
