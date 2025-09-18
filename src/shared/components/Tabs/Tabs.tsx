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
  ariaLabel?: string
}

export const Tabs: FC<TabsProps> = ({ items, className, ariaLabel = 'Tabs' }) => {
  const [currentKey, setCurrentKey] = useState(items[0].key)
  const [showScrollLeft, setShowScrollLeft] = useState(false)
  const [showScrollRight, setShowScrollRight] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)
  const tabRefs = useRef<Array<HTMLDivElement | null>>([])
  const lastNavRef = useRef<null | 'keys' | 'click' | 'scrollbtn'>(null)
  const didMount = useRef(false)

  const activeIndex = items.findIndex((t) => t.key === currentKey)

  const ids = useMemo(
    () =>
      items.reduce<Record<string, { tabId: string; panelId: string }>>((acc, it, i) => {
        const safe = it.key.replace(/\s+/g, '-')
        acc[it.key] = { tabId: `tab-${safe}-${i}`, panelId: `panel-${safe}-${i}` }

        return acc
      }, {}),
    [items],
  )

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
    lastNavRef.current = 'scrollbtn'
    containerRef.current?.scrollBy({ left: direction * 150, behavior: 'smooth' })
  }

  // следим за скроллом/resize
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

  // вспомогательная функция: аккуратно довести таб до видимой области, если он реально обрезан
  const scrollTabIntoView = (container: HTMLElement, el: HTMLElement, smooth = true) => {
    const c = container.getBoundingClientRect()
    const r = el.getBoundingClientRect()
    const overLeft = r.left < c.left
    const overRight = r.right > c.right
    if (!overLeft && !overRight) return
    const delta = overLeft ? r.left - c.left - 16 : r.right - c.right + 16
    container.scrollBy({ left: delta, behavior: smooth ? 'smooth' : 'auto' })
  }

  // при смене активной вкладки — скроллим её ТОЛЬКО после явной навигации (и не на первом рендере)
  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true

      return
    }
    const cause = lastNavRef.current
    if (!cause) return

    const el = tabRefs.current[activeIndex]
    const container = containerRef.current
    if (el && container) {
      const smooth = cause === 'keys' // клавиши — плавно; клик можно сделать мгновенно
      scrollTabIntoView(container, el, smooth)
    }
    lastNavRef.current = null
  }, [activeIndex])

  // клавиатурная навигация (WAI-ARIA)
  const onTabsKeyDown = (e: React.KeyboardEvent) => {
    const { key } = e
    if (!['ArrowRight', 'ArrowLeft', 'Home', 'End', 'Enter', ' '].includes(key)) return

    const count = items.length
    let next = activeIndex

    if (key === 'ArrowRight') next = (activeIndex + 1) % count
    else if (key === 'ArrowLeft') next = (activeIndex - 1 + count) % count
    else if (key === 'Home') next = 0
    else if (key === 'End') next = count - 1
    else if (key === 'Enter' || key === ' ') {
      e.preventDefault()

      return
    }

    if (next !== activeIndex) {
      e.preventDefault()
      lastNavRef.current = 'keys'
      setCurrentKey(items[next].key)
      requestAnimationFrame(() => tabRefs.current[next]?.focus())
    }
  }

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
            role="tablist"
            aria-label={ariaLabel}
            onKeyDown={onTabsKeyDown}
          >
            {items.map((item, index) => {
              const active = item.key === currentKey
              const { tabId, panelId } = ids[item.key]

              return (
                <TabPanel
                  ref={(el: HTMLDivElement | null) => {
                    tabRefs.current[index] = el
                  }}
                  active={active}
                  key={item.key}
                  item={item}
                  onClick={() => {
                    lastNavRef.current = 'click'
                    setCurrentKey(item.key)
                    requestAnimationFrame(() => tabRefs.current[index]?.focus())
                  }}
                  // a11y:
                  role="tab"
                  id={tabId}
                  aria-selected={active}
                  aria-controls={panelId}
                  tabIndex={active ? 0 : -1} // roving tabindex
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
            aria-label="Scroll tabs left"
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
            aria-label="Scroll tabs right"
          >
            <LeftShevron className={`${scrollChevron} ${scrollChevronFlipped}`} />
          </Button>
        )}
      </ScrollWrapper>

      <ContentContainer
        role="tabpanel"
        id={ids[currentKey].panelId}
        aria-labelledby={ids[currentKey].tabId}
        tabIndex={0}
      >
        {currentContent}
      </ContentContainer>
    </>
  )
}
