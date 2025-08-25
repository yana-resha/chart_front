import { styled } from '@linaria/react'

import { addAlpha } from '@/shared/helpers/addAlpha'
import { MEDIA_POINTS } from '@/shared/assets/styles/media-points'

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
`

export const ImageOverlay = styled.img`
  position: absolute;
  top: -1.25rem;
  right: -0.625rem;
  width: 160px;
  height: 160px;
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
`

export const ContentWrapper = styled.div`
  display: flex;
  gap: 1.5rem;
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
  }
`

export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`

export const Icon = styled.span`
  line-height: 100%;
  color: rgba(255, 255, 255, 1);
  font-size: 1.75rem;
  filter: drop-shadow(0 0 6px #55cdfc88);
`

export const Title = styled.h3`
  font-size: clamp(16px, 1.25rem, 22px);
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  line-height: 1.2;
  letter-spacing: 0.5px;

  @media (max-width: ${MEDIA_POINTS.DESKTOP_SMALL}px) {
    font-size: clamp(16px, 1.1rem, 20px);
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
`

export const Subtitle = styled.span`
  font-size: clamp(12px, 0.85rem, 16px);
  font-weight: 400;
  color: rgba(255, 255, 255, 0.6);
  margin-top: 2px;
  line-height: 1.2;
`

export const InterpritationBlock = styled.div`
  font-size: clamp(14px, 1rem, 18px);
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.85);
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  white-space: pre-wrap;

  @media (max-width: ${MEDIA_POINTS.DESKTOP_SMALL}px) {
    font-size: clamp(12px, 0.92rem, 16px);
    line-height: 1.5;
    gap: 1rem;
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
  font-size: 16px;
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
`

export const Satellite = styled.div`
  width: 48px;
  height: 48px;
  margin-bottom: 16px;
  svg {
    width: 100%;
    height: 100%;
    opacity: 0.8;
    fill: rgba(255, 255, 255, 0.5);
  }
`
