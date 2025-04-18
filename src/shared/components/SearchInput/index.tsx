import { useCallback, useEffect, useRef, useState } from 'react'

import { createPortal } from 'react-dom'

import { DropdownComponent } from './DropdownComponent'
import { Container } from './index.linaria'
import { TextInput } from './TextInput'
import { IDropdownItem, SearchInputProps } from './types'

export const SearchInput = <IValue extends IDropdownItem>({
  dropdownList,
  onClickItem,
  listIsLoading,
  error,
  isError,
  emptyList = { title: 'Ничего не найдено', description: 'Попробуйте изменить поисковой запрос' },
  ...inputProps
}: SearchInputProps<IValue>) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const containerRef = useRef<HTMLDivElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLDivElement>(null)

  const handlerDocument = useCallback((event: MouseEvent) => {
    if (!(event.target instanceof HTMLElement)) return

    if (
      !event.target.closest(`.${dropdownRef.current?.className}`) &&
      !event.target.closest(`.${containerRef.current?.className}`)
    ) {
      setIsOpen(false)
    }
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('click', handlerDocument)
    }

    return () => document.removeEventListener('click', handlerDocument)
  }, [handlerDocument, isOpen])

  return (
    <Container ref={containerRef}>
      <TextInput
        ref={inputRef}
        {...inputProps}
        openDropdownFunc={() => setIsOpen(true)}
      />
      {isOpen &&
        createPortal(
          <DropdownComponent
            error={error}
            isError={isError}
            dropdownRef={dropdownRef}
            inputRef={inputRef}
            onClickItem={onClickItem}
            closeDropdown={() => setIsOpen(false)}
            listIsLoading={listIsLoading}
            emptyList={emptyList}
            dropdownList={dropdownList}
          />,
          document.body,
        )}
    </Container>
  )
}
