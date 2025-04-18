import * as Yup from 'yup'

export const authFormSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, 'Длинна пароля должна быть не менее 6 символов')
    .required('Обязательное поле'),
  email: Yup.string().email('Некорретный email').required('Обязательное поле'),
})
