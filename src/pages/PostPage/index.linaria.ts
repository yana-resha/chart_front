import { styled } from '@linaria/react'

import { MEDIA_POINTS } from '@/shared/assets/styles/media-points'
import { PageContentWrapper } from '@/shared/assets/styles/pages.linaria'

/** Центровщик внутри твоего PagesContainer (<main>) */
export const Container = styled.div`
  height: 100%;
  width: 100%;
  max-width: 100%;
  position: relative;
`

export const ContentWrapper = styled(PageContentWrapper)`
  padding-left: 1rem;
  padding-right: 1rem;

  @media (max-width: ${MEDIA_POINTS.TABLET}px) {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }
`

export const Separator = styled.hr`
  border: none;
  border-top: 1px solid rgba(255, 255, 255, 0.16);
  margin: 28px 0;
`
