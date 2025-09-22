import { InputHTMLAttributes, ReactNode, RefObject } from 'react'

export interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  ref?: RefObject<HTMLDivElement | null>
  label?: ReactNode | string
  leftIcon?: ReactNode
  isClearOnFocus?: boolean
  tooltip?: string | ReactNode
  mobileTooltipTitle?: string | ReactNode
  clearValueFunc?: (e: MouseEvent) => void
  showClearIcon?: boolean
  disabled?: boolean
  invalid?: boolean
  invalidText?: string | ReactNode
}

export interface IDropdownItem {
  id: string | number
  content?: ReactNode | string
  rightIcon?: ReactNode
}

export interface IDropdownProps<VAL extends IDropdownItem> {
  dropdownRef: RefObject<HTMLDivElement | null>
  inputRef: RefObject<HTMLInputElement | null>
  onClickItem: (e: MouseEvent | undefined, item: VAL | null) => void
  closeDropdown: () => void
  listIsLoading?: boolean
  isError?: boolean
  error?: { title?: ReactNode; description?: ReactNode }
  emptyList?: { title?: ReactNode; description?: ReactNode } // <-- показывай пустое состояние, если нужно
  dropdownList?: VAL[]
}

type TInputOutsideProps = Omit<TextInputProps, 'ref' | 'openDropdownFunc'>
type TDropdownOutsideProps<VAL extends IDropdownItem> = Omit<
  IDropdownProps<VAL>,
  'dropdownRef' | 'inputRef' | 'closeDropdown'
>

/** Полностью контролируемые пропсы */
export interface SearchInputProps<VALUE extends IDropdownItem>
  extends TInputOutsideProps,
    TDropdownOutsideProps<VALUE> {
  /** Текущее состояние открытия — управляется только родителем */
  open: boolean
  /** Сигнал об изменении открытия (родитель обязан синхронизировать open) */
  onOpenChange: (open: boolean) => void
}
