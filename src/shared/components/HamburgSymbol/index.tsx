import React from 'react'

import { astroStyle } from './index.linaria'

interface AstroSymbolProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode
}

export const HamburgSymbol: React.FC<AstroSymbolProps> = ({ children, className, ...props }) => (
  <span
    className={`${astroStyle} ${className ?? ''}`}
    {...props}
  >
    {children}
  </span>
)
