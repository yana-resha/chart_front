import React, { useLayoutEffect } from 'react'

import { autoUpdate, flip, offset, size, useFloating } from '@floating-ui/react'
import Skeleton from 'react-loading-skeleton'

import { CheckIcon, OptionItem } from './index.linaria'
import { IDropdownProps, IOption } from '../types'
import {
  DropdownAlertBlock,
  UpsetIconSVG,
  AlertTitle,
  AlertDescription,
  SkeletonItem,
  DropdownList,
  DropdownItemContent,
  DropdownItemIconContainer,
  Dropdown,
} from '@/shared/assets/styles/form'
import { composeRefs } from '@/shared/helpers/composeRefs'

export const DropdownComponent = <IValue extends IOption>({
  emptyList,
  optionsList,
  listIsLoading,
  isError,
  error,
  setValues,
  closeFunc,
  inputRef,
  values,
  id,
  ref,
  getOptionId,
  activeIndex,
  setActiveIndex,
}: IDropdownProps<IValue>) => {
  const { refs, floatingStyles, update } = useFloating({
    placement: 'bottom-start',
    strategy: 'fixed',
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(10),
      flip({ fallbackPlacements: ['top-start', 'bottom-end', 'top-end'], crossAxis: false }),
      size({
        apply({ rects, elements }) {
          Object.assign(elements.floating.style, {
            width: `${rects.reference.width}px`,
            height: '250px',
            overflowY: 'auto',
          })
        },
      }),
    ],
  })

  // Привязываем reference до пейнта, чтобы не было мерцания позиции
  useLayoutEffect(() => {
    if (inputRef?.current) {
      refs.setReference(inputRef.current as unknown as HTMLElement)
      update?.()
    }
  }, [inputRef, refs, update])

  // Автопрокрутка к активной опции
  useLayoutEffect(() => {
    if (activeIndex == null || activeIndex < 0) return
    const container = refs.floating.current as HTMLElement | null
    if (!container) return

    const optId = getOptionId?.(activeIndex)
    const optionEl =
      (optId ? document.getElementById(optId) : null) ||
      (container.querySelectorAll<HTMLElement>('[role="option"]')[activeIndex] ?? null)

    if (!optionEl) return

    const raf = requestAnimationFrame(() => {
      const PADDING = 6
      const cRect = container.getBoundingClientRect()
      const oRect = optionEl.getBoundingClientRect()

      const oTop = oRect.top - cRect.top + container.scrollTop
      const oBottom = oTop + optionEl.offsetHeight

      const cTop = container.scrollTop
      const cBottom = cTop + container.clientHeight

      if (oTop - PADDING < cTop) {
        container.scrollTop = oTop - PADDING
      } else if (oBottom + PADDING > cBottom) {
        container.scrollTop = oBottom - container.clientHeight + PADDING
      }
    })

    return () => cancelAnimationFrame(raf)
  }, [activeIndex, refs.floating, getOptionId])

  // 🛠 КЛИК МЫШКОЙ: сохраняем выбор, закрываем, возвращаем фокус. Без onCommitActive — чтобы не было гонки состояний.
  const handleClick = (el: IValue, idx: number) => {
    setActiveIndex?.(idx)
    setValues(el) // если values у тебя массив [el], то здесь поставь: setValues([el] as any)
    closeFunc()
    ;(inputRef?.current as unknown as HTMLElement | null)?.focus?.()
  }

  return (
    <Dropdown
      /* ВАЖНО: склеиваем ref из Floating UI и внешний контейнерный ref */
      ref={composeRefs<HTMLDivElement>(refs.setFloating, ref)}
      style={floatingStyles}
      role="presentation"
    >
      {!listIsLoading && !isError && (!optionsList || optionsList.length === 0) && (
        <DropdownAlertBlock>
          <UpsetIconSVG />
          <AlertTitle>{emptyList?.title}</AlertTitle>
          <AlertDescription>{emptyList?.description}</AlertDescription>
        </DropdownAlertBlock>
      )}

      {listIsLoading && (
        <DropdownList>
          {Array.from({ length: 5 }).map((_, i) => (
            <SkeletonItem key={i}>
              <Skeleton height={20} />
            </SkeletonItem>
          ))}
        </DropdownList>
      )}

      {isError && (
        <DropdownAlertBlock>
          <UpsetIconSVG />
          <AlertTitle>{error?.title ?? 'Ошибка загрузки'}</AlertTitle>
          <AlertDescription>{error?.description ?? 'Попробуйте ещё раз'}</AlertDescription>
        </DropdownAlertBlock>
      )}

      {!listIsLoading && !isError && optionsList && optionsList.length > 0 && (
        <DropdownList
          role="listbox"
          id={id}
        >
          {optionsList.map((el, idx) => (
            <OptionItem
              id={getOptionId ? getOptionId(idx) : undefined}
              key={el.id ?? idx}
              role="option"
              aria-selected={values.some((v) => v.id === el.id) || undefined}
              className={activeIndex === idx ? 'active' : undefined}
              onMouseEnter={() => setActiveIndex?.(idx)}
              onMouseDown={(e: { preventDefault: () => void }) => e.preventDefault()} // не уводим фокус с combobox
              onClick={() => handleClick(el, idx)}
            >
              <DropdownItemContent>{el.content}</DropdownItemContent>
              <DropdownItemIconContainer>
                <CheckIcon className={values.some((v) => v.id === el.id) ? 'show' : ''} />
              </DropdownItemIconContainer>
            </OptionItem>
          ))}
        </DropdownList>
      )}
    </Dropdown>
  )
}
