import { Route, Routes } from 'react-router-dom'

import { EmptyPage } from '../index.linaria'
import DefaultLayout from '@/app/layout/DefaultLayout'
import Components from '@/pages/Components'
import { NatalCalculatorPage } from '@/pages/NatalCalculatorPage'
import { NatalDecodingPage } from '@/pages/NatalDecodingPage'
import { ROUTER_PATHES } from '@/shared/constants/router-paths'

export const MainRouter = () => (
  <Routes>
    {/* Если неизвестная страница, показываем ошибку 404 */}
    <Route
      path="*"
      element={<EmptyPage>Страница не найдена</EmptyPage>}
    />
    {/* Пока что дефолтную страницу авторизации тут тоже делаю без переадресаций,
    для удобной демонстрации
     */}
    {/* Дефолтная разметка авторизованного пользователя, слева Sidebar справа контент */}
    <Route element={<DefaultLayout />}>
      <Route
        path={ROUTER_PATHES.DEFAULT_PATH}
        element={<NatalDecodingPage />}
      />
      <Route
        path={ROUTER_PATHES.CALCULATOR_PATH}
        element={<NatalCalculatorPage />}
      />
      <Route
        path={ROUTER_PATHES.NATAL_DECODING_PATH}
        element={<NatalDecodingPage />}
      />
      <Route
        path={'components'}
        element={<Components />}
      />
    </Route>
    {/*  */}
  </Routes>
)
