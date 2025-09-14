import { styled } from '@linaria/react'

export const ZoomFrame = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 12px; /* дефолт — можно переопределить стилем снаружи */
  width: 100%;
  height: auto;
`

export const ZoomImg = styled.img`
  display: block;
  width: 100%;
  height: auto;
  will-change: transform, opacity;

  /* старт: норм, плавно -> зум -> назад к норме */
  &.inview {
    animation: zoomInOut 5000ms linear both;
  }

  @keyframes zoomInOut {
    0% {
      transform: scale(1);
      opacity: 0.95;
    }
    40% {
      transform: scale(1.08);
      opacity: 1;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    &.inview {
      animation: none;
    }
  }
`
