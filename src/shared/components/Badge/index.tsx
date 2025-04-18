import { HtmlHTMLAttributes, ReactNode } from 'react'

import { BadgeComponent } from './index.linaria'

export interface ButtonProps extends HtmlHTMLAttributes<HTMLDivElement> {
  size?: 's' | 'm' | 'l'
  kind?: 'neutral' | 'active'
  children?: string | ReactNode
}

export const Badge = ({ size = 's', kind = 'neutral', children, ...props }: ButtonProps) => (
  <BadgeComponent
    data-kind={kind}
    data-size={size}
    {...props}
  >
    {children}
  </BadgeComponent>
)
