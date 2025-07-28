import { ReactNode } from 'react'

import { styled } from '@linaria/react'

import { TitleSubTag } from '../../ui/PostCard'

export const AspectTag = styled(TitleSubTag)<{ color?: string; children?: string | ReactNode }>`
  padding: 2px 6px;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.07);
  color: ${({ color }) => color ?? 'inherit'};
`
