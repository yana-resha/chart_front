import { useEffect } from 'react'

import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'

import { EmptyPage } from '../index.linaria'
import { AuthPage } from '@/pages/AuthPage'
import { ROUTER_PATHES } from '@/shared/constants/router-paths'

export const AuthRouter = () => {
  const navigate = useNavigate()
  // пока заглушка
  const isAuth = false

  // если прошла авторизация переадресовать на главную страницу авторизованного пользователя
  useEffect(() => {
    if (isAuth) navigate(ROUTER_PATHES.DEFAULT_PATH)
  }, [isAuth, navigate])

  return (
    <Routes>
      {/* Если нет авторизации, любой url (кроме тех которые ниже) перенаправляем на дефолтную страницу авторизации */}
      <Route
        path="*"
        element={
          <Navigate
            to={ROUTER_PATHES.DEFAULT_AUTH_PATH}
            replace
          />
        }
      />
      {/*  */}
      <Route
        path={ROUTER_PATHES.DEFAULT_AUTH_PATH}
        element={<AuthPage />}
      />
      <Route
        path="/admin-auth"
        element={<EmptyPage>Тут будет страница админ-авторизации...</EmptyPage>}
      />
    </Routes>
  )
}
