import { ReactNode, RefObject } from 'react'

export enum DROPDOWN_VERTICAL_POSITION {
  TOP = 'top',
  BOTTOM = 'bottom',
}

// --- Option item ---
export interface IOption {
  content: string | number | ReactNode
  id: string | number
}

// --- Head (крышка селекта) ---
export interface HeadProps<VALUE extends IOption> {
  /** ref на кликабельную область (у тебя это Values) */
  ref?: RefObject<HTMLDivElement | null>
  label?: ReactNode | string
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  disabled?: boolean
  invalid?: boolean
  invalidText?: string | ReactNode
  isOpen?: boolean
  /** да, в проекте так названо — оставляю как есть */
  toogleFunc: () => void
  placeholder?: string
  values: VALUE[]
}

// --- Dropdown (список опций) ---
export type DropdownEmpty = {
  title: string | ReactNode
  description: string | ReactNode
}

export type DropdownError = {
  title?: string
  description?: string
}

export interface IDropdownProps<VALUE extends IOption> {
  /** текущее значение(я) селекта */
  values: VALUE[]
  /** установить выбранное значение (ты передаёшь setValues) */
  setValues: (option: VALUE) => void

  /** данные списка */
  optionsList?: VALUE[]
  listIsLoading?: boolean
  emptyList?: DropdownEmpty

  /** опционально: состояние/текст ошибки загрузки */
  isError?: boolean
  error?: DropdownError

  /** закрыть дропдаун (ты передаёшь closeFunc) */
  closeFunc: () => void

  /** контейнер дропа (ты передаёшь prop с именем ref именно как обычный проп) */
  ref: RefObject<HTMLDivElement | null>

  /** ref на «голову»/триггер (div), к которому прилипает выпадашка */
  inputRef: RefObject<HTMLDivElement | null>
}

// --- Внешние пропсы селекта ---
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
