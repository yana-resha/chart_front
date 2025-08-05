import { css } from '@linaria/core'
import { styled } from '@linaria/react'

export const modalFlex = css`
  display: flex;
  flex-direction: column;
  min-width: 728px;
  align-items: stretch;
  gap: 2.5rem;
`

export const ModalHeader = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  gap: 10px;

  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  font-size: 1.5rem;
  line-height: 1.3;
`
export const ModalBody = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  margin: -10px;
  padding: 10px;
`
export const ModalFooter = styled.div``
