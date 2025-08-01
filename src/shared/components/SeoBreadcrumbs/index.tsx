import { useLocation } from 'react-router-dom'
import { Helmet } from 'react-v19-helmet-async'

import { getBreadcrumbSchema } from './getBreadcrumbSchema'

export const SeoBreadcrumbs = () => {
  const location = useLocation()
  const origin = typeof window !== 'undefined' ? window.location.origin : ''
  const schema = getBreadcrumbSchema(location.pathname, origin)

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  )
}
