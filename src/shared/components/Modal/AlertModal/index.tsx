import { ReactNode } from 'react'

import {
  ModalHeader,
  ModalTitle,
  ModalSubtitle,
  ModalIcon,
  IconContainer,
  ButtonsContainer,
  modal,
  ContentContainer,
} from './index.linaria'
import { CrossIcon } from '../index.linaria'
import { Modal } from '../Modal'
import { OverlayHeader } from '@/shared/assets/styles/overlays/shared.linaria'
import { Button } from '@/shared/components/Button'

interface ModalProps {
  icon?: ReactNode
  title?: string
  subtitle?: string | ReactNode
  primaryButtonText?: string
  secondaryButtonText?: string
  onPrimaryClick?: () => void
  onSecondaryClick?: () => void
  open: boolean
  onClose: () => void
  showExitCross: boolean
}

export const AlertModal = ({
  icon,
  title,
  subtitle,
  primaryButtonText,
  secondaryButtonText,
  onPrimaryClick,
  onSecondaryClick,
  onClose,
  open,
  showExitCross,
}: ModalProps) => (
  <Modal
    open={open}
    className={modal}
    onClose={onClose}
    onClick={(e) => e.stopPropagation()}
  >
    <OverlayHeader>
      <div></div>
      {showExitCross && (
        <Button
          kind="text"
          onClick={onClose}
        >
          <CrossIcon />
        </Button>
      )}
    </OverlayHeader>
    <ContentContainer>
      <ModalHeader>
        {icon && <IconContainer className={ModalIcon}>{icon}</IconContainer>}
        {title && <ModalTitle>{title}</ModalTitle>}
        {subtitle && <ModalSubtitle>{subtitle}</ModalSubtitle>}
      </ModalHeader>
      <ButtonsContainer>
        {secondaryButtonText && (
          <Button
            kind="outline"
            theme="primary"
            roundedCorner
            onClick={() => {
              if (onSecondaryClick) {
                onSecondaryClick()
              }
              onClose()
            }}
          >
            {secondaryButtonText}
          </Button>
        )}
        {primaryButtonText && (
          <Button
            kind="gradient"
            theme="primary"
            roundedCorner
            onClick={() => {
              if (onPrimaryClick) {
                onPrimaryClick()
              }
              onClose()
            }}
          >
            {primaryButtonText}
          </Button>
        )}
      </ButtonsContainer>
    </ContentContainer>
  </Modal>
)
