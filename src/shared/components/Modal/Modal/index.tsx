import { ReactNode } from 'react'

import { ModalVeil, ModalWindow } from '../index.linaria'

export interface IModal {
  onClose: () => void
  children: ReactNode
}

export const Modal = ({ onClose, children }: IModal) => (
  <div>
    <ModalVeil onClick={onClose}>
      <ModalWindow onClick={(e: MouseEvent) => e.stopPropagation()}>{children}</ModalWindow>
    </ModalVeil>
  </div>
)
