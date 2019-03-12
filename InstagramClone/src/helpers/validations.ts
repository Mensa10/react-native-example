import * as Yup from 'yup';

export const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .required('Username is required!'),
  password: Yup.string()
    .min(6, 'Password has to be longer than 6 characters!')
    .required('Password is required!')
})

export const RegisterSchema = Yup.object().shape({
  firstName: Yup.string()
    .required('First name is required!'),
  lastName: Yup.string()
    .required('Last name is required!'),
  username: Yup.string()
    .required('Username is required!'),
  password: Yup.string()
    .min(6, 'Password has to be longer than 6 characters!')
    .required('Password is required!'),
  repeatPassword: Yup.string()
    .min(6, 'Repeat password has to be longer than 6 characters!')
    .required('Repeat password is required!')
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
})