import { styled } from '@linaria/react'

export const Container = styled.div`
  width: 100%;
`

export const Title = styled.h1`
  color: rgba(255, 255, 255, 1);
  font-size: clamp(20px, 6cqi, 32px);
  line-height: 122%;
  font-weight: 500;
  margin-bottom: 25px;
`

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

export const TimeGridRow = styled.div`
  display: grid;
  grid-template-columns: 50% 45%;
  justify-content: space-between;
`

export const CoordsGridRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: space-between;
  gap: 10px;
  align-items: start;
`
