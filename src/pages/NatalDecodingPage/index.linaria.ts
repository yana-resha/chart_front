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
  max-height: calc(100dvh - 1.56rem);
  overflow: hidden;
`

export const PageContent = styled.div`
  padding-top: 1.875;
  padding-bottom: 10px;
`

export const WidjetsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.56rem;
  max-width: 100%;
`
