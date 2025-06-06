import { ReactNode } from 'react'

import { AstroCalculationContextValue, AstroCalculationPanelContext } from './AstroCalculationContext'

export type AstroCalculationProviderProps = AstroCalculationContextValue & {
  children: ReactNode
}
export const AstroCalculationPanelProvider = ({ children, ...props }: AstroCalculationProviderProps) => (
  <AstroCalculationPanelContext.Provider value={props}>{children}</AstroCalculationPanelContext.Provider>
)
