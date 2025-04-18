import { styled } from '@linaria/react'

import { DROPDOWN_VERTICAL_POSITION } from '../types'
import CheckSvg from '@/shared/assets/icons/check.svg?react'
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
  padding: 16px 0px;
  z-index: 1;
  width: 100%;
  overflow-y: auto;
`
export const OptionsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`
export const CheckIcon = styled(CheckSvg)`
  width: 20px;
  height: 20px;
  opacity: 0;
  &.show {
    opacity: 0.5;
  }
  transition: opacity 0.2s;
`
export const OptionItem = styled.div`
  padding: 12px 20px;
  width: 100%;
  font-weight: 300;
  line-height: 24px;
  font-size: 16px;
  background-color: transparent;
  color: rgba(255, 255, 255, 1);
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

  &:hover:after,
  &:hover ${CheckIcon}.show {
    opacity: 1;
  }
`
export const ItemContent = styled.div`
  padding-right: 10px;
`
export const SkeletonItem = styled.div`
  background: linear-gradient(145.32deg, rgba(215, 237, 237, 0.16) -28.965%, rgba(204, 235, 235, 0) 100%);
  margin: 0 20px;
  overflow: hidden;
  height: 48px;
  display: flex;
  align-items: stretch;
  &:not(:last-child) {
    margin-bottom: 16px;
  }
`
export const DropdownAlertBlock = styled.div`
  min-height: 140px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: rgba(255, 255, 255, 1);
`
export const AlertTitle = styled.div`
  font-size: 16px;
  line-height: 24px;
  font-weight: 500;
`
export const AlertDescription = styled.div`
  font-size: 14px;
  line-height: 20px;
  font-weight: 500;
`
export const UpsetIconSVG = styled(UpsetIcon)`
  width: 64px;
  height: 64px;
  margin-bottom: 8px;
`
