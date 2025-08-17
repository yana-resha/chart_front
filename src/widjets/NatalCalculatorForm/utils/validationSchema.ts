import * as Yup from 'yup'

import { CalculatorRequestKeys } from '@/entities/astro-charts/types/calculator-request.types'

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
  ['locality']: Yup.object()
    .nullable()
    .when('enter_coordinates', {
      is: false,
      then: (schema) => schema.required('Данное поле обязательно для заполнения'),
      otherwise: (schema) => schema, // когда вводим координаты — locality не обязателен
    }),

  [CalculatorRequestKeys.date]: Yup.date().required('Обязательное поле'),
  [CalculatorRequestKeys.name]: Yup.string().max(50, 'Максимальное значение 50 символов'),
  [CalculatorRequestKeys.time]: Yup.string().required('Некорректное время'),

  [CalculatorRequestKeys.latitude]: Yup.string().when('enter_coordinates', {
    is: true,
    then: () => coordValidator(90),
    otherwise: () => Yup.string(), // без обязательности, когда координаты не вводим
  }),

  [CalculatorRequestKeys.longitude]: Yup.string().when('enter_coordinates', {
    is: true,
    then: () => coordValidator(180),
    otherwise: () => Yup.string(),
  }),
})
