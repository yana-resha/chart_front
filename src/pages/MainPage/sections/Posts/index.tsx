import { Link } from 'react-router-dom'

import { ListFooter, PostsGrid, PostsSection, PostsWrapper } from './index.linaria'
import { PostsListData } from '../../data/posts.data'
import { Inner, SectionHeadWrapper, SectionTitle, SectionSubtitle } from '../../index.linaria'
import { Button } from '@/shared/components/Button'
import { PreviewPostCard } from '@/shared/components/PreviewPostCard'
import { ROUTER_PATHES } from '@/shared/constants/router-paths'
import { linkTextCss } from '@/shared/assets/styles/links.linaria'

export const Posts = () => (
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
          {PostsListData.map((post) => (
            <PreviewPostCard
              key={post.id}
              title={post.title}
              description={post.description}
              link={post.link}
              imageSrc={post.image}
              imageAlt={post.title}
            />
          ))}
        </PostsGrid>
        <ListFooter>
          <Button
            as={Link}
            theme="primary"
            size="large"
            to={'/'}
            roundedCorner
          >
            Смотреть еще
          </Button>
        </ListFooter>
      </PostsWrapper>
    </Inner>
  </PostsSection>
)
