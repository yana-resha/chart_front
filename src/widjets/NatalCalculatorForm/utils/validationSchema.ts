import * as Yup from 'yup'

import { CalculatorRequestKeys } from '@/entities/astro-charts/types/calculator-request.types'

const TIME_RE_FULL = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/
const TIME_RE_NOSEC = /^([01]\d|2[0-3]):([0-5]\d)$/

// Helper: безопасно парсим строку в число (учитываем запятую)
const toNum = (v: unknown) => {
  if (typeof v !== 'string') return NaN
  const s = v.trim().replace(',', '.')
  const n = Number(s)

  return Number.isFinite(n) ? n : NaN
}

const coordValidator = (maxAbs: number) =>
  Yup.string()
    .trim()
    .required('Данное поле обязательно для заполнения')
    .test('is-number', 'Введите корректное число', (v) => !Number.isNaN(toNum(v)))
    .test('in-range', `От -${maxAbs} до ${maxAbs}`, (v) => {
      const n = toNum(v)

      return !Number.isNaN(n) && n >= -maxAbs && n <= maxAbs
    })

export const chartFormSchema = Yup.object().shape({
  [CalculatorRequestKeys.date]: Yup.date().required('Обязательное поле'),
  [CalculatorRequestKeys.name]: Yup.string().max(50, 'Максимальное значение 50 символов'),
  [CalculatorRequestKeys.time]: Yup.string().required('Введите дату'),
  [CalculatorRequestKeys.latitude]: coordValidator(90),
  [CalculatorRequestKeys.longitude]: coordValidator(180),
})
