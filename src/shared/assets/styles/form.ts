import { css } from '@linaria/core'
import { styled } from '@linaria/react'

import { SHARED_COLORS_VARIABLES } from './colors'
import { MEDIA_POINTS } from './media-points'
import UpsetIcon from '@/shared/assets/icons/upset-smile.svg?react'

export const FormElementContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
`

export const FormElementLabel = styled.label`
  font-size: clamp(12px, 0.875rem, 16px);
  line-height: 1.2;
  color: rgba(155, 156, 158);
  margin-bottom: 10px;

  @media (max-width: ${MEDIA_POINTS.TABLET}px) {
    font-size: clamp(12px, 0.75rem, 16px);
    margin-bottom: 8px;
  }
`

export const FormElementError = styled.div`
  font-size: clamp(12px, 0.875rem, 16px);
  line-height: 1.2;
  color: ${SHARED_COLORS_VARIABLES.ERROR_COLOR};
  overflow: hidden;
  height: 1.25rem;
  max-height: 0;
  margin-top: 0;
  transition:
    max-height 0.2s,
    margin-top 0.1s;

  &:not(:empty) {
    margin-top: 0.7rem;
    opacity: 1;
    max-height: 100px;
  }

  @media (max-width: ${MEDIA_POINTS.TABLET}px) {
    font-size: clamp(12px, 0.75rem, 16px);
    height: 1rem;

    &:not(:empty) {
      margin-top: 0.5rem;
    }
  }
`

export const FormInputContainer = styled.div`
  background-color: rgb(26, 29, 33);
  border: 1px solid rgb(54, 58, 61);
  border-radius: 8px;
  color: white;
  position: relative;
  min-height: 48px;
  padding: 0.75rem 1.06rem 0.75rem 1.18rem;
  display: flex;
  flex-direction: row;
  column-gap: 0.75rem;
  align-items: center;
  outline-offset: 3px;
  outline: 2px solid transparent;
  transition: all 0.2s;

  @media (max-width: ${MEDIA_POINTS.TABLET}px) {
    padding: 0.4rem 0.8rem 0.4rem 0.8rem;
    min-height: 45px;
  }

  &:hover,
  &:focus-within {
    box-shadow: 0px 0px 0px 4px rgba(54, 58, 61, 0.24);
  }

  &:focus-visible {
    outline: 2px solid rgba(54, 58, 61, 0.5);
  }

  &.disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }

  &.invalid {
    border-color: ${SHARED_COLORS_VARIABLES.ERROR_COLOR};
    &:has(input:focus),
    &.isActive {
      box-shadow: 0px 0px 0px 4px rgba(208, 48, 47, 0.24);
    }
  }

  &:not(.invalid):has(input:focus),
  &:not(.invalid).isActive {
    border-color: rgb(130, 219, 247);
    box-shadow: 0px 0px 0px 4px rgba(132, 220, 245, 0.24);
  }
`

export const FormInputCSS = css`
  padding: 0;
  padding-left: 1px;
  margin: 0;
  flex-grow: 1;
  height: fit-content;
  font-size: clamp(12px, 0.875rem, 16px);
  line-height: 1.4;
  font-weight: 400;
  color: rgb(255, 255, 255, 0.8);
  letter-spacing: 0.15px;
  outline: none;
  border: none;
  background-color: transparent;

  &:placeholder: {
    color: rgb(155, 156, 158);
  }

  &[type='date']::-webkit-calendar-picker-indicator,
  &[type='time']::-webkit-calendar-picker-indicator {
    display: none;
  }
`

export const FormIconCSS = css`
  color: rgba(255, 255, 255, 0.7);
  width: 1.25rem;
  height: 1.25rem;

  @media (max-width: ${MEDIA_POINTS.TABLET}px) {
    width: 1.15rem;
    height: 1.15rem;
  }
`

/* Дропдауны */

export const Dropdown = styled.div`
  background-color: rgba(19, 22, 25, 1);
  border-radius: 5px;
  border: 1px solid rgba(54, 58, 61);
  z-index: 1;
  width: 100%;
  overflow-y: auto;

  overscroll-behavior: contain;
  -webkit-overflow-scrolling: touch;

  will-change: transform, top, left;
  transition: none;
`

export const DropdownList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

export const DropdownItem = styled.div`
  padding: 0.75rem 1.25rem;
  width: 100%;
  font-weight: 300;
  line-height: 1.2;
  font-size: clamp(12px, 0.875rem, 16px);
  background-color: transparent;
  color: rgba(255, 255, 255, 0.8);
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

  &:hover:after {
    opacity: 1;
  }

  &.active:after {
    opacity: 0.8;
  }
`

export const DropdownItemContent = styled.div`
  padding-right: 10px;
`

export const DropdownItemIconContainer = styled.div`
  opacity: 0.3;
  height: 1.2rem;
  transition: opacity 0.2s;
  & svg {
    width: 1.2rem;
    height: 1.2rem;
  }
`

export const SkeletonItem = styled.div`
  background: linear-gradient(145.32deg, rgba(215, 237, 237, 0.16) -28.965%, rgba(204, 235, 235, 0) 100%);
  margin: 0 0.5rem;
  overflow: hidden;
  height: 2.68rem;
  display: flex;
  align-items: stretch;
  &:not(:last-child) {
    margin-bottom: 0.5rem;
  }
`
export const DropdownAlertBlock = styled.div`
  height: 100%;
  display: flex;
  padding: 1rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: rgba(255, 255, 255, 1);
`
export const AlertTitle = styled.div`
  font-size: 1rem;
  line-height: 1.2;
  margin-bottom: 3px;
  font-weight: 500;
  text-align: center;
`
export const AlertDescription = styled.div`
  font-size: 0.875rem;
  line-height: 1.2;
  text-align: center;
  color: rgba(255, 255, 255, 0.8);
`
export const UpsetIconSVG = styled(UpsetIcon)`
  width: 3.5rem;
  height: 3.5rem;
  margin-bottom: 0.6rem;
`
