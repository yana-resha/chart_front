import { styled } from '@linaria/react'

import background from './background.png'

export const DefaultContainer = styled.div`
  display: grid;
  grid-template-columns: 312px 1fr;
  max-width: 100%;
  position: relative;
  min-height: 100%;
  height: 100%;
  max-height: fit-content;
  padding: 12px;
  gap: 12px;

  background-image: url(${background});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-attachment: fixed; // 🧠 ВАЖНО!
  animation: starsShift 120s linear infinite;
  

  &::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100dvh;
    background-image: url(${background});
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
    background-image: url(${background});
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

export const SidebarStaticWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`

export const SidebarContainer = styled.div`
  height: calc(100vh - 24px);
  position: sticky;
  top: 12px;
`

export const PagesContainer = styled.main`
  height: 100%;
  min-width: 0;
  width: 100%;
  position: relative;
`
