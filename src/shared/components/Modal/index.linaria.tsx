import { styled } from '@linaria/react'

import ExitCross from '@/shared/assets/icons/cross.svg?react'

export const ModalVeil = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  flex-direction: column;

  animation: veilFadeIn 0.25s ease-out;

  @keyframes veilFadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`

export const ModalWindow = styled.div`
  background: rgba(26, 29, 33, 1);
  border-radius: 15px;
  position: relative;
  z-index: 1001;
  min-width: 0;
  min-height: 0;
  max-width: 90%;
  max-height: 90%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 1.875rem;
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow:
    0 0 12px rgba(255, 255, 255, 0.06),
    0 0 24px rgba(255, 255, 255, 0.05),
    0 0 48px rgba(255, 255, 255, 0.04);

  animation: modalFadeIn 0.25s ease-out;

  @keyframes modalFadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`

export const CrossIcon = styled(ExitCross)`
  width: 1.25rem;
  height: 125rem;
`
