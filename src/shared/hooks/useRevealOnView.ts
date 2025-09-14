// hooks/useRevealOnView.ts
import { useEffect, useRef, useState } from 'react'

export function useRevealOnView(options?: IntersectionObserverInit & { once?: boolean }) {
  const ref = useRef<HTMLElement | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (options?.once !== false) io.unobserve(el)
        } else if (options?.once === false) {
          setInView(false)
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.15, ...options },
    )

    io.observe(el)

    return () => io.disconnect()
  }, [options, options?.once, options?.rootMargin, options?.threshold])

  return { ref, inView }
}
