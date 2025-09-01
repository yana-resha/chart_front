import { useEffect, useState } from 'react'

export function useMedia(query: string) {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const mq = window.matchMedia(query)
    const onChange = (e: MediaQueryListEvent) => setMatches(e.matches)

    setMatches(mq.matches)
    mq.addEventListener?.('change', onChange)

    return () => mq.removeEventListener?.('change', onChange)
  }, [query])

  return matches
}
