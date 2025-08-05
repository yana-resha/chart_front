import { styled } from '@linaria/react'

export const Card = styled.div`
  padding: 1rem;
  margin-top: 1.25rem;
  color: rgba(255, 255, 255, 1);
  font-size: clamp(12px, 0.875rem, 16px);
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
  margin-bottom: 0.625rem;
  display: flex;
  gap: 0.5rem;
`

export const LabelBlock = styled.div`
  display: flex;
  min-width: 160px;
  gap: 0.5rem;
`

export const Label = styled.span`
  color: rgba(255, 255, 255, 0.7);
`

export const Icon = styled.span`
  font-size: clamp(12px, 0.875rem, 16px);
  line-height: 1.6;
`

export const Divider = styled.div`
  height: 1px;
  background: rgba(255, 255, 255, 0.05);
  margin: 0.725rem 0;
  width: 100%;
`
