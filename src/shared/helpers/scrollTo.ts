export function getScrollContainer(): HTMLElement | null {
  return document.getElementById('root')
}

export function isInViewportWithin(el: HTMLElement, container: HTMLElement, padding = 0) {
  const cr = container.getBoundingClientRect()
  const er = el.getBoundingClientRect()

  return er.top >= cr.top + padding && er.bottom <= cr.bottom - padding
}

export function scrollToWithin(
  el: HTMLElement,
  container: HTMLElement,
  offset = 30,
  // eslint-disable-next-line no-undef
  behavior: ScrollBehavior = 'auto',
) {
  const cr = container.getBoundingClientRect()
  const er = el.getBoundingClientRect()
  const targetTop = er.top - cr.top + container.scrollTop - offset
  container.scrollTo({ top: targetTop, behavior })
}
