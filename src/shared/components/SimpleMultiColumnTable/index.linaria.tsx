import { styled } from '@linaria/react'

export const Container = styled.div`
  width: 100%;
  overflow-x: auto;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.12);
`

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
  line-height: 1.4;
  color: rgba(255, 255, 255, 0.8);
  height: 100%;
`

export const Th = styled.th`
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.03));
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
  border-right: 1px solid rgba(255, 255, 255, 0.1);

  font-size: 16px;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  padding: 8px;

  text-align: left;

  &:last-child {
    border-right: none;
  }
`

export const Td = styled.td<{ highlight?: boolean }>`
  padding: 6px 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
  border-right: 1px solid rgba(255, 255, 255, 0.1);

  color: ${(p) => (p.highlight ? 'rgb(22, 238, 246)' : 'rgba(255, 255, 255, 0.8)')};
  font-weight: ${(p) => (p.highlight ? 600 : 400)};

  vertical-align: top;

  &:last-child {
    border-right: none;
  }
`

export const Tr = styled.tr`
  height: 100%; /* строка занимает всю доступную высоту */
  &:last-child td {
    border-bottom: none;
  }
`
