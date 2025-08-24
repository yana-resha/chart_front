import { styled } from '@linaria/react'

export const PlanetsContentLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  width: 100%;
  min-width: 0;
  align-items: start;
`

export const DoubleGridLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  width: 100%;
  min-width: 0;
  align-items: start;
`

export const PlanetInDegressGrid = styled.div`
  display: grid;
  gap: 16px;
  width: 100%;
  grid-template-columns: 1fr;
  align-items: stretch;
  min-width: 0;
`

/* Основные качества список и карточки */
export const BalanceGrid = styled.div`
  display: grid;
  gap: 16px;
  width: 100%;
  grid-template-columns: repeat(3, 1fr);
  align-items: stretch;
  min-width: 0;
`

export const GridHeader = styled.h3`
  grid-column: 1 / -1;
  font-size: 1.05rem;
  padding-left: 0.5rem;
  font-weight: 500;
  margin: 0;
  color: rgba(255, 255, 255, 0.9);
`

export const Card = styled.div`
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 14px;
  padding: 1rem;
  padding-top: 0.8rem;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.8);
  min-width: 0;
`

export const Title = styled.div`
  display: flex;
  align-items: center;
  color: rgba(255, 255, 255, 0.9);
  gap: 8px;
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 8px;
  position: relative;

  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: rgba(255, 255, 255, 0.12);
    margin-left: 8px;
  }
`

export const List = styled.ul`
  display: grid;
  gap: 6px;
  list-style: none;
  margin: 0;
  padding: 0;
  min-width: 0;
`

/* Ретро и достоинства */
export const RetroGrid = styled.div`
  display: grid;
  gap: 1rem;
  width: 100%;
  grid-template-columns: repeat(5, 1fr);
  align-items: stretch;
  min-width: 0;
`
