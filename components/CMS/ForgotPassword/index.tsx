'use client'

import { Box } from "@mui/material";
import { useState } from "react";
import * as Yup from 'yup'
import AuthLayout from "../CMSLayout/AuthLayout";
import { Form, Formik } from "formik";
import { forgotPasswordSchema } from "@/services/formSchema";
import UiTextField from "@/components/UiTextField";
import UiSpacer from "@/components/UiSpacer";
import SubmitButton from "@/components/SubmitButton";
import FieldLabel from "@/components/FieldLabel";
import { useApi } from "@/services/api";
import React from "react";
import LinkSent from "./LinkSent";
import { useRouter } from "next/navigation";
import UiButton from "@/components/UiButton";

export default function ForgotPassword() {
    const [linkSent, setLinkSent] = useState(false);
    const [email, setEmail] = useState<string>('');
    const [initialValues] = useState({ email: '' });

    const router = useRouter()

    const { request, processing } = useApi()

    const handleFormSubmit = async (values: { email: string }) => {
        const { data } = await request({ method: 'POST', url: '/api/send-password-change-link', body: values });

        setEmail(values.email)

        if (data) {
            console.log('link sent', data);
            setLinkSent(true)
        }
    };

    const goToLogin = () => {
        router.replace('/cms');
    }

    return <AuthLayout heading={linkSent ? "Link Sent" : "Forgot Password"} includeBackButton
        instruction={linkSent ? 'We have sent you a mail containing the link to use to reset your password' :
            "Enter the email address connected to your account."}>
        {linkSent
            ? <UiButton value={'Login'} size="small" handleClick={goToLogin} variant="contained" />
            : <Box sx={{ maxWidth: '100%' }}>
                <Formik
                    initialValues={initialValues}
                    validationSchema={() => Yup.object(forgotPasswordSchema)}
                    onSubmit={handleFormSubmit}>
                    {(formProps) => {
                        console.log('form values', formProps.values)
                        return (<Form style={{ width: '100%' }}>
                            <Box sx={{
                                display: 'flex', flexDirection: 'column',
                                maxWidth: '100%', alignItems: 'center'
                            }}>
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

                                {/* Submit button */}
                                <SubmitButton style={{ color: 'white', /* bgcolor: '#7F56D9' */ }}
                                    disabled={!formProps.isValid || processing} fullWidth={true}
                                    marginTop={0} label={'Reset Password'} formProps={formProps} processing={processing}
                                />
                            </Box>
                        </Form >)
                    }}
                </Formik >
            </Box>
        }
    </AuthLayout >
}