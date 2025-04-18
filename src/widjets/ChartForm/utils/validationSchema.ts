import * as Yup from 'yup'

import { ASTRO_CHART_VARIABLE } from '@/entities/astro-charts/types/astro-chart'
import { CalculatorRequestKeys } from '@/entities/astro-charts/types/calculator'

export const chartFormSchema = Yup.object().shape({
  ['locality']: Yup.object()
    .nullable()
    .when('enter_coordinates', {
      is: false,
      then: (schema) => schema.required('Данное поле обязательно для заполнения'),
      otherwise: (schema) => schema,
    }),
  [CalculatorRequestKeys.date]: Yup.date().required('Обязательное поле'),
  [CalculatorRequestKeys.time]: Yup.string().when(CalculatorRequestKeys.type, (typeVal, schema) =>
    typeVal[0] === ASTRO_CHART_VARIABLE.CHOROSCOPE ? schema : schema.required('Некорректное время'),
  ),
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
