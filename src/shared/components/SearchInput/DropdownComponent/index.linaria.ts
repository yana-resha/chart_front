import { styled } from '@linaria/react'

import { DropdownItem, DropdownItemIconContainer } from '@/shared/assets/styles/form'

export const DropdownContainer = styled.div`
  display: flex;
  padding-top: 10px;
  padding-bottom: 10px;
`

export const DropdownItemElement = styled(DropdownItem)`
  &:hover ${DropdownItemIconContainer} {
    opacity: 1;
  }
`
