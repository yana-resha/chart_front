import { styled } from '@linaria/react'

export const Card = styled.div`
  background: #111;
  padding: 24px;
  border-radius: 12px;
  color: white;
  display: flex;
  flex-direction: column;
  gap: 20px;
`

export const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 18px;
`
export const PlanetImage = styled.span`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
`
export const Title = styled.div`
  font-size: 22px;
  font-weight: bold;
`
export const Paragraph = styled.div`
  line-height: 1.6;
`
