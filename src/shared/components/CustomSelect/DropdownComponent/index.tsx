import { useLayoutEffect } from 'react'

import { autoUpdate, flip, offset, size, useFloating } from '@floating-ui/react'
import Skeleton from 'react-loading-skeleton'

import {
  AlertDescription,
  AlertTitle,
  CheckIcon,
  DropdownAlertBlock,
  DropdownContainer,
  ItemContent,
  OptionItem,
  OptionsList,
  SkeletonItem,
  UpsetIconSVG,
} from './index.linaria'
import { IDropdownProps, IOption } from '../types'

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
            maxHeight: `300px`,
            minHeight: `150px`,
            overflowY: 'auto',
          })
        },
      }),
    ],
  })

  // привязываем reference до пейнта, чтобы не было мерцания
  useLayoutEffect(() => {
    if (inputRef?.current) {
      refs.setReference(inputRef.current as unknown as HTMLElement)
      update?.()
    }
  }, [inputRef, refs, update])

  const handleClick = (el: IValue) => {
    setValues(el)
    closeFunc()
  }

  return (
    <DropdownContainer
      ref={refs.setFloating}
      style={floatingStyles}
      data-floating="true"
    >
      {(!optionsList || optionsList.length <= 0) && !listIsLoading && !isError && (
        <DropdownAlertBlock>
          <UpsetIconSVG />
          <AlertTitle>{emptyList?.title}</AlertTitle>
          <AlertDescription>{emptyList?.description}</AlertDescription>
        </DropdownAlertBlock>
      )}

      {listIsLoading && (
        <OptionsList>
          {Array.from({ length: 5 }).map((_, i) => (
            <SkeletonItem key={i}>
              <Skeleton height={20} />
            </SkeletonItem>
          ))}
        </OptionsList>
      )}

      {isError && (
        <DropdownAlertBlock>
          <UpsetIconSVG />
          <AlertTitle>{error?.title ?? 'Ошибка загрузки'}</AlertTitle>
          <AlertDescription>{error?.description ?? 'Попробуйте ещё раз'}</AlertDescription>
        </DropdownAlertBlock>
      )}

      {!listIsLoading && !isError && optionsList && optionsList.length > 0 && (
        <OptionsList
          role="listbox"
          aria-label="Select options"
        >
          {optionsList.map((el) => (
            <OptionItem
              key={el.id}
              role="option"
              onMouseDown={(e: { preventDefault: () => unknown }) => e.preventDefault()}
              onClick={() => handleClick(el)}
            >
              <ItemContent>{el.content}</ItemContent>
              <CheckIcon className={values.some((v) => v.id === el.id) ? 'show' : ''} />
            </OptionItem>
          ))}
        </OptionsList>
      )}
    </DropdownContainer>
  )
}
