import { Link } from 'react-router-dom'

import {
  Card,
  CardDate,
  CardDescription,
  CardFooter,
  CardInner,
  CardTag,
  CardTags,
  CardTitle,
  ContentWrapper,
  ImageWrapper,
  PreviewImage,
  Wrapper,
} from './index.linaria'
import { IPreviewPostCardProps } from './index.type'
import { Button } from '@/shared/components/Button'

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })

export const PreviewPostCard = ({
  post,
  basePath = '/posts',
  ctaText = 'Подробнее',
  showDate = true,
  showTags = false,
  imageAltOverride,
  ...props
}: IPreviewPostCardProps) => {
  const href = `${basePath.replace(/\/$/, '')}/${post.slug}`
  const alt = imageAltOverride ?? post.title

  return (
    <Card {...props}>
      <CardInner>
        <ImageWrapper>
          <PreviewImage
            src={post.preview}
            alt={alt}
            loading="lazy"
          />
        </ImageWrapper>

        <Wrapper>
          <ContentWrapper>
            <CardTitle to={href}>{post.title}</CardTitle>

            {showDate && <CardDate>{formatDate(post.createdAt)}</CardDate>}

            <CardDescription>{post.excerpt}</CardDescription>

            {showTags && post.tags?.length ? (
              <CardTags>
                {post.tags?.map((t) => (
                  <CardTag key={t}>{t}</CardTag>
                ))}
              </CardTags>
            ) : null}
          </ContentWrapper>

          <CardFooter>
            <Button
              as={Link}
              to={href}
              kind="text"
              theme="primary"
              size="small"
            >
              {ctaText}
            </Button>
          </CardFooter>
        </Wrapper>
      </CardInner>
    </Card>
  )
}
