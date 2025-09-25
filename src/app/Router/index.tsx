import { useEffect } from 'react'

import { useLocation } from 'react-router-dom'

/* это чтобы новая страница всегда сверху открывалась */
function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

import { MainRouter } from './Routers/MainRouter'
import { SeoBreadcrumbs } from '@/shared/components/SeoBreadcrumbs'

export const Router = () => (
  <>
    <SeoBreadcrumbs />
    <ScrollToTop />
    <MainRouter />
  </>
)
