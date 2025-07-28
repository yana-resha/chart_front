import { styled } from '@linaria/react'

export const Card = styled.div`
  border-radius: 20px;
  padding: 20px;
  box-shadow:
    inset 0 0 60px rgba(19, 22, 25, 0.1),
    0 0 10px rgba(0, 0, 0, 0.1);
  background: rgba(13, 15, 16, 0.5);
  transition: box-shadow 0.3s ease;
  backdrop-filter: blur(1px) contrast(1.1) brightness(1.1);
  display: flex;
  flex-direction: column;
  gap: 24px;
`
export const Title = styled.div`
  font-size: 22px;
  font-weight: bold;
`
export const Paragraph = styled.div`
  font-size: 16px;
  line-height: 1.75;
`
