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

/** Пост */
export const Article = styled.article`
  margin-bottom: 32px;
`

export const MetaRowWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px 16px;
  align-items: center;
  color: rgba(255, 255, 255, 0.56);
  font-size: 14px;
  margin-bottom: 8px;
`

export const MetaRowTime = styled.time`
  font-variant-numeric: tabular-nums;
`

export const Cover = styled.figure`
  margin: 12px 0 0;
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 24px;
  overflow: hidden;
  background: #141824;

  > img {
    width: 100%;
    height: clamp(260px, 45vh, 440px);
    object-fit: cover;
    display: block;
  }
`

export const Prose = styled.div`
  margin-top: 24px;
  color: #e8ecf1;
  font-size: 16px;
  line-height: 1.72;

  h2 {
    font-size: 24px;
    margin: 24px 0 8px;
    line-height: 1.2;
  }
  h3 {
    font-size: 18px;
    margin: 20px 0 6px;
  }
  p {
    margin: 12px 0;
    font-size: 18px;
  }
  ul {
    margin: 8px 0 12px 16px;
  }
  li {
    margin: 6px 0;
  }
  blockquote {
    margin: 16px 0;
    padding: 12px 16px;
    border-left: 3px solid #6aa0ff;
    background: #141824;
    border-radius: 8px;
    color: #e8ecf1;
  }
  img {
    border-radius: 12px;
    max-width: 100%;
    height: auto;
  }

  /* обтекание для ::img */
  .wrap-left,
  .wrap-right {
    border-radius: 12px;
  }
  .wrap-left {
    float: left;
    margin: 6px 16px 12px 0;
  }
  .wrap-right {
    float: right;
    margin: 6px 0 12px 16px;
  }

  figure.wrap-left,
  figure.wrap-right {
    max-width: 44%;
  }
  figure img {
    width: 100%;
    height: auto;
    display: block;
    border-radius: 12px;
  }
  figcaption {
    font-size: 13px;
    color: rgba(255, 255, 255, 0.56);
    margin-top: 6px;
  }

  a {
    color: #9ecbff;
    text-decoration: underline;
    text-underline-offset: 2px;
    &:hover {
      opacity: 0.9;
    }
  }

  code {
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', monospace;
    font-size: 0.9em;
    background: #0f1320;
    border: 1px solid rgba(255, 255, 255, 0.12);
    padding: 0.1em 0.4em;
    border-radius: 6px;
  }

  pre code {
    display: block;
    padding: 12px 14px;
    border-radius: 10px;
    overflow-x: auto;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin: 14px 0;
    font-size: 0.95em;
  }
  th,
  td {
    border: 1px solid rgba(255, 255, 255, 0.16);
    padding: 8px 10px;
    text-align: left;
  }
  th {
    background: #141824;
    font-weight: 600;
  }

  /* clearfix */
  &::after {
    content: '';
    display: block;
    clear: both;
  }

  @media (max-width: 720px) {
    .wrap-left,
    .wrap-right,
    figure.wrap-left,
    figure.wrap-right {
      float: none;
      max-width: 100% !important;
      margin: 12px 0;
    }
  }
`

export const Separator = styled.hr`
  border: none;
  border-top: 1px solid rgba(255, 255, 255, 0.16);
  margin: 28px 0;
`

export const TagCloud = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`
