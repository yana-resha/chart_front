import { css } from '@linaria/core'
import { styled } from '@linaria/react'

import LoaderSVG from '../assets/Louder.svg?react'
import CheckSVG from '@/shared/assets/icons/check.svg?react'
import { SHARED_COLORS_VARIABLES } from '@/shared/assets/styles/colors'

export const CrossContainer = styled.div`
  position: absolute;
  top: 12px;
  right: 20px;
  background: none;
  border: none;
  cursor: pointer;
`

export const modalFlex = css`
  display: flex;
  flex-direction: row;
  width: 540px;
  align-items: start;
`

export const LoaderContainer = styled.div``
export const Loader = styled(LoaderSVG)`
  width: 48px;
  height: 48px;
  animation: 1s rotate infinite linear;
  @keyframes rotate {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
`

export const Check = styled(CheckSVG)`
  width: 30px;
  height: 30px;
  stroke: ${SHARED_COLORS_VARIABLES.SUCCESS_COLOR};
`

export const ContentContainer = styled.div`
  text-align: center;
  font-weight: 500;
  color: rgba(155, 156, 158, 1);
  font-size: 16px;
  line-height: 25px;
  letter-spacing: 0.15px;
  flex-grow: 1;
`
