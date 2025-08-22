import { useCallback, useId, useRef } from 'react'
import React from 'react'

import classNames from 'classnames'

import { TextInputProps } from '../types'
import { ClearIcon, IconContainer, InfoIcon, Input, InputContainer } from './index.linaria'
import { Tooltip } from '../../Tooltip'
import {
  FormElementContainer,
  FormElementError,
  FormElementLabel,
  FormIconCSS,
  FormInputCSS,
} from '@/shared/assets/styles/form'

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
  className,
  ...otherProps
}: TextInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const id = useId()
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
    <FormElementContainer>
      {label && (
        <FormElementLabel
          htmlFor={id}
          id={`${id}-label`}
        >
          {label}
        </FormElementLabel>
      )}
      <InputContainer
        ref={ref}
        className={classNames({ disabled, invalid })}
      >
        {leftIcon && <IconContainer>{leftIcon}</IconContainer>}
        <Input
          id={id}
          onFocus={(e: MouseEvent) => {
            if (isClearOnFocus) clearIconHandler(e)
          }}
          onClick={openDropdownFunc}
          ref={inputRef}
          className={classNames([FormInputCSS, className])}
          {...otherProps}
        />
        {tooltip && (
          <Tooltip tooltipContent={tooltip}>
            <IconContainer>
              <InfoIcon className={FormIconCSS} />
            </IconContainer>
          </Tooltip>
        )}
        {showClearIcon && (
          <IconContainer onClick={clearIconHandler}>
            <ClearIcon />
          </IconContainer>
        )}
      </InputContainer>
      {invalidText && <FormElementError>{invalidText}</FormElementError>}
    </FormElementContainer>
  )
}
