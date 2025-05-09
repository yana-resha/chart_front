import { InputHTMLAttributes, ReactNode, useCallback, useRef, useState } from 'react'

import InputMask from '@mona-health/react-input-mask'
import classNames from 'classnames'

import {
  Container,
  defaultIconConstainerCSS,
  ErrorContainer,
  IconContainer,
  InputContainer,
  inputCSS,
  Label,
  passwordIconCSS,
} from './index.linaria'
import CalendarDay from '@/shared/assets/icons/calendar-day.svg?react'
import Clock from '@/shared/assets/icons/clock.svg?react'
import ClosedEye from '@/shared/assets/icons/eye-cross.svg?react'
import OpenedEye from '@/shared/assets/icons/eye.svg?react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: ReactNode | string
  leftIcon?: ReactNode
  handlerLeftIconClick?: (e: MouseEvent) => void
  handlerRightIconClick?: (e: MouseEvent) => void
  rightIcon?: ReactNode
  disabled?: boolean
  invalid?: boolean
  invalidText?: string | ReactNode
  mask?: string
  maskPlaceholder?: string
  beforeMaskedStateChange?: () => void
}

const Input = ({
  label,
  leftIcon,
  rightIcon,
  disabled,
  invalid,
  invalidText,
  handlerLeftIconClick,
  handlerRightIconClick,
  mask = '',
  type,
  ...otherProps
}: InputProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [isActive, setIsActive] = useState<boolean>(false)
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false)

  const setInputFocus = () => inputRef.current?.focus()
  const leftIconHandler = useCallback(
    (e: MouseEvent) => {
      e.stopPropagation()
      if (handlerLeftIconClick) {
        handlerLeftIconClick(e)
      }
    },
    [handlerLeftIconClick],
  )
  const rightIconHandler = useCallback(
    (e: MouseEvent) => {
      e.stopPropagation()
      if (handlerRightIconClick) {
        handlerRightIconClick(e)
      }
    },
    [handlerRightIconClick],
  )
  const showPasswordHandler = useCallback(
    (e: MouseEvent) => {
      e.stopPropagation()
      setIsShowPassword(!isShowPassword)
    },
    [isShowPassword],
  )

  return (
    <Container>
      {label && <Label>{label}</Label>}
      <InputContainer
        onClick={setInputFocus}
        ref={ref}
        className={classNames({ disabled, isActive, invalid })}
      >
        {leftIcon && <IconContainer onClick={leftIconHandler}>{leftIcon}</IconContainer>}
        <InputMask
          ref={inputRef}
          className={inputCSS}
          type={isShowPassword ? 'text' : type}
          onFocus={() => setIsActive(true)}
          onBlur={() => setIsActive(false)}
          mask={mask}
          {...otherProps}
        />
        {rightIcon && <IconContainer onClick={rightIconHandler}>{rightIcon}</IconContainer>}
        {!rightIcon && type === 'password' && (
          <IconContainer
            className={defaultIconConstainerCSS}
            onClick={showPasswordHandler}
          >
            {isShowPassword ? <OpenedEye /> : <ClosedEye />}
          </IconContainer>
        )}
        {!rightIcon && (type === 'date' || type === 'time') && (
          <IconContainer
            className={defaultIconConstainerCSS}
            onClick={() => inputRef.current?.showPicker()}
          >
            {type === 'date' ? <CalendarDay /> : <Clock />}
          </IconContainer>
        )}
      </InputContainer>
      {invalidText && <ErrorContainer>{invalidText}</ErrorContainer>}
    </Container>
  )
}

export default Input
