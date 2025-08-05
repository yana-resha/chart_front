import { styled } from '@linaria/react'

export const Container = styled.div`
  color: rgba(255, 255, 255, 1);
  padding-top: 150px;
  padding-bottom: 50px;
`

export const Block = styled.div`
  padding: 1rem;
  border-radius: 16px;
  display: flex;
  flex-direction: row;
  gap: 16px;
  background: rgba(255, 255, 255, 0.8);
  box-shadow:
    inset 0px 8px 12px 0px rgba(255, 255, 255, 0.04),
    0px 24px 64px -16px rgba(0, 0, 0, 0.24),
    inset 16px 24px 64px -24px rgba(255, 255, 255, 0.04);
`
