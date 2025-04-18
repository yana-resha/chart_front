import { styled } from '@linaria/react'

import LeftChevron from '@/shared/assets/icons/left-chevron.svg?react'
import { TEXT_COLOR_VARIABLES } from '@/shared/assets/styles/colors'

export const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  inline-size: 100%;
  min-block-size: 70px;
`

export const LeftChevronStyled = styled(LeftChevron)`
  margin: 5px;
  &:hover {
    cursor: pointer;
  }
`

export const HeaderText = styled.p`
  margin: 0;
  color: ${TEXT_COLOR_VARIABLES.PRIMARY_TEXT};
  font-size: 1.125rem;
`
