import { styled } from '@linaria/react'

import { MEDIA_POINTS } from '@/shared/assets/styles/media-points'
import { TEXT_SIZE } from '@/shared/assets/styles/text-size'
import { addAlpha } from '@/shared/helpers/addAlpha'

export const Layout = styled.div`
  padding: 1.1rem 10px 0px 10px;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  min-width: 0;
  contain: layout paint;
`

export const Card = styled.div<{ glowColor?: string }>`
  position: relative;
  border-radius: 20px;
  padding: 1.25rem;
  box-shadow:
    inset 0 0 60px rgba(19, 22, 25, 0.1),
    0 0 10px rgba(0, 0, 0, 0.1);
  background: rgba(13, 15, 16, 0.5);
  transition: box-shadow 0.3s ease;
  backdrop-filter: blur(1px) contrast(1.1) brightness(1.1);

  &:hover {
    box-shadow:
      inset 0 0 120px ${({ glowColor }) => addAlpha(glowColor, 0.1) || 'rgba(19, 22, 25, 0.1)'},
      0 0 10px ${({ glowColor }) => addAlpha(glowColor, 0.1) || 'rgba(255, 255, 255, 0.1)'};
  }

  @media (max-width: ${MEDIA_POINTS.DESKTOP_SMALL}px) {
    padding: 1rem;
  }
`

export const ImageOverlay = styled.img`
  position: absolute;
  top: -1.25rem;
  right: -0.625rem;
  width: 10rem;
  height: 10rem;
  opacity: 0.6;
  animation: spin 20s linear infinite;
  transform-style: preserve-3d;
  filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.15));
  pointer-events: none;
  z-index: -1;

  @keyframes spin {
    0% {
      transform: rotate(20deg) scale(1);
    }
    50% {
      transform: rotate(15deg) scale(0.8);
    }
    100% {
      transform: rotate(20deg) scale(1);
    }
  }

  @media (max-width: ${MEDIA_POINTS.DESKTOP_SMALL}px) {
    width: 8.125rem;
    height: 8.125rem;
  }
`

export const ContentWrapper = styled.div`
  display: flex;
  gap: 1rem;
  flex-direction: column;
  padding-right: 1.25rem;
  padding-left: 1.25rem;

  @media (max-width: ${MEDIA_POINTS.DESKTOP_SMALL}px) {
    padding-right: 1rem;
    padding-left: 1rem;
    gap: 1rem;
  }

  @media (max-width: ${MEDIA_POINTS.TABLET}px) {
    gap: 0.5rem;
    padding-right: 0.5rem;
    padding-left: 0.5rem;
  }
`

export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;

  @media (max-width: ${MEDIA_POINTS.TABLET}px) {
    gap: 0.6rem;
  }
`

export const Icon = styled.span`
  line-height: 100%;
  color: rgba(255, 255, 255, 1);
  font-size: 1.5rem;
  filter: drop-shadow(0 0 6px #55cdfc88);

  @media (max-width: ${MEDIA_POINTS.TABLET}px) {
    font-size: 1.5rem;
  }
`

export const Title = styled.h3`
  font-size: clamp(16px, 1.15rem, 22px);
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  line-height: 1.2;
  letter-spacing: 0.5px;

  @media (max-width: ${MEDIA_POINTS.DESKTOP_SMALL}px) {
    font-size: clamp(16px, 1.1rem, 20px);
    line-height: 1.1;
  }

  @media (max-width: ${MEDIA_POINTS.TABLET}px) {
    font-size: clamp(16px, 1rem, 18px);
    line-height: 1.1;
  }
`

export const Highlight = styled.span`
  filter: drop-shadow(0 0 6px #55cdfc88);
  display: inline-flex;
`

/* если нужно в одну линию в заголовке сделать разные тэги */
export const TitleLine = styled.div`
  display: flex;
  align-items: baseline;
  gap: 6px;
  flex-wrap: wrap;
`

/* если нужна какая то подпись у заголовка */
export const TitleSubTag = styled.span`
  font-size: clamp(12px, 0.85rem, 16px);
  font-weight: 400;
  color: rgba(255, 255, 255, 0.65);
  font-style: italic;

  @media (max-width: ${MEDIA_POINTS.DESKTOP_SMALL}px) {
    font-size: clamp(11px, 0.8125rem, 15px);
    line-height: 1.1;
  }
`

export const Subtitle = styled.span`
  font-size: clamp(12px, 0.85rem, 16px);
  font-weight: 400;
  color: rgba(255, 255, 255, 0.6);
  margin-top: 2px;
  line-height: 1.2;

  @media (max-width: ${MEDIA_POINTS.DESKTOP_SMALL}px) {
    font-size: clamp(11px, 0.8125rem, 15px);
    line-height: 1.1;
  }
`

export const InterpritationBlock = styled.div`
  font-size: ${TEXT_SIZE.M};
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.85);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  white-space: pre-wrap;

  @media (max-width: ${MEDIA_POINTS.DESKTOP_SMALL}px) {
    font-size: clamp(12px, 0.92rem, 16px);
    line-height: 1.5;
    gap: 0.7rem;
  }

  @media (max-width: ${MEDIA_POINTS.TABLET}px) {
    font-size: clamp(12px, 0.875rem, 16px);
    gap: 0.5rem;
  }

  & p {
    &:first-child {
      &:first-letter {
        font-size: 130%;
        font-weight: 500;
      }
    }
  }

  & strong {
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
  }

  & em {
    font-style: italic;
    opacity: 0.9;
  }

  & a {
    color: #55cdfc;
    text-decoration: underline;
    &:hover {
      text-decoration: none;
    }
  }
`

export const EmptyCard = styled(Card)`
  border-radius: 20px;
  padding: 32px;
  background: rgba(255, 255, 255, 0.025);
  box-shadow:
    inset 0 0 80px rgba(255, 255, 255, 0.02),
    0 0 12px rgba(0, 0, 0, 0.1);
  color: rgba(255, 255, 255, 0.7);
  font-size: ${TEXT_SIZE.M};
  font-style: italic;
  line-height: 1.7;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  position: relative;
  backdrop-filter: blur(1.5px) brightness(1.1);
  transition: all 0.3s ease;

  @media (max-width: ${MEDIA_POINTS.TABLET}px) {
    font-size: ${TEXT_SIZE.S};
  }
`
