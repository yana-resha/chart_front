import { styled } from '@linaria/react'

import { FormInputContainer } from '@/shared/assets/styles/form'

export const ValuesContainer = styled(FormInputContainer)`
  cursor: pointer;
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;

  &:not(.invalid):focus-within {
    border-color: rgb(130, 219, 247);
    box-shadow: 0px 0px 0px 4px rgba(132, 220, 245, 0.24);
    outline: none;
  }

  &.invalid:focus-within {
    box-shadow: 0px 0px 0px 4px rgba(208, 48, 47, 0.24);
    outline: none;
  }
`
export const IconContainer = styled.div`
  cursor: inherit;
  display: flex;
`
export const Values = styled.div`
  flex-grow: 1;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`
