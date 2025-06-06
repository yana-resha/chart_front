import { styled } from '@linaria/react'

import { SimpleDataTable } from '@/shared/components/SimpleDataTable'

export const CustomRowHovered = styled(SimpleDataTable.RowHovered)`
  &.highlight {
    background: linear-gradient(to right, rgba(22, 238, 246, 0.15), rgba(22, 238, 246, 0.1));
    color: rgba(22, 238, 246, 0.9);
    font-weight: 600;

    &:hover {
      background: linear-gradient(to right, rgba(22, 238, 246, 0.25), rgba(22, 238, 246, 0.15));
    }
  }

  &.empty {
    background: linear-gradient(to right, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.015));
    color: rgba(255, 255, 255, 0.5);

    &:hover {
      background: linear-gradient(to right, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.025));
    }
  }

  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }
`

export const FictionCell = styled(SimpleDataTable.Cell)`
  color: rgba(255, 255, 255, 0.5);
  font-style: italic;
  font-weight: 300;

  tr:hover & {
    color: rgba(255, 255, 255, 0.7);
  }
`

export const WeightCell = styled(SimpleDataTable.Cell)`
  font-weight: 500;
`
