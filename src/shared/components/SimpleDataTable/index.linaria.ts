import { styled } from '@linaria/react'

import { MEDIA_POINTS } from '@/shared/assets/styles/media-points'

export const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  display: flex;
`

export const Table = styled.table`
  width: 100%;
  max-width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  font-size: clamp(12px, 0.85rem, 16px);
  line-height: 1.4;
  color: rgba(255, 255, 255, 0.8);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.12);

  @media (max-width: ${MEDIA_POINTS.TABLET}px) {
    font-size: clamp(12px, 0.8rem, 16px);
  }
`

export const Thead = styled.thead``

export const HeadRow = styled.tr``

export const HeaderCell = styled.th`
  position: sticky;
  top: 0;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.03));
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
  font-size: 1rem;
  font-weight: 500;
  text-align: left;
  color: rgba(255, 255, 255, 1);
  padding: 8px;

  @media (max-width: ${MEDIA_POINTS.TABLET}px) {
    font-size: clamp(12px, 0.85rem, 16px);
  }
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

  @media (max-width: ${MEDIA_POINTS.TABLET}px) {
    padding: 5px 5px;
  }

  &:last-child {
    border-right: none;
  }

  & > div {
    margin-bottom: 0.5rem;

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
  font-size: 1rem;
  font-weight: 500;
  color: rgb(22, 238, 246);
  padding: 0.5rem 0;
`
