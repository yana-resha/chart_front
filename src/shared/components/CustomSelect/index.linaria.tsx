import { styled } from '@linaria/react'

import ShevronDownSvg from '@/shared/assets/icons/chevron-down.svg?react'

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`

export const ChevronDown = styled(ShevronDownSvg)`
  width: 24px;
  height: 24px;
  transition: transform 0.2s;
  cursor: pointer;
  &.isOpen {
    transform: rotate(180deg);
  }
`
