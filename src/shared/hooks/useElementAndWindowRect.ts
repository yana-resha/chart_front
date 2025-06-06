import { useState, useEffect, RefObject } from 'react'

interface IWindow {
  innerWidth: number
  innerHeight: number
}

interface IProps {
  ref: RefObject<HTMLElement | null>
  throttleMs?: number
}

function throttle<T extends (...args: unknown[]) => void>(func: T, limit: number) {
  let inThrottle = false

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

export const useElementAndWindowRect = ({
  ref,
  throttleMs = 50, // ✅ дефолт прямо здесь
}: IProps) => {
  const [elementRect, setElementRect] = useState<DOMRect | null>(null)
  const [windowSize, setWindowSize] = useState<IWindow>({
    innerWidth: window.innerWidth,
    innerHeight: window.innerHeight,
  })

  useEffect(() => {
    const updateElementRect = throttle(() => {
      if (ref.current) {
        setElementRect(ref.current.getBoundingClientRect())
      }
    }, throttleMs)

    const updateWindowSize = throttle(() => {
      setWindowSize({
        innerWidth: window.innerWidth,
        innerHeight: window.innerHeight,
      })
    }, throttleMs)

    updateElementRect()
    updateWindowSize()

    const observer = new ResizeObserver(updateElementRect)
    if (ref.current) observer.observe(ref.current)

    window.addEventListener('resize', () => {
      updateWindowSize()
      updateElementRect()
    })

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', () => {
        updateWindowSize()
        updateElementRect()
      })
    }
  }, [ref, throttleMs])

  return { elementRect, windowSize }
}
