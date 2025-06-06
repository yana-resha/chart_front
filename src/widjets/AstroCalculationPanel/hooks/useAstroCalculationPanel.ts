import { useContext } from 'react'

import { AstroCalculationPanelContext } from '../contexts/AstroCalculation/AstroCalculationContext'

export const useAstroCalculationPanel = () => {
  const context = useContext(AstroCalculationPanelContext)
  if (!context) {
    throw new Error('useAstroCalculationPanel must be used within AstroCalculationPanelProvider')
  }

  return context
}
