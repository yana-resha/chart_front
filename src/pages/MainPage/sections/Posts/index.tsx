import { Link } from 'react-router-dom'

import { ListFooter, PostsGrid, PostsSection, PostsWrapper } from './index.linaria'
import { Inner, SectionHeadWrapper, SectionTitle, SectionSubtitle } from '../../index.linaria'
import { getFeaturedPreviews } from '@/entities/posts/data'
import { PreviewPostCard } from '@/entities/posts/feautures/PreviewPostCard'
import { linkTextCss } from '@/shared/assets/styles/links.linaria'
import { Button } from '@/shared/components/Button'
import { ROUTER_PATHES } from '@/shared/constants/router-paths'

export const Posts = () => {
  const featured = getFeaturedPreviews()

  return (
    <PostsSection>
      <Inner>
        <SectionHeadWrapper>
          <SectionTitle variant="light">Учитесь астрологии шаг за шагом</SectionTitle>
          <SectionSubtitle variant="light">
            Мы подготовили простые статьи с примерами, а всё, что узнаете, можно{' '}
            <Link
              className={linkTextCss}
              to={ROUTER_PATHES.CALCULATOR_PATH}
            >
              проверить прямо в ASTRODOC
            </Link>
            .
          </SectionSubtitle>
        </SectionHeadWrapper>
        <PostsWrapper>
          <PostsGrid>
            {featured.map((post) => (
              <PreviewPostCard
                key={post.slug}
                post={post}
                showDate
              />
            ))}
          </PostsGrid>
          <ListFooter>
            <Button
              as={Link}
              theme="primary"
              size="large"
              to={ROUTER_PATHES.POSTS_PATH}
              roundedCorner
            >
              Смотреть еще
            </Button>
          </ListFooter>
        </PostsWrapper>
      </Inner>
    </PostsSection>
  )
}
