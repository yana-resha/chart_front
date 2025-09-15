import { styled } from '@linaria/react'

import background from './background.png'

export const BackgroundContainer = styled.div`
  max-width: 100%;
  width: 100%;
  min-width: 350px;
  min-height: 100%;
  position: relative;

  background-image: url(${background});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-attachment: fixed; /* 🧠 ВАЖНО! */
  animation: starsShift 120s linear infinite;

  &::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image: url(${background});
    background-size: contain;
    background-repeat: repeat;
    background-position: center bottom;
    z-index: -1;
    opacity: 0.3;
    pointer-events: none;
    animation: starsDrift2 500s linear infinite;
  }

  &::after {
    content: '';
    position: fixed;
    inset: 0;
    height: 100dvh;
    background-image: url(${background});
    background-size: contain;
    background-repeat: repeat;
    background-position: center top;
    opacity: 0.5;
    pointer-events: none;
    animation: starsDrift1 300s linear infinite;
    z-index: -1;
  }

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

export const AppContainer = styled.div`
  max-width: 100%;
  width: 1440px;
  min-width: 350px;
  margin: 0 auto;
  min-height: 100%;
`
