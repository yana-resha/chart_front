import { css } from '@linaria/core'
import { styled } from '@linaria/react'

export const IconContainer = styled.div`
  cursor: default;
  display: flex;
`

export const ModalIcon = css`
  svg {
    width: 88px;
    height: 88px;
  }
`

export const CrossContainer = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  cursor: pointer;
`

export const ModalHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 32px;
`

export const ModalTitle = styled.div`
  font-size: 24px;
  font-weight: 500;
  margin-top: 16px;
  color: white;
`

export const ModalSubtitle = styled.div`
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 0.15px;
  color: rgb(155, 156, 158);
  margin-top: 16px;
  text-align: center;
`

export const ButtonsContainer = styled.div`
  cursor: pointer;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  justify-content: center;
`
