import { ReactNode } from 'react'

import { CrossIcon, ModalVeil, ModalWindow } from '../index.linaria'
import { ModalBody, modalFlex, ModalFooter, ModalHeader } from './index.linaria'
import { Button } from '../../Button'

interface IContentModal {
  onClose: () => void
  hideHeader?: boolean
  headerTitle?: string | ReactNode
  children: ReactNode
  footer?: ReactNode
}

export const ContentModal = ({
  onClose,
  headerTitle,
  children,
  hideHeader = false,
  footer,
}: IContentModal) => (
  <div>
    <ModalVeil onClick={onClose}>
      <ModalWindow
        className={modalFlex}
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
      >
        {!hideHeader && (
          <ModalHeader>
            <div>{headerTitle}</div>
            <Button
              kind="text"
              onClick={onClose}
            >
              <CrossIcon />
            </Button>
          </ModalHeader>
        )}
        <ModalBody>{children}</ModalBody>
        {footer && <ModalFooter>{footer}</ModalFooter>}
      </ModalWindow>
    </ModalVeil>
  </div>
)
