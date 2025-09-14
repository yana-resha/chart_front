import { ReactNode } from 'react'

import { ProseRoot } from './index.linaria'

/** Обёртка-контейнер, чтобы было удобно использовать */
export const Prose = ({ children }: { children: ReactNode }) => <ProseRoot>{children}</ProseRoot>
