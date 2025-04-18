import { useCallback, useRef } from 'react'
import React from 'react'

import classNames from 'classnames'

import { TextInputProps } from '../types'
import {
  ClearIcon,
  Container,
  ErrorContainer,
  IconContainer,
  InfoIcon,
  Input,
  InputContainer,
  Label,
} from './index.linaria'
import { Tooltip } from '../../Tooltip'

export const TextInput = ({
  label,
  leftIcon,
  showClearIcon,
  invalid,
  invalidText,
  disabled,
  openDropdownFunc,
  clearValueFunc,
  isClearOnFocus,
  tooltip,
  ref = React.createRef(),
  ...otherProps
}: TextInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const clearIconHandler = useCallback(
    (e: MouseEvent) => {
      e.stopPropagation()
      if (clearValueFunc) {
        clearValueFunc(e)
      }
    },
    [clearValueFunc],
  )

  return (
    <Container>
      {label && <Label>{label}</Label>}
      <InputContainer
        ref={ref}
        className={classNames({ disabled, invalid })}
      >
        {leftIcon && <IconContainer>{leftIcon}</IconContainer>}
        <Input
          onFocus={(e: MouseEvent) => {
            if (isClearOnFocus) clearIconHandler(e)
          }}
          onClick={openDropdownFunc}
          ref={inputRef}
          {...otherProps}
        />
        {tooltip && (
          <Tooltip tooltipContent={tooltip}>
            <IconContainer>
              <InfoIcon />
            </IconContainer>
          </Tooltip>
        )}
        {showClearIcon && (
          <IconContainer onClick={clearIconHandler}>
            <ClearIcon />
          </IconContainer>
        )}
      </InputContainer>
      {invalidText && <ErrorContainer>{invalidText}</ErrorContainer>}
    </Container>
  )
}
