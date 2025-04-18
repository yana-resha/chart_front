import { EmptyPage } from './index.linaria'
import { AuthRouter } from './Routers/AuthRouter'
import { MainRouter } from './Routers/MainRouter'

export const Router = () => {
  // пока заглушка, пока нет описания логики процесса авторизации
  const isAuth = true
  const { isUserLoading } = { isUserLoading: false }

  if (!isAuth) {
    return <AuthRouter />
  }

  // если есть авторизация, но загружаетcя инормация о пользователе
  if (isAuth && isUserLoading) {
    return <EmptyPage>Подождите, пока загружается информация о пользователе...</EmptyPage>
  }

  if (isAuth) {
    return <MainRouter />
  }
}
