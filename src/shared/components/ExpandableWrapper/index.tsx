import { useState, useRef, ReactNode, useLayoutEffect, useEffect } from 'react'

import { ToggleButton, Container } from './index.linaria'
import { getScrollContainer, isInViewportWithin, scrollToWithin } from '@/shared/helpers/scrollTo'

const DEFAULT_BUTTON_HEIGHT = 43

export const ExpandableWrapper = ({
  children,
  maxHeight = 200,
}: {
  children: ReactNode
  maxHeight?: number
}) => {
  const [expanded, setExpanded] = useState(false)
  const [needsToggle, setNeedsToggle] = useState(false)
  const [availableHeight, setAvailableHeight] = useState(maxHeight - DEFAULT_BUTTON_HEIGHT)

  const isResizing = useRef(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const toggleExpanded = () => {
    setExpanded((prev) => {
      if (prev) {
        // при сворачивании — вернуть элемент обратно в видимую область контейнера root
        setTimeout(() => {
          const el = containerRef.current
          const root = getScrollContainer()
          if (!el || !root) return
          if (!isInViewportWithin(el, root, 0)) {
            scrollToWithin(el, root, 30, 'auto')
          }
        }, 10)
      }

      return !prev
    })
  }

  // Единый расчёт: нужна ли кнопка и сколько давать высоты в "свернутом" состоянии
  useLayoutEffect(() => {
    const el = containerRef.current
    if (!el || !contentRef.current) return

    el.style.transition = isResizing.current ? 'none' : 'height 0.4s ease'

    const fullHeight = contentRef.current.scrollHeight

    if (!needsToggle) {
      // если контент меньше maxHeight → fit-content
      el.style.height = 'fit-content'
    } else if (expanded) {
      el.style.height = `${fullHeight}px`
    } else {
      el.style.height = `${availableHeight}px`
    }
  }, [availableHeight, expanded, children, needsToggle])

  // Следим за изменениями размеров контента (динамические children)
  useEffect(() => {
    if (!contentRef.current) return
    const el = contentRef.current
    const ro = new ResizeObserver(() => {
      // форсим перерасчёт при изменении контента
      const fullHeight = el.scrollHeight
      const btnHeight = buttonRef.current?.offsetHeight ?? DEFAULT_BUTTON_HEIGHT
      if (fullHeight <= maxHeight) {
        setNeedsToggle(false)
        setAvailableHeight(fullHeight)
      } else {
        setNeedsToggle(true)
        setAvailableHeight(Math.max(maxHeight - btnHeight, 0))
      }
    })
    ro.observe(el)

    return () => ro.disconnect()
  }, [maxHeight])

  // Мягкая/безанимационная установка высоты
  useLayoutEffect(() => {
    const el = containerRef.current
    if (!el || !contentRef.current) return

    // выключаем transition если идёт ресайз/пересчёт, чтобы не мигало
    el.style.transition = isResizing.current ? 'none' : 'height 0.4s ease'

    if (expanded) {
      el.style.height = `${contentRef.current.scrollHeight}px`
    } else {
      el.style.height = `${availableHeight}px`
    }
  }, [availableHeight, expanded, children])

  // Флаг «идёт ресайз» на короткое время при смене maxHeight
  useEffect(() => {
    isResizing.current = true
    const t = setTimeout(() => (isResizing.current = false), 50)

    return () => clearTimeout(t)
  }, [maxHeight])

  return (
    <Container>
      <div
        ref={containerRef}
        style={{
          overflowY: expanded ? 'visible' : 'hidden',
        }}
      >
        <div ref={contentRef}>{children}</div>
      </div>

      {needsToggle && (
        <ToggleButton
          ref={buttonRef}
          onClick={toggleExpanded}
        >
          {expanded ? 'Свернуть' : 'Развернуть'}
        </ToggleButton>
      )}
    </Container>
  )
}
