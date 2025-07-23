import { FC } from 'react'

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

import { Card, PlanetImage, Content, Title, Paragraph } from './index.linaria'
import { skeletonTheme } from './theme'

export const PostSkeleton: FC = () => (
  <SkeletonTheme {...skeletonTheme}>
    <Card>
      <Title>
        <Skeleton width={180} />
      </Title>

      <Content>
        <PlanetImage>
          <Skeleton
            circle
            height="100%"
            width="100%"
          />
        </PlanetImage>

        <Paragraph>
          <Skeleton count={3} />
        </Paragraph>

        <Paragraph>
          <Skeleton
            count={2}
            width="90%"
          />
        </Paragraph>
        <Paragraph>
          <Skeleton count={5} />
        </Paragraph>
      </Content>
    </Card>
  </SkeletonTheme>
)
