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

export const blogSchema = {
    /* Summary */
    summaryImage: Yup.string().required('This field is required'),
    summaryTitle: Yup.string().required('This field is required'),
    author: Yup.string().required('This field is required'),
    introduction: Yup.string().required('This field is required'),
    categories: Yup.array().min(1, 'Please select at least one category').required('Categories is required'),

    /* Content */
    content: Yup.string().required('Content is required'),

    /* Meta data */
    metaTitle: Yup.string().required('Meta Title is required'),
    metaDescription: Yup.string().required('Meta description is required'),
}