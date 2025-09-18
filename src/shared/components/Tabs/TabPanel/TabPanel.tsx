import { forwardRef, HTMLAttributes } from 'react'

import { Tab } from '../Tabs'
import { Label, TabContainer } from './index.linaria'

interface TabPanelProps extends HTMLAttributes<HTMLDivElement> {
  item: Tab
  active: boolean
  onClick: () => void
  className?: string
}

export const TabPanel = forwardRef<HTMLDivElement, TabPanelProps>(
  ({ item, onClick, className, active, ...props }, ref) => {
    TabPanel.displayName = 'TabPanel'

    return (
      <TabContainer
        onClick={onClick}
        className={className}
        ref={ref}
        data-node-key={item.key}
        $active={active}
        {...props}
      >
        <Label>{item.label}</Label>
      </TabContainer>
    )
  },
)
