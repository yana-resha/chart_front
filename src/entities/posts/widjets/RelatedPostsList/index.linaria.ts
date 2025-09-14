import { styled } from '@linaria/react'

export const RelatedGrid = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(1, minmax(0, 1fr));
`
