import { Link } from 'react-router-dom'

import { Button } from '../Button'
import {
  Card,
  CardDescription,
  CardFooter,
  CardTitle,
  ContentWrapper,
  ImageWrapper,
  PreviewImage,
  Wrapper,
} from './index.linaria'
import { IPreviewPostCard } from './index.type'

export const PreviewPostCard = ({
  imageAlt,
  imageSrc,
  title,
  description,
  link,
  ...props
}: IPreviewPostCard) => (
  <Card {...props}>
    <ImageWrapper>
      <PreviewImage
        src={imageSrc}
        alt={imageAlt}
      />
    </ImageWrapper>
    <Wrapper>
      <ContentWrapper>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </ContentWrapper>
      <CardFooter>
        <Button
          as={Link}
          to={link}
          kind="text"
          theme="primary"
          size="small"
        >
          Подробнее
        </Button>
      </CardFooter>
    </Wrapper>
  </Card>
)
