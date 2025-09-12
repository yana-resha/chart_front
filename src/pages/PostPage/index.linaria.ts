import { styled } from '@linaria/react'

export const Layout = styled.section`
  height: 100%;
  width: 100%;
  max-width: 100%;
  position: relative;
`

export const Page = styled.div`
  --text: #e8ecf1;
  --text-muted: #a6b0c2;
  --bg: #0d0f14;
  --bg-soft: #141824;
  --border: #262c3a;
  --primary: #4b6bfb; /* добавил: используется в blockquote */

  max-width: 960px;
  margin: 0 auto;
  padding: 32px 16px 56px;
`

export const Article = styled.article``

export const MetaRowWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px 16px;
  align-items: center;
  color: var(--text-muted);
  font-size: 14px;
  margin-bottom: 8px;
`

/* Старое имя для совместимости */
export const Tag = styled.span`
  border: 1px solid var(--border);
  border-radius: 999px;
  padding: 4px 10px;
  font-size: 12px;
  color: var(--text-muted);
`

/* Новое имя, которое используем в компоненте */
export const TagPill = styled(Tag)``

export const Cover = styled.div`
  margin-top: 12px;
  border: 1px solid var(--border);
  border-radius: 24px;
  overflow: hidden;
  background: var(--bg-soft);
  > img {
    width: 100%;
    height: clamp(260px, 45vh, 440px);
    object-fit: cover;
    display: block;
  }
`

export const Prose = styled.div`
  margin-top: 24px;
  color: var(--text);
  font-size: 16px;
  line-height: 1.72;

  h2 {
    font-size: 24px;
    margin: 24px 0 8px;
    line-height: 1.2;
  }
  h3 {
    font-size: 18px;
    margin: 20px 0 6px;
  }
  p {
    margin: 12px 0;
    font-size: 18px;
  }
  ul {
    margin: 8px 0 12px 16px;
  }
  li {
    margin: 6px 0;
  }
  blockquote {
    margin: 16px 0;
    padding: 12px 16px;
    border-left: 3px solid var(--primary);
    background: var(--bg-soft);
    border-radius: 8px;
    color: var(--text);
  }
  img {
    border-radius: 12px;
    max-width: 100%;
    height: auto;
  }

  /* === Обтекание картинок внутри Markdown (для ::img директив и сырого HTML) === */
  .wrap-left,
  .wrap-right {
    border-radius: 12px;
  }
  .wrap-left {
    float: left;
    margin: 6px 16px 12px 0;
  }
  .wrap-right {
    float: right;
    margin: 6px 0 12px 16px;
  }

  figure.wrap-left,
  figure.wrap-right {
    /* ширина по умолчанию может задаваться директивой width="44%", но если её нет,
       пусть будет разумный максимум */
    max-width: 44%;
  }
  figure img {
    width: 100%;
    height: auto;
    display: block;
    border-radius: 12px;
  }
  figcaption {
    font-size: 13px;
    color: var(--text-muted);
    margin-top: 6px;
  }

  /* Сброс обтекания, чтобы хвосты float не ломали низ страницы */
  &::after {
    content: '';
    display: block;
    clear: both;
  }

  /* На мобильных — без обтекания, картинки на всю ширину */
  @media (max-width: 720px) {
    .wrap-left,
    .wrap-right,
    figure.wrap-left,
    figure.wrap-right {
      float: none;
      max-width: 100% !important;
      margin: 12px 0;
    }
  }
`

// Gallery
export const GalleryWrap = styled.div`
  margin-top: 24px;
`
export const GalleryHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--text-muted);
  font-size: 14px;
  margin-bottom: 8px;
`
export const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 8px;
`
export const ThumbButton = styled.button`
  position: relative;
  border: 1px solid var(--border);
  border-radius: 16px;
  overflow: hidden;
  background: var(--bg-soft);
  aspect-ratio: 1 / 1;
  cursor: pointer;

  &:hover img {
    transform: scale(1.03);
  }
  &:focus-visible {
    outline: 2px solid var(--primary);
    outline-offset: 2px;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.25s ease;
    display: block;
  }
`

// Lightbox
export const Lightbox = styled.div`
  position: fixed;
  inset: 0;
  display: grid;
  place-items: center;
  background: rgba(0, 0, 0, 0.65);
  z-index: 50;
  padding: 24px;
  cursor: zoom-out;
`
export const LightboxInner = styled.div`
  position: relative;
  max-width: 1200px;
  width: 100%;
`
export const LightboxImg = styled.img`
  width: 100%;
  max-height: 80vh;
  object-fit: contain;
  display: block;
  border-radius: 12px;
  background: #000;
`
export const LightboxNav = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  padding: 8px 10px;
  border-radius: 999px;
  border: 1px solid #ffffff33;
  background: #0f1115aa;
  color: #fff;
  cursor: pointer;
  &:hover {
    background: #0f1115d0;
  }
  &:focus-visible {
    outline: 2px solid #fff;
    outline-offset: 2px;
  }
`
export const LightboxPrev = styled(LightboxNav)`
  left: 8px;
`
export const LightboxNext = styled(LightboxNav)`
  right: 8px;
`

export const Separator = styled.hr`
  border: none;
  border-top: 1px solid var(--border);
  margin: 28px 0;
`
export const TagCloud = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`

// Related
export const RelatedSection = styled.section`
  margin-top: 48px;
`
export const RelatedGrid = styled.div`
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
`
export const RelatedCard = styled.div`
  border: 1px solid var(--border);
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition:
    box-shadow 0.2s ease,
    transform 0.1s ease;
  &:hover {
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
    transform: translateY(-1px);
  }
  img {
    width: 100%;
    height: 160px;
    object-fit: cover;
    display: block;
  }
  h3 {
    font-size: 16px;
    margin: 10px 12px 6px;
  }
  p {
    font-size: 14px;
    color: var(--text-muted);
    margin: 0 12px 12px;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .card-tags {
    display: flex;
    gap: 6px;
    padding: 0 12px 14px;
    flex-wrap: wrap;
  }
`
