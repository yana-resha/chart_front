import { InputHTMLAttributes, ReactNode, RefObject } from 'react'

export interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  ref?: RefObject<HTMLDivElement | null>
  label?: ReactNode | string
  leftIcon?: ReactNode
  isClearOnFocus?: boolean
  tooltip?: string | ReactNode
  clearValueFunc?: (e: MouseEvent) => void
  showClearIcon?: boolean
  disabled?: boolean
  invalid?: boolean
  invalidText?: string | ReactNode
  openDropdownFunc: () => void
}

export interface IDropdownProps<VALUE extends IDropdownItem> {
  dropdownRef: RefObject<HTMLDivElement | null>
  inputRef: RefObject<HTMLDivElement | null>
  dropdownList?: VALUE[]
  onClickItem: (e: MouseEvent, item: VALUE) => void
  closeDropdown: () => void
  listIsLoading?: boolean
  emptyList?: {
    title: string | ReactNode
    description: string | ReactNode
  }
  isError?: boolean
  error?: {
    title: string | ReactNode
    description: string | ReactNode
  }
}

export interface IDropdownItem {
  content: string | number | ReactNode
  rightIcon?: ReactNode
  id: string | number
}

type TInputOutsideProps = Omit<TextInputProps, 'ref' | 'openDropdownFunc'>

type TDropdownOutsideProps<VAL extends IDropdownItem> = Omit<
  IDropdownProps<VAL>,
  'dropdownRef' | 'inputRef' | 'closeDropdown'
>

export interface SearchInputProps<VALUE extends IDropdownItem>
  extends TInputOutsideProps,
    TDropdownOutsideProps<VALUE> {}
