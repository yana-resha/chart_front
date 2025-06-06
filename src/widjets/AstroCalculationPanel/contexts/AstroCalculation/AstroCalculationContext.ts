import { createContext } from 'react'

import { ICalculationDatas } from '../../types/index.types'

export type AstroCalculationContextValue = ICalculationDatas & {}

export const AstroCalculationPanelContext = createContext<AstroCalculationContextValue | null>(null)
