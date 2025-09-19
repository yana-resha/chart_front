import { ReactNode } from 'react'

import { TipBox, TipSmile } from './index.linaria'

interface TipProps {
  children: ReactNode
  smile?: ReactNode
}

export function Tip({ children, smile }: TipProps) {
  return (
    <TipBox hasSmile={!!smile}>
      {children}
      {smile && <TipSmile>{smile}</TipSmile>}
    </TipBox>
  )
}
