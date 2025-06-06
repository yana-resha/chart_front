import { createRoot } from 'react-dom/client'

import 'react-loading-skeleton/dist/skeleton.css'
import './main.css'
import { App } from './app'

if (import.meta.env.MODE === 'development' && import.meta.env.VITE_USE_MOCKS === 'true') {
  const { worker } = await import('./mocks/browser')
  await worker.start()
}

createRoot(document.getElementById('root')!).render(<App />)
