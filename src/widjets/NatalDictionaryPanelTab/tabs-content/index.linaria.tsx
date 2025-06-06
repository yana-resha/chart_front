import { styled } from '@linaria/react'

export const Layout = styled.div`
  padding: 30px 10px;
  position: relative;
`

export const Card = styled.div`
  position: relative;
  overflow: hidden;
`

export const Wrapper = styled.div`
  margin: 20px 20px;
  background: rgba(255, 255, 255, 0.1);
  overflow: hidden;
  position: relative;
  z-index: 2;
`

export const ContentWrapper = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
`

export const AccentLine = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 6px;
  height: 100%;
  background: linear-gradient(to bottom, #55cdfc, #886aff);
  border-radius: 6px;
  z-index: 2;
`

export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
`

export const Icon = styled.span`
  font-size: 28px;
  color: #55cdfc;
  filter: drop-shadow(0 0 6px #55cdfc88);
`

export const Title = styled.h3`
  font-size: 22px;
  font-weight: 600;
  color: #ffffff;
  letter-spacing: 0.6px;
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`

export const Paragraph = styled.p`
  font-size: 16px;
  line-height: 1.75;
  color: #d2d2d2;
  white-space: pre-wrap;

  &:first-letter {
    font-size: 120%;
    font-weight: 500;
    color: #ffffff;
  }
`
