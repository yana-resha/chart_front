import { styled } from '@linaria/react'

export const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
`

export const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  font-size: 14px;
  line-height: 1.4;
  color: rgba(255, 255, 255, 0.8);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  width: 100%;
  overflow-x: auto;
`

export const Thead = styled.thead``

export const HeadRow = styled.tr``

export const HeaderCell = styled.th`
  position: sticky;
  top: 0;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.03));
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
  font-size: 16px;
  font-weight: 500;
  text-align: left;
  color: rgba(255, 255, 255, 1);
  padding: 8px;
`
export const Row = styled.tr``

export const RowHovered = styled.tr`
  &:hover {
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.03));
  }
`

export const Cell = styled.td`
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  padding: 6px 10px;
  vertical-align: top;

  &:last-child {
    border-right: none;
  }

  & > div {
    margin-bottom: 8px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &.highlight {
    color: rgb(22, 238, 246);
    font-weight: 600;
  }
`
export const Tbody = styled.tbody`
  tr:last-child td {
    border-bottom: none;
  }
`

export const Caption = styled.caption`
  caption-side: top;
  font-size: 16px;
  font-weight: 500;
  color: rgb(22, 238, 246);
  padding: 8px 0;
`
