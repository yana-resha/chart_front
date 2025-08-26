import { css } from '@linaria/core'
import { styled } from '@linaria/react'

export const ScrollWrapper = styled.div<{ $fadeLeft?: boolean; $fadeRight?: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
`

export const FadeMask = styled.div<{ $fadeLeft?: boolean; $fadeRight?: boolean }>`
  flex: 1;
  overflow: hidden;
  display: flex;
  position: relative;

  -webkit-mask-image: linear-gradient(
    to right,
    transparent 0px,
    rgba(0, 0, 0, 0.9) 40px,
    black 80px,
    black calc(100% - 80px),
    rgba(0, 0, 0, 0.9) calc(100% - 40px),
    transparent 100%
  );
  mask-image: linear-gradient(
    to right,
    transparent 0px,
    rgba(0, 0, 0, 0.9) 40px,
    black 80px,
    black calc(100% - 80px),
    rgba(0, 0, 0, 0.9) calc(100% - 40px),
    transparent 100%
  );
  -webkit-mask-mode: alpha;
  mask-mode: alpha;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    width: 40px;
    z-index: 5;
    pointer-events: none;
    transition: opacity 0.3s ease;
  }

  &::before {
    left: 0;
    background: linear-gradient(to right, rgba(0, 0, 0, 0.4), transparent);
    opacity: ${({ $fadeLeft }) => ($fadeLeft ? 1 : 0)};
  }

  &::after {
    right: 0;
    background: linear-gradient(to left, rgba(0, 0, 0, 0.4), transparent);
    opacity: ${({ $fadeRight }) => ($fadeRight ? 1 : 0)};
  }
`

export const leftButtonCss = css`
  position: absolute;
  padding-bottom: 8px !important;
  left: 0;
  top: 0;
  bottom: 0;
  z-index: 10;
  width: 32px;
`

export const rightButtonCss = css`
  position: absolute;
  padding-bottom: 8px !important;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 6;
  width: 32px;
`

export const scrollChevron = css`
  width: 10px;
  height: 10px;
`

export const scrollChevronFlipped = css`
  transform: rotate(180deg);
`

export const TabPanelContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  gap: 8px;
  overflow-x: auto;
  overflow-y: hidden;
  width: 100%;
  min-width: 0;
  padding: 6px 6px;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.5), transparent);
    border-radius: 10px;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
  width: 100%;
`
