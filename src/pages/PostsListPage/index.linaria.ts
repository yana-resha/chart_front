import { styled } from '@linaria/react'

import { MEDIA_POINTS } from '@/shared/assets/styles/media-points'
import { PageContentWrapper } from '@/shared/assets/styles/pages.linaria'
import { TEXT_SIZE } from '@/shared/assets/styles/text-size'

export const Container = styled.div`
  height: 100%;
  width: 100%;
  max-width: 100%;
  position: relative;
`

export const ContentWrapper = styled(PageContentWrapper)`
  padding-left: 1rem;
  padding-right: 1rem;
  padding-bottom: 1.875rem;

  @media (max-width: ${MEDIA_POINTS.TABLET}px) {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }
`

export const Lead = styled.p`
  text-align: center;
  margin: 0 0 30px 0;
  color: rgba(255, 255, 255, 0.85);
  font-size: ${TEXT_SIZE.M};
`

export const PostsBlock = styled.div`
  display: grid;
  gap: 20px;
`

export const List = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
`

export const Hairline = styled.div`
  height: 1px;
  margin: 10px 0 14px;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.16), transparent);
`
