import { css } from '@linaria/core'
import { styled } from '@linaria/react'

import { SHARED_COLORS_VARIABLES } from '@/shared/assets/styles/colors'

export const Container = styled.div`
  display: grid;
  grid-template-columns: 100%;
`

export const Label = styled.label`
  font-size: clamp(12px, 0.875rem, 16px);
  line-height: 1.2;
  color: rgba(155, 156, 158);
  margin-bottom: 10px;
`
export const ErrorContainer = styled.div`
  font-size: clamp(12px, 0.875rem, 16px);
  line-height: 1.2;
  color: ${SHARED_COLORS_VARIABLES.ERROR_COLOR};
  overflow: hidden;
  height: 1.25rem;
  max-height: 0;
  margin-top: 0;
  transition:
    max-height 0.2s,
    margin-top 0.1s;

  &:not(:empty) {
    margin-top: 1rem;
    opacity: 1;
    max-height: 100px;
  }
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

  &.isActive {
    border-color: rgb(130, 219, 247);
    box-shadow: 0px 0px 0px 4px rgba(132, 220, 245, 0.24);
  }

  &.invalid {
    border-color: ${SHARED_COLORS_VARIABLES.ERROR_COLOR};

    &.isActive {
      box-shadow: 0px 0px 0px 4px rgba(208, 48, 47, 0.24);
    }
  }
`
export const IconContainer = styled.div`
  cursor: default;
  display: flex;
`
export const defaultIconConstainerCSS = css`
  cursor: pointer;
`
export const inputCSS = css`
  padding: 0;
  margin: 0;
  flex-grow: 1;
  height: 100%;
  font-size: clamp(12px, 0.875rem, 16px);
  line-height: 1.4;
  font-weight: 500;
  color: rgb(205, 206, 207);
  letter-spacing: 0.15px;
  outline: none;
  border: none;
  background-color: transparent;

  &:placeholder: {
    color: rgb(155, 156, 158);
  }

  &[type='date']::-webkit-calendar-picker-indicator,
  &[type='time']::-webkit-calendar-picker-indicator {
    display: none;
  }
`
