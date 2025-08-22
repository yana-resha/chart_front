import { styled } from '@linaria/react'

import ClearSVG from '@/shared/assets/icons/cross-circle-solid.svg?react'
import InfoSVG from '@/shared/assets/icons/info-circle.svg?react'
import { FormInputContainer } from '@/shared/assets/styles/form'

export const InputContainer = styled(FormInputContainer)`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  transition: all 0.2s;
`

export const ClearIcon = styled(ClearSVG)`
  width: 1.5rem;
  height: 1.5rem;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.7;
  }
`
export const InfoIcon = styled(InfoSVG)`
  cursor: pointer;
  transition: opacity 0.2s;
  &:hover {
    opacity: 0.7;
  }
`
export const IconContainer = styled.div`
  cursor: default;
  display: flex;
`
export const Input = styled.input`
  flex-grow: 1;
  height: 100%;
  text-overflow: ellipsis;
`
