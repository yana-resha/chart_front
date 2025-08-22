import { InputHTMLAttributes, ReactNode, useCallback, useId, useRef, useState } from 'react'

import InputMask from '@mona-health/react-input-mask'
import classNames from 'classnames'

import { defaultIconConstainerCSS, IconContainer } from './index.linaria'
import CalendarDay from '@/shared/assets/icons/calendar-day.svg?react'
import Clock from '@/shared/assets/icons/clock.svg?react'
import ClosedEye from '@/shared/assets/icons/eye-cross.svg?react'
import OpenedEye from '@/shared/assets/icons/eye.svg?react'
import {
  FormElementContainer,
  FormElementLabel,
  FormElementError,
  FormInputContainer,
  FormInputCSS,
  FormIconCSS,
} from '@/shared/assets/styles/form'

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
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false)
  const id = useId()

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
    <FormElementContainer>
      {label && (
        <FormElementLabel
          htmlFor={id}
          id={`${id}-label`}
        >
          {label}
        </FormElementLabel>
      )}
      <FormInputContainer
        onClick={setInputFocus}
        ref={ref}
        className={classNames({ invalid, disabled })}
      >
        {leftIcon && <IconContainer onClick={leftIconHandler}>{leftIcon}</IconContainer>}
        <InputMask
          disabled={disabled}
          ref={inputRef}
          id={id}
          className={FormInputCSS}
          type={isShowPassword ? 'text' : type}
          mask={mask}
          {...otherProps}
        />
        {rightIcon && <IconContainer onClick={rightIconHandler}>{rightIcon}</IconContainer>}
        {!rightIcon && type === 'password' && (
          <IconContainer
            className={defaultIconConstainerCSS}
            onClick={showPasswordHandler}
          >
            {isShowPassword ? <OpenedEye className={FormIconCSS} /> : <ClosedEye className={FormIconCSS} />}
          </IconContainer>
        )}
        {!rightIcon && (type === 'date' || type === 'time') && (
          <IconContainer
            className={defaultIconConstainerCSS}
            onClick={() => inputRef.current?.showPicker()}
          >
            {type === 'date' ? <CalendarDay className={FormIconCSS} /> : <Clock className={FormIconCSS} />}
          </IconContainer>
        )}
      </FormInputContainer>
      {invalidText && <FormElementError>{invalidText}</FormElementError>}
    </FormElementContainer>
  )
}

export default Input
