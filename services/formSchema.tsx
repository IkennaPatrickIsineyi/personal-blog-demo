import * as  Yup from 'yup';

export const newsletterSchema = {
    email: Yup.string().email('Enter a valid email address').required('A valid email address is required')
}

export const loginSchema = {
    email: Yup.string().email('Enter a valid email address').required('A valid email address is required'),
    password: Yup.string().required('Password is required')
}

export const forgotPasswordSchema = {
    email: Yup.string().email('Enter a valid email address').required('A valid email address is required')
}

export const passwordChangeSchema = {
    email: Yup.string().email('Enter a valid email address').required('A valid email address is required'),
    password1: Yup.string().required('Password is required'),
    password2: Yup.string().required('Password is required')
}