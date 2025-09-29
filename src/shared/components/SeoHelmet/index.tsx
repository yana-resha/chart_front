import { Helmet } from "react-v19-helmet-async"


type SeoHelmetProps = {
  title: string
  description?: string
  image?: string // для соцсетей
  url?: string // если не передать, возьмётся из window.location.href
}

export const SeoHelmet = ({
  title,
  description = 'Астрология и натальные карты онлайн',
  image = '/og-default.jpg',
  url,
}: SeoHelmetProps) => {
  const fullTitle = `${title} — ASTRODOC`
  const fullDescription = `${description} | ASTRODOC`
  const currentUrl = url ?? (typeof window !== 'undefined' ? window.location.href : 'https://astrodoc.app')

  return (
    <Helmet>
      {/* Основное */}
      <title>{fullTitle}</title>
      <meta
        name="description"
        content={fullDescription}
      />

      {/* Open Graph */}
      <meta
        property="og:title"
        content={fullTitle}
      />
      <meta
        property="og:description"
        content={fullDescription}
      />
      <meta
        property="og:site_name"
        content="ASTRODOC"
      />
      <meta
        property="og:type"
        content="website"
      />
      <meta
        property="og:url"
        content={currentUrl}
      />
      <meta
        property="og:image"
        content={image}
      />

      {/* Twitter */}
      <meta
        name="twitter:card"
        content="summary_large_image"
      />
      <meta
        name="twitter:title"
        content={fullTitle}
      />
      <meta
        name="twitter:description"
        content={fullDescription}
      />
      <meta
        name="twitter:image"
        content={image}
      />
    </Helmet>
  )
}
