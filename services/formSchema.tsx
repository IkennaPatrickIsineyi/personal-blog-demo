import * as  Yup from 'yup';

export const newsletterSchema = {
    email: Yup.string().email('Enter a valid email address').required('A valid email address is required')
}