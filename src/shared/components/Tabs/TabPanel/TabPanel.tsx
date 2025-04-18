import { forwardRef } from 'react'
import classNames from 'classnames'

import { Tab } from '../Tabs'
import { ActiveIndicator, activeIndicatorStyle, TabContainer } from './index.linaria'

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
        tabIndex={0}
      >
        <ActiveIndicator className={classNames(active && activeIndicatorStyle)} />
        <p>{item.label}</p>
      </TabContainer>
    )
  },
)
