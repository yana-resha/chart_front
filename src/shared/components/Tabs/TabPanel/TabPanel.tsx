import { forwardRef } from 'react'

import { Tab } from '../Tabs'
import { Label, TabContainer } from './index.linaria'

interface TabPanelProps {
  item: Tab
  active: boolean
  onClick: () => void
  className?: string
}

export const TabPanel = forwardRef<HTMLDivElement, TabPanelProps>(
  ({ item, onClick, className, active }, ref) => {
    TabPanel.displayName = 'TabPanel'

    return (
      <TabContainer
        onClick={onClick}
        className={className}
        ref={ref}
        data-node-key={item.key}
        $active={active}
        // tabIndex={0}
      >
        <Label>{item.label}</Label>
      </TabContainer>
    )
  },
)
