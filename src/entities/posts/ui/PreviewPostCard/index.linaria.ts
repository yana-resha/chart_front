import { styled } from '@linaria/react'
import { Link } from 'react-router-dom'

// если у тебя нет константы — просто поставь '500px'
export const MEDIA_HORIZONTAL_CARD = '500px'

export const Card = styled.div`
  border-radius: 20px;
  overflow: hidden;
  background: linear-gradient(135deg, rgba(215, 237, 237, 0.58) -121.355%, rgba(204, 235, 235, 0) 120%);

  /* объявляем КОНТЕЙНЕР */
  container-type: inline-size;
`

/* 👇 новая внутренняя обёртка: именно она управляет layout */
export const CardInner = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 300px;
  height: 100%;
  max-height: 100%;

  @container (min-width: ${MEDIA_HORIZONTAL_CARD}) {
    flex-direction: row;
    min-height: 200px; /* опционально */
  }
`

export const ImageWrapper = styled.div`
  width: 100%;
  height: 143px;
  overflow: hidden;

  @container (min-width: ${MEDIA_HORIZONTAL_CARD}) {
    max-width: 320px;
    width: 40%;
    height: auto;
    aspect-ratio: 4 / 3;
    flex-shrink: 0;
  }
`

export const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-top: 1.1875rem;
  padding-bottom: 1.0875rem;
  padding-left: 1rem;
  padding-right: 1rem;
  gap: 10px;
  flex: 1;

  @container (min-width: ${MEDIA_HORIZONTAL_CARD}) {
    padding-left: 1.125rem;
    padding-right: 1.125rem;
  }
`

export const ContentWrapper = styled.div``

export const CardTitle = styled(Link)`
  text-decoration: none;
  margin: 0;
  padding: 0;
  line-height: 1.25rem;
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 4px;
  color: rgba(255, 255, 255, 0.92);
`

export const CardDescription = styled.p`
  font-size: 0.75rem;
  line-height: 1.125rem;
  color: rgba(255, 255, 255, 0.56);
  margin: 0;
`

export const CardFooter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`

export const CardDate = styled.div`
  font-size: 0.6875rem;
  line-height: 1rem;
  color: rgba(255, 255, 255, 0.4);
  margin-bottom: 6px;
`

export const CardTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 6px;
`

export const CardTag = styled.span`
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 999px;
  padding: 2px 8px;
  font-size: 0.6875rem;
  line-height: 1rem;
  color: rgba(255, 255, 255, 0.6);
`
