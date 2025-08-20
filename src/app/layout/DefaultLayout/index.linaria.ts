import { styled } from '@linaria/react'

import background from './background.png'
import { MEDIA_POINTS } from '@/shared/assets/styles/media-points'

export const DefaultContainer = styled.div`
  /* базовая сетка: слева сайдбар, справа страница */
  display: grid;
  grid-template-columns: 312px 1fr;
  grid-template-areas: 'sidebar main';
  gap: 0.75rem;
  padding: 0.75rem;

  max-width: 100%;
  position: relative;
  min-height: 100%;
  height: 100%;
  max-height: fit-content;

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
    inset: 0;
    height: 100dvh;
    background-image: url(${background});
    background-size: contain;
    background-repeat: repeat;
    background-position: center top;
    opacity: 0.5;
    pointer-events: none;
    animation: starsDrift1 500s linear infinite;
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

  /* планшет и ниже: сайдбар наверх, одна колонка */
  @media (max-width: ${MEDIA_POINTS.TABLET}px) {
    padding: 0;
    grid-template-columns: 1fr;
    grid-template-areas:
      'sidebar'
      'main';
  }
`

export const SidebarStaticWrapper = styled.div`
  grid-area: sidebar;
  width: 100%;
  height: 100%;
  position: relative;

  /* планшет: обычный поток, авто-высота */
  @media (max-width: ${MEDIA_POINTS.TABLET}px) {
    // position: sticky;
    // z-index: 1;
    // top: max(0px, env(safe-area-inset-top)); /* iOS вырезы */
    height: auto;
  }
`

export const SidebarContainer = styled.div`
  /* десктоп: фиксируем панель */
  height: calc(100vh - 1.5rem);
  position: sticky;
  top: 0.75rem;

  /* планшет: обычный поток, авто-высота */
  @media (max-width: ${MEDIA_POINTS.TABLET}px) {
    position: static;
    top: 0;
    height: auto;
  }
`

export const PagesContainer = styled.main`
  grid-area: main;
  height: 100%;
  min-width: 0;
  width: 100%;
  position: relative;

  @media (max-width: ${MEDIA_POINTS.TABLET}px) {
    padding: 0.75rem;
  }
`
