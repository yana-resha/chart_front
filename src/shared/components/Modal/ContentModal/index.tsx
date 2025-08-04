import { ReactNode } from 'react'

import { CrossIcon } from '../index.linaria'
import { ModalBody, modalFlex, ModalFooter, ModalHeader } from './index.linaria'
import { Button } from '../../Button'
import { Modal } from '../Modal'

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
  <Modal
    onClose={onClose}
    className={modalFlex}
    onClick={(e) => e.stopPropagation()}
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
  </Modal>
)
