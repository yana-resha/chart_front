// Универсально берём "глобальный" скролл-контейнер
export function getScrollContainer(): HTMLElement {
  // В современных браузерах это <html>, а не <body>
  return (document.scrollingElement || document.documentElement) as HTMLElement
}

function isViewportContainer(container: HTMLElement) {
  const se = document.scrollingElement as HTMLElement | null

  return container === document.body || container === document.documentElement || (se && container === se)
}

export function isInViewportWithin(el: HTMLElement, container: HTMLElement, padding = 0) {
  const er = el.getBoundingClientRect()

  if (isViewportContainer(container)) {
    const height = window.innerHeight

    return er.top >= padding && er.bottom <= height - padding
  }

  const cr = container.getBoundingClientRect()

  return er.top >= cr.top + padding && er.bottom <= cr.bottom - padding
}

export function scrollToWithin(
  el: HTMLElement,
  container: HTMLElement,
  offset = 30,
  // eslint-disable-next-line no-undef
  behavior: ScrollBehavior = 'auto',
) {
  const er = el.getBoundingClientRect()

  if (isViewportContainer(container)) {
    // Скроллим окно
    const targetTop = window.scrollY + er.top - offset
    window.scrollTo({ top: targetTop, behavior })

    return
  }

  // Скроллим вложенный контейнер
  const cr = container.getBoundingClientRect()
  const targetTop = er.top - cr.top + container.scrollTop - offset
  container.scrollTo({ top: targetTop, behavior })
}
