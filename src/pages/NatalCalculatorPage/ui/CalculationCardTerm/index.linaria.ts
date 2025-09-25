import { styled } from '@linaria/react'

export const Term = styled.span`
  font-weight: 500;
  font-style: italic;
  color: rgba(5, 84, 145, 1) !important;
  cursor: pointer;
  white-space: nowrap;
  outline: none;
  transition: font-size 0.3s;

  &:focus-visible {
    font-size: 105%;
  }
`
