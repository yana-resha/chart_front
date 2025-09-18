import { styled } from '@linaria/react'

import InfoIcon from '@/shared/assets/icons/info-circle.svg?react'

export const Info = styled(InfoIcon)`
  line-height: 1;
  outline: 2px solid rgba(255, 255, 255, 0);
  transform: scale(1);
  border-radius: 50%;

  transition: all 0.3s ease-in-out;
  &:focus-visible {
    outline: none;
    outline: 2px solid rgba(255, 255, 255, 0.2);
    transform: scale(1.1);
  }
`
