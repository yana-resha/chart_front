import { FC } from 'react'

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import { Section, TitleRow, Block, Wrapper } from './index.linaria'

export const PageSkeleton: FC = () => (
  <SkeletonTheme
    baseColor="rgba(255, 255, 255, 0.08)"
    highlightColor="rgba(255, 255, 255, 0.15)"
    borderRadius={14}
    duration={1.4}
  >
    <Wrapper>
      {/* Исходные данные */}
      <Section>
        <TitleRow>
          <Skeleton
            width={'40%'}
            height={30}
          />
        </TitleRow>
        <Block>
          <Skeleton height={260} />
        </Block>
      </Section>

      {/* Натальная карта */}
      <Section>
        <TitleRow>
          <Skeleton
            width={'50%'}
            height={30}
          />
        </TitleRow>
        <Block>
          <Skeleton height={660} />
        </Block>
      </Section>

      {/* Основные значения */}
      <Section>
        <TitleRow>
          <Skeleton
            width={'40%'}
            height={30}
          />
        </TitleRow>
        <Block>
          <Skeleton height={700} />
        </Block>
      </Section>

      {/* Интерпретации*/}
      <Section>
        <TitleRow>
          <Skeleton
            width={'45%'}
            height={30}
          />
        </TitleRow>
        <Block>
          <Skeleton height={1000} />
        </Block>
      </Section>
    </Wrapper>
  </SkeletonTheme>
)
