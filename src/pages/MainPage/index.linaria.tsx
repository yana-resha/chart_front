import { styled } from '@linaria/react'

export const Layout = styled.div`
  height: 100%;
  width: 100%;
  max-width: 100%;
  position: relative;
  background: red;
`
export const HeroSection = styled.article`
  width: 100%;
  min-height: calc(100dvh - 25px);
  border: 1px solid rgba(255, 255, 255, 0.08);

  display: flex;
  flex-direction: column;
`

export const HeroContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: rgba(255, 255, 255, 0.85);
  max-width: calc(430px + 10%);
  padding-left: 10%;
`

export const HeroTitle = styled.h1`
  margin: 0;
  color: rgba(200, 230, 255, 0.8);
  font-size: clamp(40px, 7vw, 80px);
  font-weight: 500;
  line-height: 1.05;
`

export const HeroSubtitle = styled.h2`
  margin: 0 0 20px 0;
  font-weight: 400;
  line-height: 1.15;
  color: rgba(200, 230, 255, 0.7);
  font-size: clamp(18px, 2.4vw, 28px);
  letter-spacing: 1.2px;
`

export const HeroLead = styled.p`
  margin: 0 0 30px 0;
  font-weight: 400;
  line-height: 1.6;
  color: rgba(200, 230, 255, 0.6);
  font-size: clamp(14px, 1.6vw, 18px);
`

export const HeroButtonsBlock = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: fit-content;
  gap: 10px;

  /* ширина ровно по кнопкам, не растягиваем */
  align-self: flex-start;
`
