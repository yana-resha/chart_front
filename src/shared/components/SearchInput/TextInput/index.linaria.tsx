import { styled } from '@linaria/react'

import ClearSVG from '@/shared/assets/icons/cross-circle-solid.svg?react'
import InfoSVG from '@/shared/assets/icons/info-circle.svg?react'
import { SHARED_COLORS_VARIABLES } from '@/shared/assets/styles/colors'

export const Container = styled.div`
  display: grid;
  grid-template-columns: 100%;
  row-gap: 10px;
`
export const Label = styled.label`
  font-size: clamp(12px, 0.875rem, 16px);
  line-height: 1.2rem;
  color: rgba(155, 156, 158);
`
export const ErrorContainer = styled.div`
  font-size: clamp(12px, 0.875rem, 16px);
  line-height: 1.2rem;
  letter-spacing: 0.15px;
  color: ${SHARED_COLORS_VARIABLES.ERROR_COLOR};
`
export const InputContainer = styled.div`
  background-color: rgb(26, 29, 33);
  border: 1px solid rgb(54, 58, 61);
  border-radius: 8px;
  min-height: 100%;
  color: white;
  position: relative;
  min-height: 48px;
  padding: 0.75rem 1.06rem 0.75rem 1.18rem;
  display: flex;
  flex-direction: row;
  column-gap: 0.75rem;
  align-items: center;
  transition: all 0.2s;

  &:hover {
    box-shadow: 0px 0px 0px 4px rgba(54, 58, 61, 0.24);
  }

  &.disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }

  &:has(input:focus) {
    border-color: rgb(130, 219, 247);
    box-shadow: 0px 0px 0px 4px rgba(132, 220, 245, 0.24);
  }

  &.invalid {
    border-color: ${SHARED_COLORS_VARIABLES.ERROR_COLOR};

    &:has(input:focus) {
      box-shadow: 0px 0px 0px 4px rgba(208, 48, 47, 0.24);
    }
  }
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
  width: 1.5rem;
  height: 1.5rem;
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
  padding: 0;
  margin: 0;
  flex-grow: 1;
  height: 100%;
  font-size: 1rem;
  line-height: 1.3;
  font-weight: 500;
  color: rgb(205, 206, 207);
  outline: none;
  border: none;
  background-color: transparent;
  text-overflow: ellipsis;

  &:placeholder: {
    color: rgb(155, 156, 158);
  }
`
