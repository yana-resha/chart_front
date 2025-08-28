import { createRoot } from 'react-dom/client'
// заменяешь импорт
import { HelmetProvider } from 'react-v19-helmet-async'

import 'react-loading-skeleton/dist/skeleton.css'
import './main.css'
import { App } from './app'

const { worker } = await import('./mocks/browser')
/* if (import.meta.env.MODE === 'development' && import.meta.env.VITE_USE_MOCKS === 'true') {
  worker.start()
}
 */
createRoot(document.getElementById('root')!).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>,
)
