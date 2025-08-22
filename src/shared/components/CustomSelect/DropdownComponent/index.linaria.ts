import { styled } from '@linaria/react'

import CheckSvg from '@/shared/assets/icons/check.svg?react'
import { DropdownItem } from '@/shared/assets/styles/form'

export const CheckIcon = styled(CheckSvg)`
  opacity: 0;
  &.show {
    opacity: 1;
  }
  transition: opacity 0.2s;
`
export const OptionItem = styled(DropdownItem)``
