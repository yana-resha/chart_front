import { styled } from '@linaria/react'

export const Card = styled.div`
  padding: 16px;
  margin-top: 20px;
  color: rgba(255, 255, 255, 1);
  font-size: 14px;
  line-height: 1.6;
  width: 100%;
  max-width: 100%;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.02);
  transition:
    background 0.3s ease,
    border-color 0.3s ease,
    box-shadow 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.04);
    border-color: rgba(255, 255, 255, 0.15);
    box-shadow: 0 4px 12px rgba(255, 255, 255, 0.05);
  }
`

export const Row = styled.div`
  margin-bottom: 10px;
  display: flex;
  gap: 6px;
`

export const Label = styled.span`
  color: rgba(255, 255, 255, 0.7);
  min-width: 160px;
`

export const Icon = styled.span`
  font-size: 16px;
  margin-right: 4px;
  width: 18px;
`

export const Divider = styled.div`
  height: 1px;
  background: rgba(255, 255, 255, 0.05);
  margin: 12px 0;
  width: 100%;
`
