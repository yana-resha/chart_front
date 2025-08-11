import React from 'react'
export const smoothScrollAnchor = (
  idOrEvent: string | React.MouseEvent<HTMLElement>,
  maybeIdOrOffset?: string | number,
  maybeOffset?: number,
) => {
  let id: string
  let offset = 10 // значение по умолчанию

  if (typeof idOrEvent === 'string') {
    // Вызов вида smoothScrollTo('anchorId', 80)
    id = idOrEvent
    if (typeof maybeIdOrOffset === 'number') {
      offset = maybeIdOrOffset
    }
  } else {
    // Вызов через обработчик события smoothScrollTo(e, 'anchorId', 80)
    const e = idOrEvent
    e.preventDefault()
    id = maybeIdOrOffset as string
    if (typeof maybeOffset === 'number') {
      offset = maybeOffset
    }
  }

  const el = document.getElementById(id)
  if (!el) return

  const y = el.getBoundingClientRect().top + window.pageYOffset - offset
  window.scrollTo({ top: y, behavior: 'smooth' })
}
