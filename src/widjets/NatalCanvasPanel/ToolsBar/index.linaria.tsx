import { styled } from '@linaria/react'

export const ToolsBarWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 16px;
  background: rgba(255, 255, 255, 0.03);
  border: none;
  backdrop-filter: blur(0px);
  font-size: 14px;
  color: white;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 14px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
  overflow: hidden;
`

export const LeftSide = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`

export const RightSide = styled.div`
  display: flex;
  align-items: center;
`

export const Icon = styled.div`
  width: 20px;
  height: 20px;

  & svg {
    width: 100%;
    height: 100%;
    stroke: rgba(255, 255, 255, 1);
  }
`
