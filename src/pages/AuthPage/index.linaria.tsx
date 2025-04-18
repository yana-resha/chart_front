import { styled } from '@linaria/react'

import RightBackground from './assets/back.png'

export const Container = styled.div`
  min-height: 100%;
  display: grid;
  grid-template-columns: 45.2% 54.9%;
  container-type: inline-size;
`
export const LeftSide = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  container-type: inline-size;
`

export const FormContainer = styled.div`
  width: clamp(250px, 76.19cqw, 496px);
`

export const FormTitle = styled.div`
  color: rgba(255, 255, 255, 1);
  font-size: clamp(20px, 6cqi, 36px);
  line-height: 122%;
  font-weight: 500;
  margin-bottom: 44px;
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`

export const FormInputField = styled.div`
  &:not(:last-child) {
    margin-bottom: 32px;
  }

  &:last-child {
    margin-bottom: 42px;
  }

  & svg {
    width: 24px;
    height: 24px;
  }
`

export const FormBtnContainer = styled.div`
  display: grid;
  gap: 12px;
`

export const RightSide = styled.div`
  background: url(${RightBackground});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding-left: 5.95%;
  padding-right: 5.83%;
  padding-bottom: 7.88cqh;
  container-type: size;
`

export const Title = styled.div`
  color: rgba(255, 255, 255, 1);
  font-size: clamp(20px, 5.15cqi, 36px);
  line-height: 111%;
  font-weight: 600;

  & span {
    color: rgb(17, 175, 44, 1);
    font-weight: inherit;
    font-size: clamp(20px, 5.15cqi, 36px);
    line-height: 111%;
  }
`
