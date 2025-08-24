import { KeyboardEventHandler, useCallback, useEffect, useId, useRef, useState } from 'react'

import classNames from 'classnames'
import { createPortal } from 'react-dom'

import { DropdownComponent } from './DropdownComponent'
import { Head } from './Head'
import { Container, ChevronDown } from './index.linaria'
import { CustomSelectProps, IOption } from './types'
import { FormIconCSS } from '@/shared/assets/styles/form'

export const CustomSelect = <IValue extends IOption>({
  optionsList = [],
  listIsLoading,
  values,
  setValues,
  emptyList = { title: 'Ничего на выбор.', description: 'Сюда ещё ничего не добавили.' },
  ...selectProps
}: CustomSelectProps<IValue>) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [activeIndex, setActiveIndex] = useState<number>(-1)

  const dropdownRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLDivElement>(null)

  const listboxId = useId()
  const getOptionId = (i: number) => `${listboxId}-opt-${i}`

  const toggleDropdown = (open: boolean) => setIsOpen(open)

  // Закрытие по клику вне конкретного селекта
  const onGlobalPointerDown = useCallback((event: PointerEvent) => {
    const target = event.target as Node | null
    if (!target) return
    const insideHead = !!containerRef.current?.contains(target)
    const insideDrop = !!dropdownRef.current?.contains(target)
    if (!insideHead && !insideDrop) {
      setIsOpen(false)
    }
  }, [])

  // Esc
  const onGlobalKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') setIsOpen(false)
  }, [])

  useEffect(() => {
    if (!isOpen) return
    window.addEventListener('pointerdown', onGlobalPointerDown, true)
    window.addEventListener('keydown', onGlobalKeyDown)

    return () => {
      window.removeEventListener('pointerdown', onGlobalPointerDown, true)
      window.removeEventListener('keydown', onGlobalKeyDown)
    }
  }, [isOpen, onGlobalPointerDown, onGlobalKeyDown])

  // Helpers
  const openAt = (i: number) => {
    const idx = optionsList.length ? Math.max(0, Math.min(i, optionsList.length - 1)) : -1
    setActiveIndex(idx)
    setIsOpen(true)
  }
  const moveActive = (delta: number) => {
    if (!optionsList.length) return
    setActiveIndex((i) => {
      const base = i < 0 ? 0 : i

      return (base + delta + optionsList.length) % optionsList.length
    })
  }
  const commitActive = () => {
    if (activeIndex < 0 || !optionsList[activeIndex]) return
    setValues(optionsList[activeIndex] as IValue)
    setIsOpen(false)
  }

  // Typeahead
  const typeBuf = useRef('')
  const typeTimer = useRef<number | null>(null)
  const clearTypeBuf = () => {
    typeBuf.current = ''
    if (typeTimer.current) {
      window.clearTimeout(typeTimer.current)
      typeTimer.current = null
    }
  }
  const onType = (ch: string) => {
    typeBuf.current += ch.toLowerCase()
    if (typeTimer.current) window.clearTimeout(typeTimer.current)
    typeTimer.current = window.setTimeout(clearTypeBuf, 500)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const labelOf = (o: any) =>
      (typeof o.content === 'string' ? o.content : (o.label ?? o.title ?? o.value ?? '')).toString()
    const start = activeIndex >= 0 ? activeIndex + 1 : 0
    const all = optionsList.map(labelOf)
    let idx = -1
    for (let i = start; i < all.length; i++) {
      if (all[i].toLowerCase().startsWith(typeBuf.current)) {
        idx = i
        break
      }
    }
    if (idx === -1) {
      for (let i = 0; i < start; i++) {
        if (all[i].toLowerCase().startsWith(typeBuf.current)) {
          idx = i
          break
        }
      }
    }
    if (idx >= 0) {
      if (!isOpen) setIsOpen(true)
      setActiveIndex(idx)
    }
  }

  // Клавиатура на «голове»
  const onHeadKeyDown: KeyboardEventHandler<HTMLButtonElement> = (e) => {
    const { key } = e
    if (key.length === 1 && /[\p{L}\p{N}\-_.]/u.test(key)) {
      e.preventDefault()
      onType(key)

      return
    }

    switch (key) {
      case 'ArrowDown': {
        e.preventDefault()
        if (!isOpen) {
          const current = optionsList.findIndex((o) => values?.[0]?.id === o.id)
          openAt(current >= 0 ? current : 0)
        } else {
          moveActive(+1)
        }
        break
      }
      case 'ArrowUp': {
        e.preventDefault()
        if (!isOpen) {
          const current = optionsList.findIndex((o) => values?.[0]?.id === o.id)
          openAt(current >= 0 ? current : optionsList.length - 1)
        } else {
          moveActive(-1)
        }
        break
      }
      case 'Home': {
        if (isOpen) {
          e.preventDefault()
          openAt(0)
        }
        break
      }
      case 'End': {
        if (isOpen) {
          e.preventDefault()
          openAt(optionsList.length - 1)
        }
        break
      }
      case 'PageDown': {
        if (isOpen) {
          e.preventDefault()
          moveActive(+5)
        }
        break
      }
      case 'PageUp': {
        if (isOpen) {
          e.preventDefault()
          moveActive(-5)
        }
        break
      }
      case ' ': // Space
      case 'Enter': {
        e.preventDefault()
        if (!isOpen) {
          const current = optionsList.findIndex((o) => values?.[0]?.id === o.id)
          openAt(current >= 0 ? current : 0)
        } else {
          commitActive()
          buttonRef.current?.focus()
        }
        break
      }
      case 'Escape': {
        if (isOpen) {
          e.preventDefault()
          setIsOpen(false)
        }
        break
      }
      case 'Tab': {
        if (isOpen) {
          // зафиксировать активный и уйти
          commitActive()
        }
        break
      }
    }
  }

  const onHeadClick = () => {
    if (isOpen) {
      toggleDropdown(false)
    } else {
      const current = optionsList.findIndex((o) => values?.[0]?.id === o.id)
      openAt(current >= 0 ? current : 0)
    }
  }

  const activeDescId = isOpen && activeIndex >= 0 ? getOptionId(activeIndex) : undefined

  return (
    <Container ref={containerRef}>
      <Head
        toogleFunc={onHeadClick}
        rightIcon={<ChevronDown className={classNames({ isOpen }, [FormIconCSS])} />}
        ref={buttonRef}
        isOpen={isOpen}
        values={values}
        onKeyDown={onHeadKeyDown}
        role="combobox"
        aria-controls={listboxId}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-activedescendant={activeDescId}
        {...selectProps}
      />
      {isOpen &&
        createPortal(
          <DropdownComponent
            closeFunc={() => toggleDropdown(false)}
            inputRef={buttonRef}
            ref={dropdownRef}
            values={values}
            listIsLoading={listIsLoading}
            setValues={setValues}
            emptyList={emptyList}
            optionsList={optionsList}
            id={listboxId}
            getOptionId={getOptionId}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
          />,
          document.body,
        )}
    </Container>
  )
}
