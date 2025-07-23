import { styled } from '@linaria/react'

export const DefaultContainer = styled.div`
  display: grid;
  grid-template-columns: 312px 1fr;
  height: 100vh;
  max-height: fit-content;
  padding: 12px;
  gap: 12px;
`

export const SidebarStaticWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`

export const SidebarContainer = styled.div`
  height: calc(100vh - 24px);
  position: sticky;
  top: 12px;
`

export const PagesContainer = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
`
