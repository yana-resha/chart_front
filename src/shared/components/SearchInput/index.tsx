import React, { useCallback, useEffect, useRef } from 'react'

import { createPortal } from 'react-dom'

import { DropdownComponent } from './DropdownComponent'
import { Container } from './index.linaria'
import { TextInput } from './TextInput'
import { IDropdownItem, SearchInputProps } from './types'

export const SearchInput = <IValue extends IDropdownItem>({
  // dropdown (всё рисуем как дали)
  dropdownList = [],
  onClickItem,
  listIsLoading,
  isError,
  error,
  emptyList,

  // input (просто прокидываем наружу)
  value,
  onChange,
  onFocus,
  isClearOnFocus,
  leftIcon,
  label,
  placeholder,
  clearValueFunc,
  showClearIcon,
  disabled,
  invalid,
  invalidText,
  tooltip,
  mobileTooltipTitle,
  name,

  // контролируемое открытие
  open,
  onOpenChange,
}: SearchInputProps<IValue>) => {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const dropdownRef = useRef<HTMLDivElement | null>(null)

  // Закрытие по клику вне / Escape
  useEffect(() => {
    const onDocMouseDown = (e: MouseEvent) => {
      if (!open) return
      const t = e.target as Node
      if (inputRef.current?.contains(t)) return
      if (dropdownRef.current?.contains(t)) return
      onOpenChange(false)
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (!open) {
        if (e.key === 'ArrowDown') onOpenChange(true) // запрос на открытие стрелкой вниз

        return
      }
      if (e.key === 'Escape') {
        onOpenChange(false)
        inputRef.current?.focus()
      }
    }
    document.addEventListener('mousedown', onDocMouseDown)
    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.removeEventListener('mousedown', onDocMouseDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open, onOpenChange])

  // onFocus/onChange ничего не открывают сами — полностью контролируется родителем
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      onChange?.(e)
    },
    [onChange],
  )

  return (
    <Container>
      <TextInput
        ref={inputRef}
        name={name}
        value={value}
        onChange={handleChange}
        onFocus={onFocus}
        isClearOnFocus={isClearOnFocus}
        leftIcon={leftIcon}
        label={label}
        placeholder={placeholder}
        clearValueFunc={clearValueFunc}
        showClearIcon={showClearIcon}
        disabled={disabled}
        invalid={invalid}
        invalidText={invalidText}
        tooltip={tooltip}
        mobileTooltipTitle={mobileTooltipTitle}
      />

      {open &&
        createPortal(
          <DropdownComponent<IValue>
            isError={isError}
            error={error}
            dropdownRef={dropdownRef}
            inputRef={inputRef}
            onClickItem={(e, item) => {
              onClickItem?.(e, item)
              onOpenChange(false)
            }}
            closeDropdown={() => onOpenChange(false)}
            listIsLoading={listIsLoading}
            emptyList={emptyList}
            dropdownList={dropdownList}
          />,
          document.body,
        )}
    </Container>
  )
}
