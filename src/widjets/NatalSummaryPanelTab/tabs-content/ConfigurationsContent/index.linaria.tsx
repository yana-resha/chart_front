import { styled } from '@linaria/react'

export const Container = styled.div`
  width: 100%;
  border-radius: 20px;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.025);
  box-shadow:
    inset 0 0 80px rgba(255, 255, 255, 0.02),
    0 0 12px rgba(0, 0, 0, 0.1);
  color: rgba(255, 255, 255, 0.7);
  font-size: 16px;
  font-style: italic;
  line-height: 1.7;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 300px;
  position: relative;
  backdrop-filter: blur(1.5px) brightness(1.1);
  transition: all 0.3s ease;
`

export const IconBox = styled.div`
  width: auto;
  height: 150px;
  margin-bottom: 1rem;

  & > svg {
    width: 100%;
    height: 100%;
    color: rgba(255, 255, 255, 0.6);
  }
`

export const Title = styled.h3`
  font-size: 1.375rem;
  margin-bottom: 1rem;
  margin-top: 0;
  color: rgba(255, 255, 255, 1);
`

export const Description = styled.p`
  font-size: 1rem;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.75);
  padding: 0;
  margin: 0;

  & span {
    color: rgb(22, 238, 246);
  }

  & br {
    display: block;
    content: '';
    margin-bottom: 0.6em;
  }
`

export const Quote = styled.div`
  margin-top: 2.5rem;
  font-style: italic;
  font-size: 0.98rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.5);
  max-width: 700px;
`
