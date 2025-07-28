import { FC } from 'react'

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

import { Card, Title, Paragraph } from './index.linaria'
import { skeletonTheme } from './theme'

type PostSkeletonProps = {
  count?: number
}

export const PostSkeleton: FC<PostSkeletonProps> = ({ count = 1 }) => (
  <SkeletonTheme {...skeletonTheme}>
    {Array.from({ length: count }).map((_, i) => (
      <Card key={i}>
        <Title>
          <Skeleton
            width="60%"
            height={28}
          />
        </Title>

        <Paragraph>
          <Skeleton height={250} />
        </Paragraph>
      </Card>
    ))}
  </SkeletonTheme>
)
