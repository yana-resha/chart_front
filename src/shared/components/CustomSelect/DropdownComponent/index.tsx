import { useCallback, useLayoutEffect, useState } from 'react'

import Skeleton from 'react-loading-skeleton'

import {
  AlertDescription,
  AlertTitle,
  CheckIcon,
  Dropdown,
  DropdownAlertBlock,
  DropdownContainer,
  ItemContent,
  OptionItem,
  OptionsList,
  SkeletonItem,
  UpsetIconSVG,
} from './index.linaria'
import { DROPDOWN_VERTICAL_POSITION, IDropdownProps, IOption } from '../types'

export const DropdownComponent = <IValue extends IOption>({
  ref,
  inputRef,
  optionsList,
  emptyList,
  listIsLoading,
  setValues,
  values,
  closeFunc,
}: IDropdownProps<IValue>) => {
  const [verticalPosition, setVerticalPosition] = useState<DROPDOWN_VERTICAL_POSITION>(
    DROPDOWN_VERTICAL_POSITION.BOTTOM,
  )

  const getVerticalPosition = useCallback(() => {
    const intersectionRect = ref.current?.getBoundingClientRect()
    if (!intersectionRect) return DROPDOWN_VERTICAL_POSITION.BOTTOM

    if (intersectionRect.top + window.pageYOffset < window.scrollY) return DROPDOWN_VERTICAL_POSITION.BOTTOM
    if (intersectionRect.bottom > window.innerHeight) return DROPDOWN_VERTICAL_POSITION.TOP

    return DROPDOWN_VERTICAL_POSITION.BOTTOM
  }, [ref])

  useLayoutEffect(() => {
    setVerticalPosition(getVerticalPosition())
  }, [getVerticalPosition])

  const handlerClick = (item: IValue) => {
    setValues(item)
    console.log('dldlddl')
    closeFunc()
  }

  return (
    <DropdownContainer
      vertical={verticalPosition}
      width={inputRef.current?.getBoundingClientRect().width}
      inputHeight={inputRef.current?.getBoundingClientRect().height}
      left={inputRef.current?.getBoundingClientRect().left}
      parentTop={inputRef.current?.getBoundingClientRect().y}
      parentBottom={inputRef.current?.getBoundingClientRect().bottom}
      currentHeight={ref.current?.getBoundingClientRect().height}
      ref={ref}
    >
      <Dropdown>
        {(!optionsList || optionsList.length <= 0) && !listIsLoading && (
          <DropdownAlertBlock>
            <UpsetIconSVG />
            <AlertTitle>{emptyList?.title}</AlertTitle>
            <AlertDescription>{emptyList?.description}</AlertDescription>
          </DropdownAlertBlock>
        )}
        {listIsLoading && (
          <OptionsList>
            <Skeleton
              baseColor="transparent"
              highlightColor="rgba(255, 255, 255, 0.1)"
              wrapper={SkeletonItem}
              count={10}
            />
          </OptionsList>
        )}
        {optionsList && !listIsLoading && (
          <OptionsList>
            {(optionsList ?? []).map((el) => (
              <OptionItem
                key={el.id}
                onClick={() => handlerClick(el)}
              >
                <ItemContent>{el.content}</ItemContent>
                <CheckIcon className={values.some((val) => val.id === el.id) ? 'show' : ''} />
              </OptionItem>
            ))}
          </OptionsList>
        )}
      </Dropdown>
    </DropdownContainer>
  )
}
