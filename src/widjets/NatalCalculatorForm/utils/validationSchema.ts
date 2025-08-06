import * as Yup from 'yup'

import { CalculatorRequestKeys } from '@/entities/astro-charts/types/calculator-request.types'

export const chartFormSchema = Yup.object().shape({
  ['locality']: Yup.object()
    .nullable()
    .when('enter_coordinates', {
      is: false,
      then: (schema) => schema.required('Данное поле обязательно для заполнения'),
      otherwise: (schema) => schema,
    }),
  [CalculatorRequestKeys.date]: Yup.date().required('Обязательное поле'),
  [CalculatorRequestKeys.name]: Yup.string().max(50, 'Максимальное значение 50 символов'),
  [CalculatorRequestKeys.time]: Yup.string().required('Некорректное время'),
  [CalculatorRequestKeys.latitude]: Yup.string().when('enter_coordinates', {
    is: true,
    then: (schema) =>
      schema
        .required('Данное поле обязательно для заполнения')
        .min(7, 'Данное поле обязательно для заполнения'),
    otherwise: (schema) => schema,
  }),
  [CalculatorRequestKeys.longitude]: Yup.string().when('enter_coordinates', {
    is: true,
    then: (schema) =>
      schema
        .required('Данное поле обязательно для заполнения')
        .min(7, 'Данное поле обязательно для заполнения'),
    otherwise: (schema) => schema,
  }),
})
