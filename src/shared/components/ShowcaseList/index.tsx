import { HTMLAttributes } from 'react'

import { List, Item, ImageWrapper, Content, Title, Text } from './index.linaria'

export interface ShowcaseItem {
  img: string
  title: string
  text: string
}

type Variant = 'light' | 'dark'

interface ShowcaseListProps extends HTMLAttributes<HTMLDivElement> {
  items: ShowcaseItem[]
  variant?: Variant
}

export const ShowcaseList = ({ items, variant = 'light', ...props }: ShowcaseListProps) => (
  <List {...props}>
    {items.map((item, idx) => (
      <Item
        key={idx}
        variant={variant}
      >
        <ImageWrapper>
          <img
            src={item.img}
            alt={item.title}
          />
        </ImageWrapper>
        <Content>
          <Title variant={variant}>{item.title}</Title>
          <Text variant={variant}>{item.text}</Text>
        </Content>
      </Item>
    ))}
  </List>
)
