import { styled } from '@linaria/react'

export const Container = styled.div`
  position: relative;
  width: 100%;
`

export const ToggleButton = styled.button`
  display: block;
  width: 100%;
  margin: 0;
  color: black;
  font-weight: 400;
  border: none;
  padding: 0.75rem;
  margin-top: -2px;
  cursor: pointer;
  font-weight: 400;
  background: linear-gradient(to top, rgba(22, 238, 246, 0.5), rgba(22, 238, 246, 0));
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-top: none; /* чтобы не было двойной линии */
`
