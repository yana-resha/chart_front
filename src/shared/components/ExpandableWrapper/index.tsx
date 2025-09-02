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
        setTimeout(() => {
          const el = containerRef.current
          const root = getScrollContainer()
          if (!el || !root) return
          if (!isInViewportWithin(el, root, 0)) scrollToWithin(el, root, 30, 'auto')
        }, 10)
      }

      return !prev
    })
  }

  // следим за размером контента
  useEffect(() => {
    const el = contentRef.current
    if (!el) return

    const ro = new ResizeObserver(() => {
      const full = el.scrollHeight
      const btn = buttonRef.current?.offsetHeight ?? DEFAULT_BUTTON_HEIGHT

      if (full <= maxHeight) {
        setNeedsToggle(false)
        setAvailableHeight(full) // не критично, просто храним
      } else {
        setNeedsToggle(true)
        setAvailableHeight(Math.max(maxHeight - btn, 0))
      }
    })

    ro.observe(el)

    return () => ro.disconnect()
  }, [maxHeight])

  // применяем высоту ТОЛЬКО когда нужен тоггл
  useLayoutEffect(() => {
    const box = containerRef.current
    if (!box || !contentRef.current) return
    if (!needsToggle) {
      box.style.transition = 'none'
      box.style.height = 'auto' // ключ! пусть растягивается

      return
    }

    box.style.transition = isResizing.current ? 'none' : 'height 0.4s ease'
    const full = contentRef.current.scrollHeight
    box.style.height = expanded ? `${full}px` : `${availableHeight}px`
  }, [needsToggle, expanded, availableHeight, children])

  useEffect(() => {
    isResizing.current = true
    const t = setTimeout(() => (isResizing.current = false), 50)

    return () => clearTimeout(t)
  }, [maxHeight])

  return (
    <Container /* сам Container пусть тоже тянется */>
      <div
        ref={containerRef}
        style={{
          display: 'flex', // ← делаем колоночный контейнер
          flexDirection: 'column',
          // когда нет тоггла — этот блок сам тянется внутри карточки
          flex: needsToggle ? undefined : 1,
          minHeight: needsToggle ? undefined : 0,
          overflowY: needsToggle && !expanded ? 'hidden' : 'visible',
        }}
      >
        <div
          ref={contentRef}
          style={{
            // ключ: растягиваем контент на всю высоту, но ТОЛЬКО когда нет тоггла
            flex: needsToggle ? undefined : 1,
            minHeight: needsToggle ? undefined : 0,
            display: 'flex', // если дети — таблица/блок, тоже тянем
            flexDirection: 'row',
            height: needsToggle ? 'auto' : undefined,
            alignItems: 'stretch',
          }}
        >
          {children}
        </div>
      </div>

      {needsToggle && (
        <ToggleButton
          ref={buttonRef}
          onClick={toggleExpanded}
          style={expanded ? { position: 'sticky', bottom: '0' } : {}}
        >
          {expanded ? 'Свернуть' : 'Развернуть'}
        </ToggleButton>
      )}
    </Container>
  )
}
