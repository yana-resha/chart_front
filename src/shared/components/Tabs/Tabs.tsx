import React, { FC, useMemo, useRef, useState } from 'react'

import { ContentContainer, TabPanelContainer } from './index.linaria'
import { TabPanel } from './TabPanel/TabPanel'

export interface Tab {
  key: string
  label: string
  children: React.ReactNode
}

interface TabsProps {
  items: Tab[]
  className?: string
}

const getTabSize = (tab: HTMLElement, containerRect: DOMRect) => {
  const { offsetWidth, offsetHeight, offsetTop, offsetLeft } = tab
  const { width, height, left, top } = tab.getBoundingClientRect()

  if (Math.abs(width - offsetWidth) < 1) {
    return {
      offsetWidth: width,
      offsetHeight: height,
      offsetLeft: left - containerRect.left,
      offsetTop: top - containerRect.top,
    }
  }

  return { offsetWidth, offsetHeight, offsetLeft, offsetTop }
}

export const Tabs: FC<TabsProps> = ({ items, className }) => {
  const [currentKey, setCurrentKey] = useState(items[0].key)
  const activeRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const currentContent = useMemo(
    () => items.find((item) => item.key === currentKey)?.children,
    [currentKey, items],
  )

  const scrollTabs = (e: React.WheelEvent) => {
    if (activeRef.current && containerRef.current) {
      const { offsetWidth } = getTabSize(activeRef.current, containerRef.current.getBoundingClientRect())
      e.currentTarget.scrollTo((e.currentTarget.scrollLeft ?? 0) + offsetWidth * Math.sign(e.deltaY), 0)
    }
  }

  return (
    <div style={{ position: 'relative' }}>
      <TabPanelContainer
        className={className}
        onWheel={scrollTabs}
        ref={containerRef}
        tabIndex={-1}
      >
        {items.map((item) => {
          const active = item.key === currentKey

          return (
            <TabPanel
              ref={active ? activeRef : null}
              active={active}
              key={item.key}
              item={item}
              onClick={() => setCurrentKey(item.key)}
            />
          )
        })}
      </TabPanelContainer>
      <ContentContainer>{currentContent}</ContentContainer>
    </div>
  )
}
