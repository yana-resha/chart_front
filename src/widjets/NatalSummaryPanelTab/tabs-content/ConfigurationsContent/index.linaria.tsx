import { styled } from '@linaria/react'

export const Container = styled.div`
  width: 100%;
/*   border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.03)); */
  padding: 0px 0px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
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

export const Title = styled.h2`
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 1rem;
  margin-top: 0;
  color: rgba(255, 255, 255, 0.9);
`

export const Description = styled.p`
  font-size: 14px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.8);
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
