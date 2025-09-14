import { InlineCode, Pre, BlockCode } from './index.linaria'

export const CodeRenderer = ({ inline, className, children, ...props }: any) =>
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
