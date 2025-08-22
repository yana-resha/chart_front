import { useEffect } from 'react'

import { autoUpdate, flip, offset, size, useFloating } from '@floating-ui/react'
import Skeleton from 'react-loading-skeleton'

import { IDropdownItem, IDropdownProps } from '../types'
import { DropdownContainer, DropdownItemElement } from './index.linaria'
import MagicIcon from '@/shared/assets/icons/magic-wand.svg?react'
import {
  AlertDescription,
  AlertTitle,
  Dropdown,
  DropdownAlertBlock,
  DropdownItemContent,
  DropdownItemIconContainer,
  DropdownList,
  SkeletonItem,
  UpsetIconSVG,
} from '@/shared/assets/styles/form'

export const DropdownComponent = <IValue extends IDropdownItem>({
  emptyList,
  dropdownList,
  listIsLoading,
  isError,
  error,
  onClickItem,
  closeDropdown,
  dropdownRef,
  inputRef,
}: IDropdownProps<IValue>) => {
  // Привязываем выпадашку к входному ref через Floating UI
  const { refs, floatingStyles, update } = useFloating({
    placement: 'bottom-start',
    strategy: 'fixed',
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(0),
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

  // Связываем reference с внешним inputRef
  useEffect(() => {
    if (inputRef?.current) {
      refs.setReference(inputRef.current as unknown as HTMLElement)
      update?.()
    }
  }, [inputRef, refs, update])

  return (
    <DropdownContainer
      ref={refs.setFloating}
      style={floatingStyles}
      data-floating="true"
      ref2={dropdownRef as unknown}
    >
      <Dropdown ref={dropdownRef}>
        {(!dropdownList || dropdownList.length <= 0) && !listIsLoading && !isError && (
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

        {!listIsLoading && !isError && dropdownList && dropdownList.length > 0 && (
          <DropdownList
            role="listbox"
            aria-label="Search results"
          >
            {dropdownList.map((el) => (
              <DropdownItemElement
                key={el.id}
                role="option"
                onMouseDown={(e: { preventDefault: () => unknown }) => e.preventDefault()}
                onClick={(e: MouseEvent) => {
                  onClickItem(e, el)
                  closeDropdown()
                }}
              >
                <DropdownItemContent>{el.content}</DropdownItemContent>
                <DropdownItemIconContainer>{el.rightIcon ?? <MagicIcon />}</DropdownItemIconContainer>
              </DropdownItemElement>
            ))}
          </DropdownList>
        )}
      </Dropdown>
    </DropdownContainer>
  )
}
