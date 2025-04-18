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
    font-size: 18px;
    width: 48px;
    height: 48px;
  }

  &.medium {
    font-size: 16px;
    width: 46px;
    height: 46px;
  }
`
