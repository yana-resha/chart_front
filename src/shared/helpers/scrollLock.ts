let locks = 0
let savedScrollY = 0
let savedStyles: Partial<CSSStyleDeclaration> = {}

/** Стратегия:
 * 'overflow' — просто overflow:hidden (как у тебя в модалке сейчас)
 * 'fixed'    — фиксируем body на месте без скачка (рекомендую для мобильного меню)
 */
export type ScrollLockStrategy = 'overflow' | 'fixed'

const apply = (strategy: ScrollLockStrategy) => {
  if (locks > 0) {
    if (strategy === 'fixed') {
      if (document.body.style.position !== 'fixed') {
        savedScrollY = window.scrollY
        savedStyles = {
          position: document.body.style.position,
          top: document.body.style.top,
          left: document.body.style.left,
          right: document.body.style.right,
          width: document.body.style.width,
          overflow: document.body.style.overflow,
        }
        document.body.style.position = 'fixed'
        document.body.style.top = `-${savedScrollY}px`
        document.body.style.left = '0'
        document.body.style.right = '0'
        document.body.style.width = '100%'
      }
    } else {
      // overflow стратегия
      if (savedStyles.overflow === undefined) {
        savedStyles.overflow = document.body.style.overflow
      }
      document.body.style.overflow = 'hidden'
    }
  } else {
    // снять блокировку и вернуть состояние
    if (document.body.style.position === 'fixed') {
      document.body.style.position = savedStyles.position ?? ''
      document.body.style.top = savedStyles.top ?? ''
      document.body.style.left = savedStyles.left ?? ''
      document.body.style.right = savedStyles.right ?? ''
      document.body.style.width = savedStyles.width ?? ''
      window.scrollTo(0, savedScrollY)
    }
    if (savedStyles.overflow !== undefined) {
      document.body.style.overflow = savedStyles.overflow ?? ''
    }
    savedStyles = {}
  }
}

export const acquireScrollLock = (strategy: ScrollLockStrategy = 'fixed') => {
  locks += 1
  apply(strategy)
}

export const releaseScrollLock = (strategy: ScrollLockStrategy = 'fixed') => {
  locks = Math.max(0, locks - 1)
  apply(strategy)
}

/** На всякий — форс‑сброс */
export const resetScrollLocks = () => {
  locks = 0
  apply('fixed')
}
