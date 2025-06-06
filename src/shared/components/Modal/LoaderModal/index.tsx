import { ReactNode } from 'react'

import { Button } from '../../Button'
import { CrossIcon, ModalVeil, ModalWindow } from '../index.linaria'
import { Check, ContentContainer, CrossContainer, Loader, LoaderContainer, modalFlex } from './index.linaria'
import { LiquidGlass } from '@liquidglass/react'

interface ModalProps {
  content: string | ReactNode
  onClose: () => void
  showExitCross?: boolean
  icon?: 'loader' | 'check'
}
export const LoaderModal = ({ content, onClose, showExitCross = true, icon = 'loader' }: ModalProps) => (
  <ModalVeil onClick={onClose}>
    <ModalWindow
      className={modalFlex}
      onClick={(e: MouseEvent) => e.stopPropagation()}
    >
      {showExitCross && (
        <CrossContainer>
          <Button
            kind="text"
            onClick={onClose}
          >
            <CrossIcon />
          </Button>
        </CrossContainer>
      )}

      <LoaderContainer>{icon === 'loader' ? <Loader /> : <Check />}</LoaderContainer>
      <ContentContainer>{content}</ContentContainer>
    </ModalWindow>
  </ModalVeil>
)
