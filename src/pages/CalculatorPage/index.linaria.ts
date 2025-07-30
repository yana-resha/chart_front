import { styled } from '@linaria/react'

export const Container = styled.div`
  color: rgba(255, 255, 255, 1);
  height: 100%;
  display: grid;
  grid-template-rows: auto 1fr;
  min-width: 0;
`

export const HeaderContainer = styled.div`
  padding-left: 16px;
  padding-right: 16px;
`

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  container-type: inline-size;
`

export const FormBlock = styled.div`
  width: clamp(350px, 76.19cqw, 500px);
  /* padding: 16px;
  border-radius: 16px;
  background: rgba(26, 29, 33, 0.96);
  box-shadow:
    inset 0px 8px 12px 0px rgba(255, 255, 255, 0.04),
    0px 24px 64px -16px rgba(0, 0, 0, 0.24),
    inset 16px 24px 64px -24px rgba(255, 255, 255, 0.04); */
`
