import { styled } from '@linaria/react'

export const PostsSection = styled.section`
  position: relative;
  width: 100%;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.3);
`

export const PostsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;

  @media (max-width: 500px) {
    gap: 20px;
  }
`

export const PostsGrid = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  @media (max-width: 1000px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 500px) {
    grid-template-columns: 1fr;
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
