import { useRef, useEffect, useState } from 'react'

export const useContainerSize = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState(0)

  useEffect(() => {
    const element = containerRef.current
    if (!element) return

    const observer = new ResizeObserver(() => {
      const rect = element.getBoundingClientRect()
      const newSize = Math.min(rect.width, rect.height)
      setSize(newSize)
    })

    observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return { containerRef, size }
}
