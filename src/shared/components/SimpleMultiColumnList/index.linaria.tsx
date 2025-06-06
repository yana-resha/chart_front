import { styled } from '@linaria/react'

export const Container = styled.div<{ columns: number }>`
  display: grid;
  grid-template-columns: repeat(${(p) => p.columns}, 1fr);
  gap: 0; /* здесь gap=0, так как границы формируют разделение */

  width: 100%;
  font-size: 14px;
  line-height: 1.4;
  color: rgba(255, 255, 255, 0.8);

  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  overflow: auto;
`

export const Column = styled.div`
  display: flex;
  flex-direction: column;

  &:not(:last-child) {
    border-right: 1px solid rgba(255, 255, 255, 0.1);
  }
`

export const Header = styled.div`
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.03));
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
  font-size: 16px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.85);
  padding: 8px;
`

export const Item = styled.div<{ highlight?: boolean }>`
  padding: 6px 10px;

  font-size: 14px;
  color: ${(p) => (p.highlight ? 'rgb(22, 238, 246)' : 'rgba(255, 255, 255, 0.8)')};
  font-weight: ${(p) => (p.highlight ? 600 : 400)};
`
