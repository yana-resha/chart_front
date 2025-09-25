import { styled } from '@linaria/react'

import { glassBorderSide, GlassCardRoot } from '@/shared/assets/styles/glass'
import { TEXT_SIZE } from '@/shared/assets/styles/text-size'

export const Card = styled(GlassCardRoot)`
  padding: 1rem;
  color: rgba(255, 255, 255, 1);
  border-radius: 12px;
  font-size: ${TEXT_SIZE.S};
  line-height: 1.6;
  width: 100%;
  max-width: 100%;
`

export const Divider = styled.div`
  position: relative;
  height: 1px;
  width: 100%;
  margin: 0.725rem 0;
  ${glassBorderSide('bottom')};
`

export const Row = styled.div`
  margin-bottom: 0.625rem;
  display: grid;
  grid-template-columns: 172px 1fr;
  gap: 0.5rem;
`

export const LabelBlock = styled.div`
  display: flex;
  min-width: 0;
  gap: 0.5rem;
`

export const Label = styled.span`
  color: rgba(255, 255, 255, 0.7);
`

export const Icon = styled.span`
  font-size: clamp(12px, 0.875rem, 16px);
  line-height: 1.6;
`
