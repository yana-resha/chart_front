import { css } from '@linaria/core'
import { styled } from '@linaria/react'

import LoaderSVG from '../assets/louder.svg?react'
import CheckSVG from '@/shared/assets/icons/check.svg?react'
import { BTN_BACKGROUND_VARIABLES, SHARED_COLORS_VARIABLES } from '@/shared/assets/styles/colors'

export const CrossContainer = styled.div`
  position: absolute;
  top: 0.75rem;
  right: 1.25rem;
  background: none;
  border: none;
  cursor: pointer;
`

export const modalFlex = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 500px;
`

export const LoaderContainer = styled.div``
export const Loader = styled(LoaderSVG)`
  color: ${BTN_BACKGROUND_VARIABLES.NORM_PRIMARY};
  width: 2.5rem;
  height: 2.5rem;
`

export const Check = styled(CheckSVG)`
  width: 1.875rem;
  height: 1.875rem;
  stroke: ${SHARED_COLORS_VARIABLES.SUCCESS_COLOR};
`

export const ContentContainer = styled.div`
  text-align: center;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.8);
  font-size: clamp(12px, 0.875rem, 16px);
  line-height: 1.2;
  letter-spacing: 0.15px;
  flex-grow: 1;
`
