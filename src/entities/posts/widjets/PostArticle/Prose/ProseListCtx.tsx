import React, { createContext, useContext } from 'react'

import { Ul, Ol, LiNumbered, Li } from './index.linaria'

const ListTypeCtx = createContext<'ul' | 'ol' | null>(null)

/** Обёртка для <ul> — даёт контекст "ul" */
export const UlWithCtx: React.FC<React.HTMLAttributes<HTMLUListElement>> = (props) => (
  <ListTypeCtx.Provider value="ul">
    <Ul {...props} />
  </ListTypeCtx.Provider>
)

/** Обёртка для <ol> — даёт контекст "ol" */
export const OlWithCtx: React.FC<React.OlHTMLAttributes<HTMLOListElement>> = (props) => (
  <ListTypeCtx.Provider value="ol">
    <Ol {...props} />
  </ListTypeCtx.Provider>
)

/** Переключатель для <li>: нумерованный или обычный */
export const LiSwitch: React.FC<React.LiHTMLAttributes<HTMLLIElement>> = (props) => {
  const type = useContext(ListTypeCtx)

  return type === 'ol' ? <LiNumbered {...props} /> : <Li {...props} />
}
