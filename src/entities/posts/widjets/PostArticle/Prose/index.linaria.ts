import { styled } from '@linaria/react'

import { MEDIA_POINTS } from '@/shared/assets/styles/media-points'
import { TEXT_SIZE } from '@/shared/assets/styles/text-size'
import { H2, H3 } from '@/shared/assets/styles/titles.linaria'

/** Корневой контейнер статьи */
export const ProseRoot = styled.div`
  color: rgba(255, 255, 255, 0.8);
  font-size: ${TEXT_SIZE.L};
  line-height: 1.72;
  /* clearfix для float-обтекания */
  &::after {
    content: '';
    display: block;
    clear: both;
  }
`

/* опционально, чтобы заголовки не обтекались плавающими картинками сверху */
export const PostH2 = styled(H2)`
  margin: 24px 0 8px;
  padding-left: 0;
`
export const PostH3 = styled(H3)`
  margin: 20px 0 6px;
  padding-left: 0;
`

export const P = styled.p`
  margin: 12px 0;
  font-size: ${TEXT_SIZE.L};

  @media (max-width: ${MEDIA_POINTS.TABLET}px) {
    font-size: ${TEXT_SIZE.M};
  }
`

export const A = styled.a`
  color: #9ecbff;
  text-decoration: underline;
  text-underline-offset: 2px;
  &:hover {
    opacity: 0.9;
  }
`

export const Ul = styled.ul`
  margin: 8px 0 12px 12px;
  list-style: none;
  padding-left: 0; /* убираем стандартный отступ */

  @media (max-width: ${MEDIA_POINTS.TABLET}px) {
    margin: 8px 0 12px 0px;
  }
`

export const Li = styled.li`
  position: relative;
  padding-left: 0.5em; /* место под кастомный маркер */
`

export const Ol = styled.ol`
  margin: 8px 0 12px 12px;
  list-style: none; /* убираем дефолтные цифры */
  padding-left: 0;
  counter-reset: li; /* сбрасываем счётчик */

  @media (max-width: ${MEDIA_POINTS.TABLET}px) {
    margin: 8px 0 12px 0px;
  }
`

export const LiNumbered = styled.li`
  position: relative;
  padding-left: 1.6em;

  counter-increment: li; /* увеличиваем счётчик */

  &::before {
    content: counter(li) '.';
    position: absolute;
    left: 0;
    top: 0;
    color: rgba(255, 255, 255, 0.65); /* тот же акцентный голубой */
  }
`

export const Blockquote = styled.blockquote`
  margin: 24px 0;
  padding: 18px 22px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  color: rgba(255, 255, 255, 0.9);

  /* 👇 не даём блоку «наезжать» на float-рисунки */
  clear: both;
  display: flow-root;

  p {
    margin: 0;
  }
`

export const ImgWrapper = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 12px;
  width: 100%;
  height: auto;

  /* 👇 полноширинные изображения ниже любых float */
  clear: both;
  display: flow-root;
`

export const Img = styled.img`
  display: block;
  width: 100%;
  height: auto;

  /* по умолчанию — без трансформа, анимация запускается классом */
  will-change: transform, opacity;

  &.inview {
    animation: zoomInOut 5000ms cubic-bezier(0.22, 0.61, 0.36, 1) both;
  }

  @keyframes zoomInOut {
    0% {
      transform: scale(1);
      opacity: 0.92;
    }
    45% {
      transform: scale(1.08);
      opacity: 1;
    } /* пик зума */
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    &.inview {
      animation: none;
    }
  }
`

export const Strong = styled.strong`
  font-weight: 700;
  color: rgba(255, 255, 255, 1);
`

/** Для ::img директивы — такая же логика */
export const Figure = styled.figure`
  margin: 12px 0;
  border-radius: 12px;
  overflow: hidden;
  position: relative;

  /* полноширинные figure */
  clear: both;
  display: flow-root;

  &.wrap-left {
    float: left;
    margin: 6px 16px 12px 0;
    max-width: 44%;
    clear: none; /* для wrap-вариантов обтекание не чистим */
    display: block; /* возвращаем обычный поток */
  }
  &.wrap-right {
    float: right;
    margin: 6px 0 12px 16px;
    max-width: 44%;
    clear: none;
    display: block;
  }

  figcaption {
    margin: 0;
    padding: 5px;
    padding-bottom: 0;
  }

  @media (max-width: 720px) {
    &.wrap-left,
    &.wrap-right {
      float: none;
      max-width: 100% !important;
      margin: 12px 0;
      clear: both; /* на мобилках всё идёт столбиком */
      display: flow-root;
    }
  }
`

export const Figcaption = styled.figcaption`
  font-size: 13px;
  color: rgba(255, 255, 255, 0.56);
  margin-top: 6px;
`

/* Код */
export const InlineCode = styled.code`
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', monospace;
  font-size: 0.9em;
  background: #0f1320;
  border: 1px solid rgba(255, 255, 255, 0.12);
  padding: 0.1em 0.4em;
  border-radius: 6px;
`

export const Pre = styled.pre`
  margin: 12px 0;
  background: #0f1320;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 10px;
  overflow-x: auto;
  padding: 12px 14px;

  clear: both;
  display: flow-root;
`

export const BlockCode = styled.code`
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', monospace;
  font-size: 0.9em;
  line-height: 1.5;
  display: block;
  white-space: pre;
`

/* Таблицы */
/* обёртка со скроллом */
export const TableScroll = styled.div`
  position: relative;
  margin: 14px 0;
  overflow-x: auto;
  overflow-y: visible;
  -webkit-overflow-scrolling: touch;

  clear: both;
  display: flow-root;
`

export const Table = styled.table`
  width: 100%;
  min-width: 640px;
  font-size: 0.95rem;
  background: transparent;

  border-collapse: separate; /* чтобы внешняя рамка не сливалась */
  border-spacing: 0;
`

export const Caption = styled.caption`
  caption-side: top;
  text-align: left;
  color: rgba(255, 255, 255, 0.72);
  font-weight: 600;
  margin-bottom: 8px;
`

export const Th = styled.th`
  position: sticky;
  top: 0;
  z-index: 1;

  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);

  color: rgba(255, 255, 255, 0.9);
  font-weight: 600;
  text-align: left;

  border: 1px solid rgba(255, 255, 255, 0.16);
  padding: 10px 12px;
  white-space: nowrap;
`

export const Td = styled.td`
  border: 1px solid rgba(255, 255, 255, 0.16);
  padding: 10px 12px;
  color: rgba(255, 255, 255, 0.84);
  vertical-align: top;
  transition: background-color 0.25s ease; /* 👈 плавный переход */
`

export const Tr = styled.tr`
  &:hover ${Td} {
    background: rgba(255, 255, 255, 0.05);
  }
`
