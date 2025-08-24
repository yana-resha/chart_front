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

export const Head = React.forwardRef<HTMLDivElement, HeadProps<IOption>>(function Head(
  {
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
    ...otherProps // сюда прилетят onKeyDown, aria-controls, aria-activedescendant, aria-labelledby и т.п.
  },
  ref,
) {
  // ставим фокус на контейнер ДО клика (чтобы Space/PageUp/Down/стрелки не скроллили страницу)
  const focusSelf: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (disabled) return
    ;(e.currentTarget as HTMLDivElement).focus()
  }

  return (
    <FormElementContainer>
      {label && <FormElementLabel>{label}</FormElementLabel>}

      <ValuesContainer
        ref={ref}
        className={classNames({ disabled, invalid, isActive: isOpen })}
        tabIndex={disabled ? -1 : 0} // ← делаем div фокусируемым
        role="combobox"
        aria-autocomplete="list"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-invalid={invalid || undefined}
        // пробрасываем всё остальное: onKeyDown, aria-controls, aria-activedescendant, aria-labelledby…
        {...otherProps}
        onMouseDownCapture={focusSelf} // ← фокус до клика
        onClick={toogleFunc} // ← открытие/закрытие
      >
        {leftIcon && (
          <IconContainer
            onMouseDown={(e: { preventDefault: () => void }) => e.preventDefault()} // чтобы иконка не перехватила фокус
          >
            {leftIcon}
          </IconContainer>
        )}

        <Values className={FormInputCSS}>
          {values[0]?.content ?? <div className="placeholder">{placeholder}</div>}
        </Values>

        {rightIcon && (
          <IconContainer
            onMouseDown={(e: { preventDefault: () => void }) => e.preventDefault()} // и тут тоже
          >
            {rightIcon}
          </IconContainer>
        )}
      </ValuesContainer>

      {invalidText && <FormElementError>{invalidText}</FormElementError>}
    </FormElementContainer>
  )
})
