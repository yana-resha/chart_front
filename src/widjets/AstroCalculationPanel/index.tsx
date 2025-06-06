import { AstroCalculationModal as Modal } from './AstroCalculationModal'
import { AstroCalculationPanel as Panel } from './AstroCalculationPanel'
import { AstroCalculationPanelProvider } from './contexts/AstroCalculation/AstroCalculationProvider'
import { IAstroCalculationPanelProps } from './types/index.types'

export const AstroCalculationPanel = (props: IAstroCalculationPanelProps) => (
  <AstroCalculationPanelProvider {...props}>
    <Panel />
  </AstroCalculationPanelProvider>
)

export const AstroCalculationModal = (props: IAstroCalculationPanelProps) => (
  <AstroCalculationPanelProvider {...props}>
    <Modal />
  </AstroCalculationPanelProvider>
)
