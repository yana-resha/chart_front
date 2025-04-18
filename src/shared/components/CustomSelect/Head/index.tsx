import { useRef } from 'react'
import React from 'react'

import classNames from 'classnames'

import { HeadProps, IOption } from '../types'
import { Container, ErrorContainer, IconContainer, Label, Values, ValuesContainer } from './index.linaria'

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
    <Container>
      {label && <Label>{label}</Label>}
      <ValuesContainer
        onClick={toogleFunc}
        ref={ref}
        className={classNames({ disabled, invalid, focus: isOpen })}
      >
        {leftIcon && <IconContainer>{leftIcon}</IconContainer>}
        <Values
          ref={inputRef}
          {...otherProps}
        >
          {values[0]?.content ?? <div className="placeholder">{placeholder}</div>}
        </Values>
        {rightIcon && <IconContainer>{rightIcon}</IconContainer>}
      </ValuesContainer>
      {invalidText && <ErrorContainer>{invalidText}</ErrorContainer>}
    </Container>
  )
}
