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
`

export const ModalWindow = styled.div`
  background: rgba(26, 29, 33, 0.9);
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
  padding: 40px;
`
export const CrossIcon = styled(ExitCross)`
  width: 20px;
  height: 20px;
`
