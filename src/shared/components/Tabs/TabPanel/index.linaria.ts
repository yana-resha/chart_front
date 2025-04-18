import { css } from '@linaria/core'
import { styled } from '@linaria/react'

export const TabContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  flex: 100 1 0;
  white-space: nowrap;
`

export const ActiveIndicator = styled.div`
  width: 10px;
  height: 10px;
`

export const activeIndicatorStyle = css`
  background-repeat: no-repeat;
  background-position: 50%;
  background-image: radial-gradient(circle at center, green 0%, transparent 70%);
`
