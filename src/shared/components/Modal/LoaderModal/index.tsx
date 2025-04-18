import { ReactNode } from 'react'

import { Button } from '../../Button'
import { CrossIcon, ModalVeil, ModalWindow } from '../index.linaria'
import { ContentContainer, CrossContainer, Loader, LoaderContainer, modalFlex } from './index.linaria'

interface ModalProps {
  content: string | ReactNode
  onClose: () => void
  showExitCross?: boolean
}
export const LoaderModal = ({ content, onClose, showExitCross = true }: ModalProps) => (
  <ModalVeil onClick={onClose}>
    <ModalWindow
      className={modalFlex}
      onClick={(e: React.MouseEvent) => e.stopPropagation()}
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

      <LoaderContainer>
        <Loader />
      </LoaderContainer>
      <ContentContainer>{content}</ContentContainer>
    </ModalWindow>
  </ModalVeil>
)
