import { ReactNode, RefObject } from 'react'

export enum DROPDOWN_VERTICAL_POSITION {
  TOP = 'top',
  BOTTOM = 'bottom',
}

export interface HeadProps<VALUE extends IOption> {
  ref?: RefObject<HTMLDivElement | null>
  label?: ReactNode | string
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  disabled?: boolean
  invalid?: boolean
  invalidText?: string | ReactNode
  isOpen?: boolean
  toogleFunc: () => void
  placeholder?: string
  values: VALUE[]
}

export interface IOption {
  content: string | number | ReactNode
  id: string | number
}

export interface IDropdownProps<VALUE extends IOption> {
  values: VALUE[]
  setValues: (options: VALUE) => void
  listIsLoading?: boolean
  optionsList?: VALUE[]
  ref: RefObject<HTMLDivElement | null>
  inputRef: RefObject<HTMLDivElement | null>
  closeFunc: () => void
  emptyList?: {
    title: string | ReactNode
    description: string | ReactNode
  }
}

type TInputOutsideProps<VAL extends IOption> = Pick<
  HeadProps<VAL>,
  'placeholder' | 'invalid' | 'invalidText' | 'disabled' | 'label' | 'leftIcon'
>

type TDropdownOutsideProps<VAL extends IOption> = Pick<
  IDropdownProps<VAL>,
  'values' | 'setValues' | 'listIsLoading' | 'optionsList' | 'emptyList'
>

export interface CustomSelectProps<VALUE extends IOption>
  extends TInputOutsideProps<VALUE>,
    TDropdownOutsideProps<VALUE> {}
