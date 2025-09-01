import { ReactNode } from 'react'

import { Button } from '../../Button'
import { CrossIcon } from '../index.linaria'
import { Modal } from '../Modal'
import { modalFlex, CrossContainer, Loader, CheckAnimated, Title, Subtitle, Content } from './index.linaria'

// ── новый интерфейс (бек-совместимый):
interface ModalProps {
  content?: string | ReactNode // legacy
  subtitle?: string // ← новая мягкая строка под заголовком (опц.)
  open: boolean
  onClose: () => void
  showExitCross?: boolean
  icon?: 'loader' | 'check'
  phase?: 'loading' | 'success'
  showSparksOnSuccess?: boolean
}

export const LoaderModal = ({
  content,
  subtitle,
  onClose,
  showExitCross = true,
  open,
  phase = 'loading',
}: ModalProps) => (
  <Modal
    open={open}
    onClose={onClose}
    className={modalFlex}
    onClick={(e) => e.stopPropagation()}
  >
    <>
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

      {phase === 'loading' ? <Loader /> : <CheckAnimated />}
      <Content>
        <Title>{content}</Title>
        <Subtitle>{subtitle}</Subtitle>
      </Content>
    </>
  </Modal>
)
