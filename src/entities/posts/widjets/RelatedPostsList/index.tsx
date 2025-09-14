import { useMemo } from 'react'

import { RelatedGrid } from './index.linaria'
import type { RelatedListProps } from './index.types'
import { PreviewPostCard } from '../../feautures/PreviewPostCard'
import { PREVIEWS } from '@/entities/posts/data'

export function RelatedPostsList({ excludeSlug, limit, onlyFeatured, items, ...rest }: RelatedListProps) {
  const source = items ?? PREVIEWS

  const related = useMemo(() => {
    let list = source
    if (excludeSlug) list = list.filter((p) => p.slug !== excludeSlug)
    if (onlyFeatured) list = list.filter((p) => p.featured)
    if (limit && limit > 0) list = list.slice(0, limit)

    return list
  }, [source, excludeSlug, onlyFeatured, limit])

  if (!related.length) return null

  return (
    <RelatedGrid {...rest}>
      {related.map((p) => (
        <PreviewPostCard
          key={p.slug}
          post={p}
          showTags
          showDate
        />
      ))}
    </RelatedGrid>
  )
}

export default RelatedPostsList
