import React, { FC, useMemo, useRef, useState, useEffect } from 'react'

import {
  ContentContainer,
  TabPanelContainer,
  ScrollWrapper,
  scrollChevron,
  scrollChevronFlipped,
  rightButtonCss,
  leftButtonCss,
  FadeMask,
} from './index.linaria'
import { Button } from '../Button'
import { TabPanel } from './TabPanel/TabPanel'
import LeftShevron from '@/shared/assets/icons/left-chevron.svg?react'

export interface Tab {
  key: string
  label: string
  children: React.ReactNode
}

interface TabsProps {
  items: Tab[]
  className?: string
}

export const Tabs: FC<TabsProps> = ({ items, className }) => {
  const [currentKey, setCurrentKey] = useState(items[0].key)
  const [showScrollLeft, setShowScrollLeft] = useState(false)
  const [showScrollRight, setShowScrollRight] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)
  const activeRef = useRef<HTMLDivElement>(null)

  const currentContent = useMemo(
    () => items.find((item) => item.key === currentKey)?.children,
    [currentKey, items],
  )

  const checkScroll = () => {
    const el = containerRef.current
    if (!el) return
    setShowScrollRight(el.scrollWidth > el.clientWidth + el.scrollLeft + 5)
    setShowScrollLeft(el.scrollLeft > 5)
  }

  const scrollTabs = (e: React.WheelEvent) => {
    if (e.deltaY !== 0 && containerRef.current) {
      containerRef.current.scrollBy({
        left: e.deltaY < 0 ? -150 : 150,
        behavior: 'smooth',
      })
    }
  }

  const scrollByDirection = (direction: -1 | 1) => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: direction * 150,
        behavior: 'smooth',
      })
    }
  }

  useEffect(() => {
    checkScroll()
    const el = containerRef.current
    if (!el) return

    el.addEventListener('scroll', checkScroll)
    window.addEventListener('resize', checkScroll)

    return () => {
      el.removeEventListener('scroll', checkScroll)
      window.removeEventListener('resize', checkScroll)
    }
  }, [items.length])

  return (
    <>
      <ScrollWrapper>
        <FadeMask
          $fadeLeft={showScrollLeft}
          $fadeRight={showScrollRight}
        >
          <TabPanelContainer
            ref={containerRef}
            onWheel={scrollTabs}
            className={className}
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
        </FadeMask>

        {showScrollLeft && (
          <Button
            kind="text"
            theme="primary"
            className={leftButtonCss}
            onClick={() => scrollByDirection(-1)}
          >
            <LeftShevron className={scrollChevron} />
          </Button>
        )}

        {showScrollRight && (
          <Button
            kind="text"
            theme="primary"
            className={rightButtonCss}
            onClick={() => scrollByDirection(1)}
          >
            <LeftShevron className={`${scrollChevron} ${scrollChevronFlipped}`} />
          </Button>
        )}
      </ScrollWrapper>

      <ContentContainer>{currentContent}</ContentContainer>
    </>
  )
}
