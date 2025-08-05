import { styled } from '@linaria/react'

import { SHARED_COLORS_VARIABLES } from '@/shared/assets/styles/colors'

export const Container = styled.div`
  display: grid;
  grid-template-columns: 100%;
  row-gap: 0.625rem;
`
export const Label = styled.label`
  font-size: 0.875rem;
  line-height: 1.25;
  color: rgba(155, 156, 158);
`
export const ErrorContainer = styled.div`
  font-size: 0.875rem;
  line-height: 1.25;
  letter-spacing: 0.15px;
  color: ${SHARED_COLORS_VARIABLES.ERROR_COLOR};
`
export const ValuesContainer = styled.div`
  cursor: pointer;
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

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }

  &.focus {
    border-color: rgb(130, 219, 247);
    box-shadow: 0px 0px 0px 4px rgba(132, 220, 245, 0.24);
  }

  &.invalid {
    border-color: ${SHARED_COLORS_VARIABLES.ERROR_COLOR};

    &.focus {
      box-shadow: 0px 0px 0px 4px rgba(208, 48, 47, 0.24);
    }
  }
`
export const IconContainer = styled.div`
  cursor: inherit;
  display: flex;
`
export const Values = styled.div`
  padding: 0;
  margin: 0;
  flex-grow: 1;
  height: 100%;
  font-size: 1rem;
  line-height: 1.5rem;
  font-weight: 500;
  color: rgb(205, 206, 207);

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  & .placeholder {
    color: rgb(155, 156, 158);
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`
