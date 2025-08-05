import { styled } from '@linaria/react'

import checkIMG from './assets/check.svg'
import { BTN_BACKGROUND_VARIABLES } from '@/shared/assets/styles/colors'

export const Input = styled.input`
  padding: 0;
  margin: 0;
  width: 1.5rem;
  height: 1.5rem;
  position: absolute;
  opacity: 0;
  z-index: -1;
`

export const CheckboxContainer = styled.label`
  display: inline-flex;
  align-items: center;
  user-select: none;
  column-gap: 1rem;
  cursor: pointer;
  &::before {
    content: '';
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
    outline: 1px solid rgb(54, 58, 61);
    border-radius: 4px;
    box-shadow:
      0px 1px 3px 0px rgba(0, 0, 0, 0.05),
      0px 1px 2px -1px rgba(0, 0, 0, 0.05);
    background: rgb(26, 29, 33);
    transition:
      outline 0.2s,
      opacity 0.2s;
  }

  &:has(${Input}:checked):before {
    outline: 1px solid transparent;
    box-shadow:
      0px 1px 3px 0px rgba(0, 0, 0, 0.05),
      0px 1px 2px -1px rgba(0, 0, 0, 0.05);
    background:
      url(${checkIMG}) center no-repeat,
      ${BTN_BACKGROUND_VARIABLES.PRIMARY_GRADIENT_BUTTON};
    overflow: hidden;
  }

  &:hover::before,
  &:has(${Input}:checked):hover::before {
    outline: 2px solid rgb(54, 58, 61);
  }

  &:has(${Input}:disabled) {
    pointer-events: none;
    opacity: 0.5;
  }

  &:active::before {
    outline: 1px solid rgb(54, 58, 61);
  }
`
