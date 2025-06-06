import React from 'react'

import { Container, Table, Th, Td, Tr } from './index.linaria'

interface TableProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

interface RowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  children: React.ReactNode
}

interface CellProps extends React.HTMLAttributes<HTMLTableCellElement> {
  children: React.ReactNode
}

interface ItemProps extends React.HTMLAttributes<HTMLTableCellElement> {
  children: React.ReactNode
  highlight?: boolean
}

export const SimpleMultiColumnTable = Object.assign(
  ({ children, ...rest }: TableProps) => (
    <Container {...rest}>
      <Table>{children}</Table>
    </Container>
  ),
  {
    HeaderRow: ({ children, ...rest }: RowProps) => (
      <thead>
        <Tr {...rest}>{children}</Tr>
      </thead>
    ),
    BodyRow: ({ children, ...rest }: RowProps) => <Tr {...rest}>{children}</Tr>,
    Header: ({ children, ...rest }: CellProps) => <Th {...rest}>{children}</Th>,
    Item: ({ children, highlight, ...rest }: ItemProps) => (
      <Td
        highlight={highlight}
        {...rest}
      >
        {children}
      </Td>
    ),
  },
)
