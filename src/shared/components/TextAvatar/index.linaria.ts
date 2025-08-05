import { styled } from '@linaria/react'

export const Container = styled.div`
  border-radius: 50%;
  background-color: rgb(77, 167, 181);
  color: rgb(255, 255, 255);
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;

  &.large {
    font-size: 1.25rem;
    width: 3rem;
    height: 3rem;
  }

  &.medium {
    font-size: 1rem;
    width: 2.875rem;
    height: 2.875rem;
  }
`
