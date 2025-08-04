import { HTMLAttributes, ReactNode } from 'react'

import { ModalVeil, ModalWindow } from '../index.linaria'

export interface IModal extends HTMLAttributes<HTMLDivElement> {
  onClose: () => void
  children: ReactNode
}

export const Modal = ({ onClose, children, ...rest }: IModal) => (
  <ModalVeil onClick={onClose}>
    <ModalWindow
      onClick={(e: MouseEvent) => e.stopPropagation()}
      {...rest}
    >
      {children}
    </ModalWindow>
  </ModalVeil>
)
