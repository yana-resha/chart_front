import { useEffect } from 'react'

import { ScrollLockStrategy, acquireScrollLock, releaseScrollLock } from '../helpers/scrollLock'

export const useScrollLock = (active: boolean, strategy: ScrollLockStrategy = 'fixed') => {
  useEffect(() => {
    if (!active) return
    acquireScrollLock(strategy)

    return () => releaseScrollLock(strategy)
  }, [active, strategy])
}
