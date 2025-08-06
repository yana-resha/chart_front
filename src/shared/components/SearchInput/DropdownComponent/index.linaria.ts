import { styled } from '@linaria/react'

import { DROPDOWN_VERTICAL_POSITION } from '../types'
import UpsetIcon from '@/shared/assets/icons/upset-smile.svg?react'

export const DropdownContainer = styled.div<{
  vertical: DROPDOWN_VERTICAL_POSITION
  width: number
  left: number
  parentTop: number
  parentBottom: number
  inputHeight: number
  currentHeight: number
}>`
  width: ${(props) => props.width}px;
  position: absolute;
  left: ${(props) => props.left}px;
  top: ${({ vertical, parentTop, parentBottom, currentHeight }) =>
    vertical === DROPDOWN_VERTICAL_POSITION.TOP ? parentTop - currentHeight + 'px' : parentBottom + 'px'};
  min-height: 150px;
  max-height: 300px;
  display: flex;
  padding-top: 10px;
  padding-bottom: 10px;
`

export const Dropdown = styled.div`
  background-color: rgba(19, 22, 25, 1);
  border-radius: 5px;
  border: 1px solid rgba(54, 58, 61);
  padding-top: 1rem;
  padding-bottom: 1rem;
  z-index: 1;
  width: 100%;
  overflow-y: auto;
`

export const DropdownList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const ItemIconContainer = styled.div`
  opacity: 0.3;
  height: 1.5rem;
  transition: opacity 0.2s;
  & svg {
    width: 1.5rem;
    height: 1.5rem;
  }
`
export const DropdownItem = styled.div`
  padding: 0.75rem 1.25rem;
  width: 100%;
  font-weight: 300;
  line-height: 1.2;
  font-size: clamp(12px, 0.875rem, 16px);
  background-color: transparent;
  color: rgba(255, 255, 255, 1);
  outline: 1px solid rgba(255, 255, 255, 0);
  position: relative;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: flex-start;

  &:after {
    content: '';
    position: absolute;
    transition: all 0.2s;
    opacity: 0;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(145.32deg, rgba(215, 237, 237, 0.16) -28.965%, rgba(204, 235, 235, 0) 100%);

    z-index: 0;
    box-shadow:
      0px 1px 3px 0px rgba(6, 7, 8, 0.05),
      0px 1px 2px -1px rgba(6, 7, 8, 0.05),
      inset 0px 2px 12px 0px rgba(26, 29, 33, 0.64);
  }

  &:hover ${ItemIconContainer} {
    opacity: 1;
  }

  &:hover:after {
    opacity: 1;
  }
`
export const ItemContent = styled.div`
  padding-right: 10px;
`
export const SkeletonItem = styled.div`
  background: linear-gradient(145.32deg, rgba(215, 237, 237, 0.16) -28.965%, rgba(204, 235, 235, 0) 100%);
  border-radius: 0px;
  margin: 0 1.25rem;
  overflow: hidden;
  height: 3rem;
  display: flex;
  align-items: stretch;
  &:not(:last-child) {
    margin-bottom: 1rem;
  }
`
export const DropdownAlertBlock = styled.div`
  min-height: 140px;
  display: flex;
  padding-left: 1rem;
  padding-right: 1rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: rgba(255, 255, 255, 1);
`
export const AlertTitle = styled.div`
  font-size: 1rem;
  line-height: 1.2;
  font-weight: 500;
  text-align: center;
`
export const AlertDescription = styled.div`
  font-size: clamp(12px, 0.875rem, 16px);
  line-height: 1.2;
  font-weight: 300;
  text-align: center;
`
export const UpsetIconSVG = styled(UpsetIcon)`
  width: 4rem;
  height: 4rem;
  margin-bottom: 0.5rem;
`
