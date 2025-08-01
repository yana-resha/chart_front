import { PATH_TITLE_MAP, ROUTER_PATHES } from '@/shared/constants/router-paths'

export const getBreadcrumbSchema = (pathname: string, origin: string): object => {
  const parts = pathname.split('/').filter(Boolean)

  const items = parts.map((_, i) => {
    const path = '/' + parts.slice(0, i + 1).join('/')
    const name = PATH_TITLE_MAP[path] ?? decodeURIComponent(parts[i])

    return {
      '@type': 'ListItem',
      position: i + 2,
      name,
      item: origin + path,
    }
  })

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: PATH_TITLE_MAP[ROUTER_PATHES.DEFAULT_PATH],
        item: origin + '/',
      },
      ...items,
    ],
  }
}
