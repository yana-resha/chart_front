import { useCallback, useLayoutEffect, useState } from 'react'

import Skeleton from 'react-loading-skeleton'

import { DROPDOWN_VERTICAL_POSITION, IDropdownItem, IDropdownProps } from '../types'
import {
  AlertDescription,
  AlertTitle,
  Dropdown,
  DropdownAlertBlock,
  DropdownContainer,
  DropdownItem,
  DropdownList,
  ItemContent,
  ItemIconContainer,
  SkeletonItem,
  UpsetIconSVG,
} from './index.linaria'
import MagicIcon from '@/shared/assets/icons/magic-wand.svg?react'

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
  const [verticalPosition, setVerticalPosition] = useState<DROPDOWN_VERTICAL_POSITION>(
    DROPDOWN_VERTICAL_POSITION.BOTTOM,
  )

  const getVerticalPosition = useCallback(() => {
    const intersectionRect = dropdownRef.current?.getBoundingClientRect()
    if (!intersectionRect) return DROPDOWN_VERTICAL_POSITION.BOTTOM

    if (intersectionRect.top + window.pageYOffset < window.scrollY) return DROPDOWN_VERTICAL_POSITION.BOTTOM
    if (intersectionRect.bottom > window.innerHeight) return DROPDOWN_VERTICAL_POSITION.TOP

    return DROPDOWN_VERTICAL_POSITION.BOTTOM
  }, [dropdownRef])

  useLayoutEffect(() => {
    setVerticalPosition(getVerticalPosition())
  }, [getVerticalPosition])

  return (
    <DropdownContainer
      vertical={verticalPosition}
      width={inputRef.current?.getBoundingClientRect().width}
      inputHeight={inputRef.current?.getBoundingClientRect().height}
      left={inputRef.current?.getBoundingClientRect().left}
      parentTop={inputRef.current?.getBoundingClientRect().y}
      parentBottom={inputRef.current?.getBoundingClientRect().bottom}
      currentHeight={dropdownRef.current?.getBoundingClientRect().height}
      ref={dropdownRef}
    >
      <Dropdown>
        {(!dropdownList || dropdownList.length <= 0) && !listIsLoading && !isError && (
          <DropdownAlertBlock>
            <UpsetIconSVG />
            <AlertTitle>{emptyList?.title}</AlertTitle>
            <AlertDescription>{emptyList?.description}</AlertDescription>
          </DropdownAlertBlock>
        )}
        {!listIsLoading && isError && (
          <DropdownAlertBlock>
            <UpsetIconSVG />
            <AlertTitle>{error?.title}</AlertTitle>
            <AlertDescription>{error?.description}</AlertDescription>
          </DropdownAlertBlock>
        )}
        {listIsLoading && (
          <DropdownList>
            <Skeleton
              baseColor="transparent"
              highlightColor="rgba(255, 255, 255, 0.1)"
              wrapper={SkeletonItem}
              count={10}
            />
          </DropdownList>
        )}
        {dropdownList && !listIsLoading && !isError && (
          <DropdownList>
            {(dropdownList ?? []).map((el) => (
              <DropdownItem
                key={el.id}
                onClick={(e: MouseEvent) => {
                  onClickItem(e, el)
                  closeDropdown()
                }}
              >
                <ItemContent>{el.content}</ItemContent>
                <ItemIconContainer>{el.rightIcon ?? <MagicIcon />}</ItemIconContainer>
              </DropdownItem>
            ))}
          </DropdownList>
        )}
      </Dropdown>
    </DropdownContainer>
  )
}
