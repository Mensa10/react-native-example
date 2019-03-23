import * as Yup from 'yup';

export const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .required('Email is required!')
    .email('Wrong email format'),
  password: Yup.string()
    .min(6, 'Password has to be longer than 6 characters!')
    .required('Password is required!')
})

export const RegisterSchema = Yup.object().shape({
  email: Yup.string()
    .required('Email is required!')
    .email('Wrong email format'),
  displayName: Yup.string()
    .required('Display name is required!'),
  password: Yup.string()
    .min(6, 'Password has to be longer than 6 characters!')
    .required('Password is required!'),
  repeatPassword: Yup.string()
    .min(6, 'Repeat password has to be longer than 6 characters!')
    .required('Repeat password is required!')
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
})

export const uploadContentSchema = Yup.object().shape({
  title: Yup.string()
    .required('Title is required!')
})