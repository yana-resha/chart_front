import { useState, useRef, ReactNode, useLayoutEffect, useEffect } from 'react'

import { ToggleButton, Container } from './index.linaria'

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

  const isInViewport = (elem: HTMLElement) => {
    const rect = elem.getBoundingClientRect()

    return rect.top >= 0 && rect.top <= window.innerHeight
  }

  // Подсчёт нужен ли toggle
  useLayoutEffect(() => {
    if (contentRef.current) {
      const fullHeight = contentRef.current.scrollHeight
      setNeedsToggle(fullHeight > maxHeight)
    }
  }, [children, maxHeight])

  // Подсчёт высоты кнопки
  useLayoutEffect(() => {
    if (buttonRef.current) {
      const buttonHeight = buttonRef.current.offsetHeight
      setAvailableHeight(maxHeight - buttonHeight)
    }
  }, [maxHeight, needsToggle])

  // Отслеживание изменения maxHeight
  useEffect(() => {
    isResizing.current = true
    const timeout = setTimeout(() => {
      isResizing.current = false
    }, 50)

    return () => clearTimeout(timeout)
  }, [maxHeight])

  // Управляем высотой и плавностью
  useLayoutEffect(() => {
    if (!containerRef.current) return
    const el = containerRef.current

    if (isResizing.current) {
      el.style.transition = 'none'
    } else {
      el.style.transition = 'height 0.4s ease'
    }

    if (expanded && contentRef.current) {
      el.style.height = `${contentRef.current.scrollHeight}px`
    } else {
      el.style.height = `${availableHeight}px`
    }

    setTimeout(() => {
      if (!isInViewport(el)) {
        const topOffset = el.getBoundingClientRect().top + window.scrollY
        window.scrollTo({
          top: topOffset - 30,
        })
      }
    }, 10)
  }, [availableHeight, expanded, children])

  return (
    <Container>
      <div
        ref={containerRef}
        style={{ overflow: expanded ? 'visible' : 'hidden' }}
      >
        <div ref={contentRef}>{children}</div>
      </div>

      {needsToggle && (
        <ToggleButton
          ref={buttonRef}
          kind={'outline'}
          size={'small'}
          theme={'secondary'}
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? 'Свернуть' : 'Развернуть'}
        </ToggleButton>
      )}
    </Container>
  )
}
