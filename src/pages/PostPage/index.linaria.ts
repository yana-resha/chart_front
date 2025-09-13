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
  grid-template-columns: 1fr;
`
