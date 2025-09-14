import { Link } from 'react-router-dom'

import {
  Card,
  CardDate,
  CardDescription,
  CardFooter,
  CardInner,
  CardTags,
  CardTitle,
  ContentWrapper,
  ImageWrapper,
  PreviewImage,
  Wrapper,
} from './index.linaria'
import { IPreviewPostCardProps } from './index.type'
import Tag from '../../ui/Tag'
import { Button } from '@/shared/components/Button'
import { formatePostDate } from '../../helpers/formatePostDate'

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

            {showDate && <CardDate>{formatePostDate(post.createdAt)}</CardDate>}

            <CardDescription>{post.excerpt}</CardDescription>

            {showTags && post.tags?.length ? (
              <CardTags>
                {post.tags?.map((t) => (
                  <Tag
                    key={t}
                    size="sm"
                  >
                    {t}
                  </Tag>
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
