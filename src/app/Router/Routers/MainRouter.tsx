import { Navigate, Route, Routes } from 'react-router-dom'

import { EmptyPage } from '../index.linaria'
import DefaultLayout from '@/app/layout/DefaultLayout'
import { AuthPage } from '@/pages/AuthPage'
import { CalculatorPage } from '@/pages/CalculatorPage'
import { ROUTER_PATHES } from '@/shared/constants/router-paths'
import { AstroDecodingPage } from '@/pages/AstroDecodingPage'

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
    <Route
      path={ROUTER_PATHES.DEFAULT_AUTH_PATH}
      element={<AuthPage />}
    />
    {/* */}

    {/* Если url на страницу авторизации, редиректим ее на главную страницу авторизованного пользователя */}
    {/* так как user уже авторизован, и чтобы сбросить авторизацию он должен явно выйти из профиля */}
    <Route
      path="/admin-auth"
      element={
        <Navigate
          to={ROUTER_PATHES.DEFAULT_PATH}
          replace
        />
      }
    />
    {/*  */}

    {/* Дефолтная разметка авторизованного пользователя, слева Sidebar справа контент */}
    <Route element={<DefaultLayout />}>
      <Route
        path={ROUTER_PATHES.CALCULATOR_PATH}
        element={<CalculatorPage />}
      />
      <Route
        path={ROUTER_PATHES.DEFAULT_PATH}
        element={<AstroDecodingPage />}
      />
    </Route>
    {/*  */}
  </Routes>
)
