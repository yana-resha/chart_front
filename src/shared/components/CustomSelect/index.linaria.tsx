import { styled } from '@linaria/react'

import ShevronDownSvg from '@/shared/assets/icons/chevron-down.svg?react'

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`

export const ChevronDown = styled(ShevronDownSvg)`
  width: 1.5rem;
  height: 1.5rem;
  transition: transform 0.2s;
  cursor: pointer;
  &.isOpen {
    transform: rotate(180deg);
  }
`
