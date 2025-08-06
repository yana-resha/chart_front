import { styled } from '@linaria/react'

export const Layout = styled.section`
  color: rgba(255, 255, 255, 1);
  height: 100%;
  display: grid;
  grid-template-rows: auto 1fr;
  min-width: 0;
`
export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  container-type: inline-size;
`

export const FormBlock = styled.div`
  width: clamp(350px, 76.19cqw, 500px);
`
