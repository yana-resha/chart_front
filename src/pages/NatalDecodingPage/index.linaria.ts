import { css } from '@linaria/core'
import { styled } from '@linaria/react'

interface LayoutProps {
  isLoading?: boolean
}

export const Layout = styled.section<LayoutProps>`
  height: 100%;
  width: 100%;
  max-width: 100%;
  position: relative;
`

export const layoutLoading = css`
  max-height: calc(100dvh - 25px);
  overflow: hidden;
`

export const PageContent = styled.div`
  padding-top: 30px;
  padding-bottom: 10px;
`

export const WidjetsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
  max-width: 100%;
`
