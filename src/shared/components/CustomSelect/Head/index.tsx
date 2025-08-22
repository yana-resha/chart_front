import { useRef } from 'react'
import React from 'react'

import classNames from 'classnames'

import { HeadProps, IOption } from '../types'
import { IconContainer, Values, ValuesContainer } from './index.linaria'
import {
  FormElementContainer,
  FormElementError,
  FormElementLabel,
  FormInputCSS,
} from '@/shared/assets/styles/form'

export const Head = <IValue extends IOption>({
  label,
  leftIcon,
  rightIcon,
  invalid,
  invalidText,
  placeholder,
  disabled,
  isOpen,
  toogleFunc,
  values,
  ref = React.createRef(),
  ...otherProps
}: HeadProps<IValue>) => {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <FormElementContainer>
      {label && <FormElementLabel>{label}</FormElementLabel>}
      <ValuesContainer
        tabIndex={0}
        onClick={toogleFunc}
        ref={ref}
        className={classNames({ disabled, invalid, isActive: isOpen })}
      >
        {leftIcon && <IconContainer>{leftIcon}</IconContainer>}
        <Values
          className={FormInputCSS}
          ref={inputRef}
          {...otherProps}
        >
          {values[0]?.content ?? <div className="placeholder">{placeholder}</div>}
        </Values>
        {rightIcon && <IconContainer>{rightIcon}</IconContainer>}
      </ValuesContainer>
      {invalidText && <FormElementError>{invalidText}</FormElementError>}
    </FormElementContainer>
  )
}
