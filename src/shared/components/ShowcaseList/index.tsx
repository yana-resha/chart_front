import { HTMLAttributes } from 'react'

import { List, Item, ImageWrapper, Content, Title, Text } from './index.linaria'

export interface ShowcaseItem {
  img: string
  title: string
  text: string
}

interface ShowcaseListProps extends HTMLAttributes<HTMLDivElement> {
  items: ShowcaseItem[]
}

export const ShowcaseList = ({ items, ...props }: ShowcaseListProps) => (
  <List {...props}>
    {items.map((item, idx) => (
      <Item key={idx}>
        <ImageWrapper>
          <img
            src={item.img}
            alt={item.title}
          />
        </ImageWrapper>
        <Content>
          <Title>{item.title}</Title>
          <Text>{item.text}</Text>
        </Content>
      </Item>
    ))}
  </List>
)
