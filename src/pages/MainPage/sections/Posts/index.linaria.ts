import { css } from '@linaria/core'
import { styled } from '@linaria/react'
import { Section } from '../../index.linaria'

export const PostsSection = styled(Section)`
  position: relative;
  width: 100%;
  overflow: hidden;
`

export const PostsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;

  @media (max-width: 500px) {
    gap: 20px;
  }
`

export const PostsGridStyles = css`
  gap: 20px;
  grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr) !important;
  }
  @media (max-width: 500px) {
    grid-template-columns: 1fr !important;
  }
`

export const ListFooter = styled.div`
  display: flex;
  justify-content: center;

  @media (max-width: 500px) {
    display: grid;
    justify-content: stretch;
  }
`
