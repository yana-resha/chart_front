// CoordInputs.tsx
import { ChangeEvent, ClipboardEvent } from 'react'

import Input from '../Input'

const normRadix = (v: string) => v.replace(',', '.') // запятая -> точка

function cleanValue(v: string, intDigits: number, fracDigits = 6): string {
  // 1) оставляем только цифры, точку и минус
  let res = v.replace(/[^\d.\\-]/g, '')

  // 2) минус только в начале (и максимум один)
  if (res.indexOf('-') > 0) res = '-' + res.replace(/-/g, '')
  if ((res.match(/-/g) || []).length > 1) res = res.replace(/-+/g, '-')

  // 3) одна точка (если ввели несколько — оставляем первую)
  const firstDot = res.indexOf('.')
  if (firstDot !== -1) {
    res = res.slice(0, firstDot + 1) + res.slice(firstDot + 1).replace(/\./g, '')
  }

  // 4) если начинается с точки — превращаем в 0.
  if (res === '.') res = '0.'
  if (res.startsWith('-.')) res = res.replace('-.', '-0.')

  // 5) авто-вставка точки после intDigits, ЕСЛИ её ещё нет и цифр больше, чем intDigits
  const sign = res.startsWith('-') ? '-' : ''
  const body = sign ? res.slice(1) : res
  if (!body.includes('.') && body.length > intDigits) {
    res = sign + body.slice(0, intDigits) + '.' + body.slice(intDigits)
  }

  // 6) ограничим длину целой и дробной частей
  const sign2 = res.startsWith('-') ? '-' : ''
  const body2 = sign2 ? res.slice(1) : res
  const [intPartRaw = '', fracPartRaw = ''] = body2.split('.')
  const intPart = intPartRaw.slice(0, intDigits)
  const fracPart = fracPartRaw.slice(0, fracDigits)

  // собираем обратно: если пользователь ещё не поставил точку и мы не вставили её выше — оставляем без точки
  const hasDot = body2.includes('.') || (!body.includes('.') && body.length > intDigits)

  return sign2 + (hasDot ? `${intPart}.${fracPart}` : intPart)
}

type CoordInputProps = {
  value: string
  onChange: (v: string) => void
  disabled?: boolean
  invalid?: boolean
  invalidText?: string
  label: string
  /** число цифр до точки: 2 для широты, 3 для долготы */
  intDigits: number
  /** подсказка в плейсхолдере (по умолчанию генерится) */
  placeholder?: string
}

export const CoordInput = ({
  value,
  onChange,
  disabled,
  invalid,
  invalidText,
  label,
  intDigits,
  placeholder,
}: CoordInputProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const raw = normRadix(e.currentTarget.value)
    const cleaned = cleanValue(raw, intDigits, 6)
    onChange(cleaned)
  }

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    const text = normRadix(e.clipboardData.getData('text'))
    const cleaned = cleanValue(text, intDigits, 6)
    e.preventDefault()
    onChange(cleaned)
  }

  return (
    <Input
      label={label}
      disabled={disabled}
      invalid={invalid}
      invalidText={invalidText}
      value={value}
      inputMode="decimal"
      placeholder={placeholder ?? (intDigits === 2 ? '±DD.dddddd' : '±DDD.dddddd')}
      onChange={handleChange}
      onPaste={handlePaste}
      mask="" // маски НЕ используем
    />
  )
}

// Готовые поля
export const LatitudeInput = (p: Omit<CoordInputProps, 'intDigits'>) => (
  <CoordInput
    {...p}
    label={p.label ?? 'Широта'}
    intDigits={2}
  />
)

export const LongitudeInput = (p: Omit<CoordInputProps, 'intDigits'>) => (
  <CoordInput
    {...p}
    label={p.label ?? 'Долгота'}
    intDigits={3}
  />
)
