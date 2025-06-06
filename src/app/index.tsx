import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import { AppContainer } from './index.linaria'
import { Router } from './Router'
import { store } from '@/store'

export function App() {
  return (
    <Provider store={store}>
      <AppContainer>
        <BrowserRouter basename="/">
          <Router />
          {/* Это можно вставить прямо в App.tsx, под конец */}
        </BrowserRouter>
      </AppContainer>
    </Provider>
  )
}
