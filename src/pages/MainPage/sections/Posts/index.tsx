import { Link } from 'react-router-dom'

import { ListFooter, PostsGridStyles, PostsSection, PostsWrapper } from './index.linaria'
import { Inner, SectionHeadWrapper, H2, SectionSubtitle } from '../../index.linaria'
import RelatedPostsList from '@/entities/posts/widjets/RelatedPostsList'
import { linkTextCss } from '@/shared/assets/styles/links.linaria'
import { Button } from '@/shared/components/Button'
import { ROUTER_PATHES } from '@/shared/constants/router-paths'

export const Posts = () => (
  <PostsSection>
    <Inner>
      <SectionHeadWrapper>
        <H2 variant="light">Учитесь астрологии шаг за шагом</H2>
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
        <RelatedPostsList
          className={PostsGridStyles}
          onlyFeatured
        />
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
