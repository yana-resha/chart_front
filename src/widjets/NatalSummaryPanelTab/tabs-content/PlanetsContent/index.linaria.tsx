import { styled } from '@linaria/react'

export const PlanetsContentLayout = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 30px;
  width: 100%;
  min-width: 0;
`

export const PlanetsSummaryTables = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  align-items: start;
  overflow: hidden;
`
