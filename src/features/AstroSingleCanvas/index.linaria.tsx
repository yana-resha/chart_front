import { styled } from '@linaria/react'

export const Tooltip = styled.div`
  --x: 0px;
  --y: 0px;
  position: fixed;
  z-index: 1;
  display: none;
  left: 0px;
  top: 0px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  background: rgb(0, 0, 0);
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 128%;
  letter-spacing: 0.15px;
  color: white;
  padding: 0.48rem 0.75rem;
  transform: translate(var(--x), var(--y));
`
