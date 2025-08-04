import { HTMLAttributes, ReactNode } from 'react'

import { PageHeaderWrapper } from './index.linaria'

interface IProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
}

export const PageHeader = ({ children, ...rest }: IProps) => (
  <PageHeaderWrapper {...rest}>{children}</PageHeaderWrapper>
)
