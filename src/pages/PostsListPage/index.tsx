import { Helmet } from 'react-v19-helmet-async'

import { Container, ContentWrapper, Hairline, Lead, List, PostsBlock } from './index.linaria'
import { PREVIEWS } from '@/entities/posts/data'
import { PreviewPostCard } from '@/entities/posts/feautures/PreviewPostCard'
import { H1 } from '@/shared/assets/styles/titles.linaria'
import { HeaderBackButton } from '@/shared/components/HeaderBackButton'
import { PageHeader } from '@/shared/components/PageHeader'

export const PostsListPage = () => {
  const items = PREVIEWS.filter((p) => !p.isDraft)

  return (
    <Container>
      <Helmet>
        <title>Все статьи — ASTRODOC</title>
        <meta
          name="description"
          content="Каталог статей ASTRODOC: разборы натальных карт, планеты, дома и аспекты. Короткие руководства и примеры."
        />
      </Helmet>

      <PageHeader>
        <HeaderBackButton />
      </PageHeader>

      <ContentWrapper>
        <section aria-labelledby="all-posts-title">
          <H1 id="all-posts-title">Каталог статей ASTRODOC</H1>
          <Lead>Разбирайтесь в астрологии шаг за шагом: подборки, руководства и практические примеры.</Lead>

          {/* Панель действий — максимально простая */}
          <PostsBlock>
            <Hairline />
            <List>
              {items.map((p) => (
                <PreviewPostCard
                  key={p.slug}
                  post={p}
                  showTags
                  showDate
                />
              ))}
            </List>
          </PostsBlock>
        </section>
      </ContentWrapper>
    </Container>
  )
}
