import { styled } from '@linaria/react'

export const TabPanelContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  gap: 8px;
  overflow: scroll;
  max-width: 400px;

  &::-webkit-scrollbar {
    display: none;
  }
`
