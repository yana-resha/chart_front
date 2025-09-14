import { Link } from 'react-router-dom'

import { TagBase } from './index.linaria'
import { TagProps } from './index.types'

export function Tag(props: TagProps) {
  const {
    size = 'sm',
    variant = 'default',
    withHash = false,
    selected,
    ariaLabel,
    children,
    className,
    as,
  } = props

  const content = withHash ? (
    <>
      <span style={{ opacity: 0.7 }}>#</span>
      <span>{children}</span>
    </>
  ) : (
    <>{children}</>
  )

  if (as === 'link') {
    const { to } = props

    return (
      <TagBase
        as={Link}
        to={to}
        data-size={size}
        data-variant={variant}
        data-selected={selected}
        data-clickable="true"
        aria-label={ariaLabel}
        className={className}
      >
        {content}
      </TagBase>
    )
  }

  if (as === 'button') {
    const { onClick } = props

    return (
      <TagBase
        as={'button'}
        onClick={onClick}
        data-size={size}
        data-variant={variant}
        data-selected={selected}
        data-clickable="true"
        aria-label={ariaLabel}
        className={className}
        type="button"
      >
        {content}
      </TagBase>
    )
  }

  // span по умолчанию
  return (
    <TagBase
      data-size={size}
      data-variant={variant}
      data-selected={selected}
      data-clickable="false"
      aria-label={ariaLabel}
      className={className}
    >
      {content}
    </TagBase>
  )
}

export default Tag
