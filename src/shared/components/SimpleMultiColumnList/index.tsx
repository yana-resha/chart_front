import React from 'react'

import { Container, Column, Header, Item } from './index.linaria'

interface SimpleMultiColumnListProps extends React.HTMLAttributes<HTMLDivElement> {
  columns: number
  children: React.ReactNode
}

interface ColumnProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

interface ItemProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  highlight?: boolean
}

export const SimpleMultiColumnList = Object.assign(
  ({ columns, children, ...rest }: SimpleMultiColumnListProps) => (
    <Container
      columns={columns}
      {...rest}
    >
      {children}
    </Container>
  ),
  {
    Column: ({ children, ...rest }: ColumnProps) => <Column {...rest}>{children}</Column>,
    Header: ({ children, ...rest }: HeaderProps) => <Header {...rest}>{children}</Header>,
    Item: ({ children, highlight, ...rest }: ItemProps) => (
      <Item
        highlight={highlight}
        {...rest}
      >
        {children}
      </Item>
    ),
  },
)
