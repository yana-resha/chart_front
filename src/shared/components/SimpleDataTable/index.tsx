import React from 'react'

import { Table, HeadRow, HeaderCell, Row, RowHovered, Cell, Tbody } from './index.linaria'

interface SimpleDataTableProps extends React.HTMLAttributes<HTMLTableElement> {
  children: React.ReactNode
}

interface BodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  children: React.ReactNode
}

interface RowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  children: React.ReactNode
}

interface CellProps extends React.HTMLAttributes<HTMLTableCellElement> {
  children: React.ReactNode
  highlight?: boolean
}

export const SimpleDataTable = Object.assign(
  ({ children, ...rest }: SimpleDataTableProps) => <Table {...rest}>{children}</Table>,
  {
    HeadRow: ({ children, ...rest }: RowProps) => (
      <thead>
        <HeadRow {...rest}>{children}</HeadRow>
      </thead>
    ),
    TBody: ({ children, ...rest }: BodyProps) => <Tbody {...rest}>{children}</Tbody>,
    Row: ({ children, ...rest }: RowProps) => <Row {...rest}>{children}</Row>,
    RowHovered: ({ children, ...rest }: RowProps) => <RowHovered {...rest}>{children}</RowHovered>,
    Header: ({ children, ...rest }: CellProps) => <HeaderCell {...rest}>{children}</HeaderCell>,
    Cell: ({ children, highlight, ...rest }: CellProps) => (
      <Cell
        className={highlight ? 'highlight' : ''}
        {...rest}
      >
        {children}
      </Cell>
    ),
  },
)
