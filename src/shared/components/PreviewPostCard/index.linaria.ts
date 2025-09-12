import { styled } from '@linaria/react'

export const Card = styled.div`
  border-radius: 20px;
  overflow: hidden;
  background: linear-gradient(135deg, rgba(215, 237, 237, 0.58) -121.355%, rgba(204, 235, 235, 0) 120%);
  min-height: 300px;
  display: flex;
  flex-direction: column;
`

export const ImageWrapper = styled.div`
  width: 100%;
  height: 143px;
`
export const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
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
`

export const ContentWrapper = styled.div``

export const CardTitle = styled.h4`
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
`

export const CardFooter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`
