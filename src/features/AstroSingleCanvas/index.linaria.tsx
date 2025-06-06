import { styled } from '@linaria/react'

export const Tooltip = styled.div`
  --x: 0px;
  --y: 0px;
  position: fixed;
  display: none;
  left: 0px;
  top: 0px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  background: rgb(0, 0, 0);
  font-size: 14px;
  font-weight: 500;
  line-height: 18px;
  letter-spacing: 0.15px;
  color: white;
  padding: 7px 12px;
  transform: translate(var(--x), var(--y));
`
