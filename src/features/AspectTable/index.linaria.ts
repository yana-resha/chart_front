import { css } from '@linaria/core'
import { styled } from '@linaria/react'

export const TableWrapper = styled.div`
  overflow: auto;
  display: inline-block;
`

export const Table = styled.table`
  border-collapse: collapse;
  table-layout: fixed;
`

export const cellStyle = css`
  width: 25px;
  height: 25px;
  border: 1px solid rgba(255, 255, 255, 0.6);
  background: transparent;
  transition: all 0.5s ease-in-out;

  &.planetActive {
    background: rgba(255, 255, 255, 0.2);
  }
`

export const cellContentStyle = css`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const CellContent = styled.div<{ $color?: string }>`
  color: ${(props) => props.$color ?? 'white'};
  font-size: 0.875rem;
  font-family: 'Hamburg';
  cursor: pointer;
`
export const DiagonalCellContent = styled.div`
  font-weight: 400;
  font-size: 0.875rem;
  width: 100%;
  height: 100%;
  font-family: 'Hamburg';
  cursor: pointer;
  text-align: center;
  vertical-align: middle;
  color: white;
  opacity: 0.6;
  transition: all 0.2s ease-in-out;
`
export const diagonalCellContentStyle = css`
  width: 100%;
  height: 100%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &.planetActive ${DiagonalCellContent} {
    opacity: 1;
  }

  &.aspectActive ${DiagonalCellContent} {
    opacity: 1;
    text-shadow:
      0 0 4px rgba(22, 238, 246, 0.6),
      0 0 6px rgba(22, 238, 246, 0.4);
  }
`

export const AspectTooltipContent = styled.div``
export const TooltipTitle = styled.div`
  font-size: 0.875rem;
  font-weight: 500;
  &:not(:last-child) {
    margin-bottom: 0.625rem;
  }
`
export const TooltipList = styled.div`
  &:not(:last-child) {
    margin-bottom: 0.625rem;
  }
`
export const TooltipItem = styled.div`
  font-size: 0.75rem;
`
export const hamburgFamilyStyle = css`
  font-family: 'Hamburg';
`
export const PlanetTooltipContent = styled.div``
