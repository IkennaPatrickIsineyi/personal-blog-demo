'use client'

import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import LoginStatusCheck from "../LoginStatusCheck";
import * as Yup from 'yup'
import AuthLayout from "../CMSLayout/AuthLayout";
import { ErrorMessage, Form, Formik } from "formik";
import { loginSchema } from "@/services/formSchema";
import UiTextField from "@/components/UiTextField";
import UiSpacer from "@/components/UiSpacer";
import SubmitButton from "@/components/SubmitButton";
import FieldLabel from "@/components/FieldLabel";
import { useApi } from "@/services/api";
import UiButton from "@/components/UiButton";
import { useRouter } from "next/navigation";
import FormMessage from "@/components/FormMessage";

export default function Login() {
    const [showForm, setShowForm] = useState(false);
    const [initialValues] = useState({ email: '' });
    const router = useRouter()

    const { request, processing, error, success } = useApi()

    const handleFormSubmit = async (values: {}) => {
        const { data } = await request({ method: 'POST', url: '/api/sign-in', body: values });

        if (data) {
            console.log('user has been logged in', data);
            window.location.href = '/cms/blog'
        }
    };


    useEffect(() => {
        //Check login status
        const fetchData = async () => {
            const res = await request({ method: 'GET', url: '/api/auth' });

            if (res?.data) {
                res.data?.email ? (window.location.href = '/cms/blog') : setShowForm(true)
            }
        }

        fetchData()
    }, [])

    const handleForgotPassword = () => {
        router.push('/cms/forgot-password')
    }

    return <AuthLayout heading="Login" instruction="Login with your email and password">
        {!showForm
            ? <LoginStatusCheck />
            : <Box sx={{ maxWidth: '100%' }}>
                <Formik
                    initialValues={initialValues}
                    validationSchema={() => Yup.object(loginSchema)}
                    onSubmit={handleFormSubmit}>
                    {(formProps) => {
                        console.log('form values', formProps.values)
                        return (<Form style={{ width: '100%' }}>
                            <Box sx={{
                                display: 'flex', flexDirection: 'column',
                                maxWidth: '100%', alignItems: 'center'
                            }}>
                                <FormMessage error={error} success={success} />
                                <Box sx={{
                                    display: 'flex', flexWrap: 'wrap', flexDirection: 'column',
                                    maxWidth: '100%', alignItems: 'flex-start'
                                }}>
                                    {/* Email */}
                                    {/* Field Label */}
                                    <FieldLabel label={'Email address'} required={true} />

                                    {/* Text field */}
                                    <UiTextField width="100%" type="email" placeholder={'Enter your email'} name='email' />
                                </Box>

                                <UiSpacer direction="vertical" size="medium" />

                                <Box sx={{
                                    display: 'flex', flexWrap: 'wrap', flexDirection: 'column',
                                    maxWidth: '100%', alignItems: 'flex-start'
                                }}>
                                    {/* Password */}
                                    {/* Field Label */}
                                    <FieldLabel label={'Password'} required={true} />

                                    {/* Text field */}
                                    <UiTextField width="100%" type="password" placeholder={'Enter your password'} name='password' />
                                </Box>


                                <UiSpacer direction="vertical" size="medium" />

                                {/* Submit button */}
                                <SubmitButton style={{ color: 'white', /* bgcolor: '#7F56D9' */ }}
                                    disabled={!formProps.isValid || processing} fullWidth={true}
                                    marginTop={0} label={'Login'} formProps={formProps} processing={processing}
                                />

                                <UiSpacer direction="vertical" size="small" />

                                <UiButton size="small" value='forgot password?' textAlign="right" letterCase="capitalize"
                                    variant="text" handleClick={handleForgotPassword}
                                />
                            </Box>
                        </Form >)
                    }}
                </Formik >
            </Box>
        }
    </AuthLayout >
}