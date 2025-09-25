import { styled } from '@linaria/react'

import { MEDIA_POINTS } from '@/shared/assets/styles/media-points'

export const DefaultContainer = styled.div`
  display: grid;
  grid-template-columns: 312px 1fr;
  grid-template-areas: 'sidebar main';
  gap: 0.75rem;

  max-width: 100%;
  position: relative;
  min-height: 100%;
  /* планшет и ниже: сайдбар наверх, одна колонка */
  @media (max-width: ${MEDIA_POINTS.TABLET}px) {
    gap: 0;
    padding: 0;
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
    grid-template-areas:
      'sidebar'
      'main';
  }
`

export const SidebarStaticWrapper = styled.div`
  grid-area: sidebar;
  width: 100%;
  height: 100%;
  /* position: relative; */

  /* планшет: обычный поток, авто-высота */
  @media (max-width: ${MEDIA_POINTS.TABLET}px) {
    // position: sticky;
    // z-index: 1;
    // top: max(0px, env(safe-area-inset-top)); /* iOS вырезы */
    height: fit-content;
  }
`

export const SidebarContainer = styled.div`
  /* десктоп: фиксируем панель */
  height: 100dvh;
  position: sticky;
  padding-top: 1rem;
  padding-bottom: 1rem;
  top: 0;

  /* планшет: обычный поток, авто-высота */
  @media (max-width: ${MEDIA_POINTS.TABLET}px) {
    position: static;
    top: 0;
    height: fit-content;
    padding-top: 0rem;
    padding-bottom: 0rem;
  }
`

export const PagesContainer = styled.main`
  grid-area: main;
  height: 100%;
  min-width: 0;
  width: 100%;
  /* position: relative; */
`
