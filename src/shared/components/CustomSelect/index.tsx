import { useCallback, useEffect, useRef, useState } from 'react'

import classNames from 'classnames'
import { createPortal } from 'react-dom'

import { DropdownComponent } from './DropdownComponent'
import { Head } from './Head'
import { Container, ChevronDown } from './index.linaria'
import { CustomSelectProps, IOption } from './types'
import { FormIconCSS } from '@/shared/assets/styles/form'

export const CustomSelect = <IValue extends IOption>({
  optionsList,
  listIsLoading,
  values,
  setValues,
  emptyList = { title: 'Ничего на выбор.', description: 'Сюда ещё ничего не добавили.' },
  ...selectProps
}: CustomSelectProps<IValue>) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLDivElement>(null)

  const toggleDropdown = (open: boolean) => setIsOpen(open)
  const handlerDocument = useCallback((event: MouseEvent) => {
    if (!(event.target instanceof HTMLElement)) return

    if (
      !event.target.closest(`.${dropdownRef.current?.className}`) &&
      !event.target.closest(`.${containerRef.current?.className}`)
    ) {
      toggleDropdown(false)
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
      <Head
        toogleFunc={() => toggleDropdown(!isOpen)}
        rightIcon={<ChevronDown className={classNames({ isOpen }, [FormIconCSS])} />}
        ref={inputRef}
        isOpen={isOpen}
        values={values}
        {...selectProps}
      />
      {isOpen &&
        createPortal(
          <DropdownComponent
            closeFunc={() => toggleDropdown(false)}
            inputRef={inputRef}
            ref={dropdownRef}
            values={values}
            listIsLoading={listIsLoading}
            setValues={setValues}
            emptyList={emptyList}
            optionsList={optionsList}
          />,
          document.body,
        )}
    </Container>
  )
}
