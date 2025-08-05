import { css } from '@linaria/core'
import { styled } from '@linaria/react'

export const IconContainer = styled.div`
  cursor: default;
  display: flex;
`

export const ModalIcon = css`
  svg {
    width: 5rem;
    height: 5rem;
  }
`

export const CrossContainer = styled.div`
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;
  background: none;
  border: none;
  cursor: pointer;
`

export const ModalHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1.875rem;
`

export const ModalTitle = styled.div`
  font-size: 1.25rem;
  font-weight: 500;
  margin-top: 1rem;
  color: white;
`

export const ModalSubtitle = styled.div`
  font-size: 0.875rem;
  font-weight: 500;
  letter-spacing: 0.15px;
  color: rgb(155, 156, 158);
  margin-top: 1rem;
  text-align: center;
`

export const ButtonsContainer = styled.div`
  cursor: pointer;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  justify-content: center;
`
