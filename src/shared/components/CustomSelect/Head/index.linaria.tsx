import { styled } from '@linaria/react'

import { FormInputContainer } from '@/shared/assets/styles/form'

export const ValuesContainer = styled(FormInputContainer)`
  cursor: pointer;
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
`
export const IconContainer = styled.div`
  cursor: inherit;
  display: flex;
`

export const Values = styled.button`
  flex-grow: 1;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: start;
`
