import { createRoot } from 'react-dom/client'

import 'react-loading-skeleton/dist/skeleton.css'
import './main.css'
import { App } from './app'

createRoot(document.getElementById('root')!).render(<App />)
