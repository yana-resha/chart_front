import { Container, ContentWrapper, Hairline, Lead, List, PostsBlock } from './index.linaria'
import { PREVIEWS } from '@/entities/posts/data'
import { PreviewPostCard } from '@/entities/posts/feautures/PreviewPostCard'
import { H1 } from '@/shared/assets/styles/titles.linaria'
import { HeaderBackButton } from '@/shared/components/HeaderBackButton'
import { PageHeader } from '@/shared/components/PageHeader'
import { SeoHelmet } from '@/shared/components/SeoHelmet'

export const PostsListPage = () => {
  const items = PREVIEWS.filter((p) => !p.isDraft)

  return (
    <Container>
      <SeoHelmet
        title="Все статьи"
        description="Каталог статей по астрологии: разборы натальных карт, планеты в знаках, дома, аспекты и конфигурации. Подробные руководства и примеры для начинающих и профессионалов."
      />

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
