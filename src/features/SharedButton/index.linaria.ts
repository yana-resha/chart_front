import { css } from '@linaria/core'
import { styled } from '@linaria/react'

import ShareSvg from '@/shared/assets/icons/share.svg?react'
import { MEDIA_POINTS } from '@/shared/assets/styles/media-points'
import { glassBackground, glassBorder, glassBorderSide, glassShadow } from '@/shared/assets/styles/glass'

export const dropdownContainer = css`
  padding: 20px;
  min-width: 0;
  width: 500px;
`

export const Title = styled.div`
  font-size: 1.06rem;
  font-weight: 600;
  margin-bottom: 0.375rem;
  color: rgba(255, 255, 255, 1);
  text-align: center;
`
export const Description = styled.div`
  font-size: clamp(12px, 0.875rem, 16px);
  margin-bottom: clamp(10px, 1rem, 20px);
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.4;
  text-align: center;
  display: flex;
  justify-content: center;
  gap: 6px;
`
export const LinkBlock = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  word-break: break-word;
  border-radius: 18px;

  ${glassShadow()};
  ${glassBackground()};
  ${glassBorder()};

  padding: 0.5rem 0.75rem;
  cursor: pointer;

  transition: all 0.2s ease;

  margin-bottom: 1.25rem;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
  }
`
export const LinkText = styled.span`
  flex: 1;
  font-size: clamp(12px, 0.81rem, 16px);
  color: white;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const IconLink = styled.a`
  display: block;
  width: 1.875rem;
  height: 1.875rem;

  border-radius: 6px;
  overflow: hidden;
  transition:
    box-shadow 0.2s ease,
    background 0.2s ease;
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(2px);

  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 100%;
    height: 100%;
  }

  &:hover {
    box-shadow:
      0 0 6px rgba(22, 238, 246, 0.15),
      0 0 12px rgba(22, 238, 246, 0.2);
    background: rgba(255, 255, 255, 0.07);
  }

  &:active {
    box-shadow: 0 0 4px rgba(22, 238, 246, 0.2) inset;
  }
`

export const ShareFooter = styled.div`
  padding-top: 12px;
  position: relative;
  ${glassBorderSide('top')};
  text-align: center;
`

export const ShareLabel = styled.div`
  font-size: clamp(12px, 0.81rem, 16px);
  margin-bottom: 8px;
  color: rgba(255, 255, 255, 0.8);
`
export const ShareIcons = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
`

export const ButtonContent = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
`

export const ShakyIcon = styled.span`
  display: inline-flex;
  transform-origin: center;
`

export const ShareIcon = styled(ShareSvg)`
  font-size: 1.125rem;

  @media (max-width: ${MEDIA_POINTS.TABLET}px) {
    font-size: 1rem;
  }
`
