import * as  Yup from 'yup';

export const newsletterSchema = {
    email: Yup.string().email('Enter a valid email address').required('A valid email address is required')
}

export const loginSchema = {
    email: Yup.string().email('Enter a valid email address').required('A valid email address is required'),
    password: Yup.string().required('Password is required')
}