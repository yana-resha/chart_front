import { styled } from '@linaria/react'
import { Link } from 'react-router-dom'

import LeftChevron from '@/shared/assets/icons/left-chevron.svg?react'
import { TEXT_COLOR_VARIABLES } from '@/shared/assets/styles/colors'
import { MEDIA_POINTS } from '@/shared/assets/styles/media-points'
import { TEXT_SIZE } from '@/shared/assets/styles/text-size'

export const HeaderBackButtonContainer = styled(Link)`
  all: unset;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.2s;
  font-size: ${TEXT_SIZE.L};

  &:hover {
    filter: brightness(0.7);
  }

  &:active {
    filter: brightness(0.95);
  }

  &:disabled {
    filter: grayscale(100%);
  }

  @media (max-width: ${MEDIA_POINTS.TABLET}px) {
    font-size: ${TEXT_SIZE.M};
  }
`

export const HeaderBackIcon = styled(LeftChevron)`
  margin: 5px 0;
  font-size: 80%;
  height: fit-content;
`

export const HeaderBackText = styled.span`
  color: ${TEXT_COLOR_VARIABLES.PRIMARY_TEXT};
  line-height: 100%;
  font-weight: 500;
`
