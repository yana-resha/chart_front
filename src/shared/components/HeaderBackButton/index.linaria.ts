import { styled } from '@linaria/react'

import LeftChevron from '@/shared/assets/icons/left-chevron.svg?react'
import { TEXT_COLOR_VARIABLES } from '@/shared/assets/styles/colors'

export const HeaderBackButtonContainer = styled.button`
  all: unset;
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    filter: brightness(0.7);
  }

  &:active {
    filter: brightness(0.95);
  }

  &:disabled {
    filter: grayscale(100%);
  }
`

export const HeaderBackIcon = styled(LeftChevron)`
  margin: 5px 0;
  width: 12px;
  height: fit-content;
`

export const HeaderBackText = styled.span`
  color: ${TEXT_COLOR_VARIABLES.PRIMARY_TEXT};
  font-size: 16px;
  line-height: 100%;
  font-weight: 500;
`
