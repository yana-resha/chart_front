import { css } from '@linaria/core'
import { styled } from '@linaria/react'

interface TabContainerProps {
  $active?: boolean
}

export const Label = styled.div``

export const TabContainer = styled.div<TabContainerProps>`
  flex: 100 1 0;
  white-space: nowrap;

  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 10px 20px;
  border-radius: 8px;
  transition:
    color 0.3s,
    box-shadow 0.3s,
    background 0.3s;

  /* мягкое свечение прямо под табом */
  &::before {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 50%;
    transform: translateX(-50%) scaleX(${({ $active }) => ($active ? 1 : 0.6)});
    width: 60%;
    height: 6px;
    background: radial-gradient(circle, rgba(22, 238, 246, 0.4) 0%, transparent 80%);
    opacity: ${({ $active }) => ($active ? 1 : 0)};
    transition:
      opacity 0.3s,
      transform 0.4s ease;
    pointer-events: none;
    z-index: 0;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%) scaleX(${({ $active }) => ($active ? 1 : 0.5)});
    width: 50%;
    height: 2px;
    background: linear-gradient(to right, transparent, rgba(22, 238, 246, 1), transparent);
    opacity: ${({ $active }) => ($active ? 1 : 0)};
    transition:
      opacity 0.3s,
      transform 0.4s ease;
    z-index: 1;
  }

  &:hover::after {
    opacity: ${({ $active }) => ($active ? 1 : 0.4)};
  }

  & ${Label} {
    color: ${({ $active }) => ($active ? 'rgb(22,238,246)' : '#fff')};
    font-size: ${({ $active }) => ($active ? '1.05rem' : '1rem')};
    text-shadow: ${({ $active }) => ($active ? '0 0 2px rgba(22,238,246,0.7)' : 'none')};
    transition:
      color 0.3s,
      font-size 0.3s,
      text-shadow 0.3s;
  }

  &:hover ${Label} {
    color: ${({ $active }) => ($active ? 'rgb(22,238,246)' : '#bffeff')};
    text-shadow: ${({ $active }) =>
      $active ? '0 0 6px rgba(22,238,246,0.7)' : '0 0 10px rgba(22,238,246,0.3)'};
  }
`
export const activeIndicatorStyle = css`
  background-repeat: no-repeat;
  background-position: 50%;
  background-image: radial-gradient(circle at center, green 0%, transparent 70%);
`
