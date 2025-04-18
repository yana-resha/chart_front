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
  //[CalculatorRequestKeys.longitude]: Yup.string().required('Данное поле обязательно'),
  /* [AccreditationRequestKeys.disease_anamnesis]: Yup.string().required('Обязательное поле'),
  [AccreditationRequestKeys.life_anamnesis]: Yup.string().required('Обязательное поле'),
  [AccreditationRequestKeys.question]: Yup.string().required('Обязательное поле'),
  [AccreditationRequestKeys.question_number]: Yup.number()
    .min(1, 'Число должно быть больше 0')
    .required('Обязательное поле'),
  [AccreditationRequestKeys.required_number_to_choose]: Yup.number()
    .min(1, 'Число должно быть больше 0')
    .required('Обязательное поле'),
  [AccreditationRequestKeys.status]: Yup.string().required('Обязательное поле'),
  [AccreditationRequestKeys.options]: Yup.array()
    .min(3, 'Минимальное кол-во вариантов ответа не менее 3')
    .test('', 'Минимальное кол-во вариантов ответа не менее 3', checkOptionsArray)
    .test('', 'Варианты ответа не должны повторяться', checkDublicateOptions), */
})
