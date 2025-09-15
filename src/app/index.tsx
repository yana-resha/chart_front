import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import { AppContainer, BackgroundContainer } from './index.linaria'
import { Router } from './Router'
import { store } from '@/store'

export function App() {
  return (
    <Provider store={store}>
      <BackgroundContainer>
        <AppContainer>
          <BrowserRouter basename="/">
            <Router />
            {/* Это можно вставить прямо в App.tsx, под конец */}
          </BrowserRouter>
        </AppContainer>
      </BackgroundContainer>
    </Provider>
  )
}
