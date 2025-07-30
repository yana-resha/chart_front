import { styled } from '@linaria/react'

export const Layout = styled.div`
  height: 100%;
  width: 100%;
  max-width: 100%;
  position: relative;
`

export const HeaderContainer = styled.div`
  padding-left: 16px;
  padding-right: 16px;
`

export const PageTitle = styled.h1`
  top: 0;
  font-size: 30px;
  font-weight: 500;
  margin: 32px 0 24px;
  color: rgba(255, 255, 255, 1);
  line-height: 1.4;
  text-align: center;
  text-shadow:
    0 0 6px rgba(22, 238, 246, 0.1),
    0 0 12px rgba(22, 238, 246, 0.1),
    0 0 20px rgba(22, 238, 246, 0.15);
`

export const SectionTitle = styled.h2`
  font-size: 22px;
  font-weight: 500;
  padding-left: 16px;
  margin-bottom: 16px;
  line-height: 1.4;
  color: rgba(255, 255, 255, 0.9);
  text-shadow:
    0 0 6px rgba(22, 238, 246, 0.1),
    0 0 12px rgba(22, 238, 246, 0.1),
    0 0 20px rgba(22, 238, 246, 0.15);
`

export const WidjetsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  max-width: 100%;
`
