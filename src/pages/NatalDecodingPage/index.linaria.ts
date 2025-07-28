import { styled } from '@linaria/react'

import s from './s.png'

export const Layout = styled.div`
  height: 100%;
  width: 100%;
  background-image: url(${s});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-attachment: fixed; // 🧠 ВАЖНО!
  animation: starsShift 120s linear infinite;
  position: relative;

  &::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100dvh;
    background-image: url(${s});
    background-size: contain;
    background-repeat: repeat;
    background-position: center bottom;
    z-index: -1;
    opacity: 0.3;
    pointer-events: none;
    animation: starsDrift2 600s linear infinite;
  }

  &::after {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100dvh;
    background-image: url(${s});
    background-size: contain;
    background-repeat: repeat;
    background-position: center top;
    opacity: 0.5;
    pointer-events: none;
    animation: starsDrift1 500s linear infinite;
    z-index: -1;

  @keyframes starsShift {
    0% {
      background-position: center top;
    }
    50% {
      background-position: center bottom;
    }
    100% {
      background-position: center top;
    }
  }

  @keyframes starsDrift1 {
    0% {
      transform: rotate(60deg);
    }
    50% {
      transform: rotate(300deg);
    }
    100% {
      transform: rotate(60deg);
    }
  }

  @keyframes starsDrift2 {
    0% {
      transform: rotate(300deg);
    }
    50% {
      transform: rotate(-300deg);
    }
    100% {
      transform: rotate(300deg);
    }
  }
`

export const HeaderContainer = styled.div`
  padding-left: 16px;
  padding-right: 16px;
`

export const PageTitle = styled.h1`
  font-size: 30px;
  font-weight: 500;
  margin: 32px 0 24px;
  color: rgba(255, 255, 255, 1);
  line-height: 1.4;
  text-align: center;
  text-shadow:
    0 0 6px rgba(22, 238, 246, 0.1),
    0 0 12px rgba(22, 238, 246, 0.1),
    0 0 20px rgba(22, 238, 246, 0.15);
`

export const SectionTitle = styled.h2`
  font-size: 22px;
  font-weight: 500;
  padding-left: 16px;
  margin-bottom: 16px;
  line-height: 1.4;
  color: rgba(255, 255, 255, 0.9);
  text-shadow:
    0 0 6px rgba(22, 238, 246, 0.1),
    0 0 12px rgba(22, 238, 246, 0.1),
    0 0 20px rgba(22, 238, 246, 0.15);
`
