import { styled } from '@linaria/react'

export const TabPanelContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  gap: 8px;
  overflow: scroll;
  max-width: 100%;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.5), transparent);
    border-radius: 10px;
    z-index: 0;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`

export const ContentContainer = styled.div``
