import { css } from '@linaria/core'
import { styled } from '@linaria/react'

export const dropdownContainer = css`
  background: rgba(19, 22, 25, 0.9);
  border: 1px solid rgba(54, 58, 61, 0.6);
  border-radius: 12px;
  padding: 20px;
  min-width: 0;
  width: 500px;
  backdrop-filter: blur(6px);
  box-shadow:
    0 0 10px rgba(22, 238, 246, 0.03),
    0 0 25px rgba(22, 238, 246, 0.05);

  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow:
      0 0 14px rgba(22, 238, 246, 0.05),
      0 0 40px rgba(22, 238, 246, 0.08);
  }
`

export const Emoji = styled.span`
  animation: twinkle 1.6s infinite ease-in-out;
  @keyframes twinkle {
    0% {
      transform: scale(0.8);
    }
    50% {
      transform: scale(1.1);
    }

    100% {
      transform: scale(0.8);
    }
  }
`
export const Title = styled.div`
  font-size: 1.06rem;
  font-weight: 600;
  margin-bottom: 0.375rem;
  color: rgba(255, 255, 255, 1);
  text-align: center;
  text-shadow:
    0 0 6px rgba(22, 238, 246, 0.1),
    0 0 12px rgba(22, 238, 246, 0.1),
    0 0 20px rgba(22, 238, 246, 0.15);
`
export const Description = styled.div`
  font-size: clamp(12px, 0.875rem, 16px);
  font-style: italic;
  margin-bottom: clamp(10px, 1rem, 20px);
  color: rgba(255, 255, 255, 0.8);
  text-shadow:
    0 0 6px rgba(22, 238, 246, 0.1),
    0 0 12px rgba(22, 238, 246, 0.1),
    0 0 20px rgba(22, 238, 246, 0.15);
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

  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 18px;

  padding: 0.5rem 0.75rem;
  cursor: pointer;

  transition: all 0.2s ease;
  backdrop-filter: blur(4px);
  box-shadow: 0 0 4px rgba(22, 238, 246, 0.05);

  margin-bottom: 1.25rem;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    box-shadow: 0 0 8px rgba(22, 238, 246, 0.12);
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
  border-top: 1px solid rgba(255, 255, 255, 0.1);
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
