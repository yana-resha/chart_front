import { HTMLAttributes, ReactNode } from 'react'

import { Term } from './index.linaria'

interface IProps extends HTMLAttributes<HTMLSpanElement> {
  children: string | ReactNode
}

export const CalculationCardTerm = ({ children, ...props }: IProps) => (
  <Term
    tabIndex={0}
    {...props}
  >
    {children}
  </Term>
)
