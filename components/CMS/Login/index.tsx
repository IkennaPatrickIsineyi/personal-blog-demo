'use client'

import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import LoginStatusCheck from "../LoginStatusCheck";
import * as Yup from 'yup'
import AuthLayout from "../CMSLayout/AuthLayout";
import { Form, Formik } from "formik";
import { loginSchema } from "@/services/formSchema";
import UiTextField from "@/components/UiTextField";
import UiSpacer from "@/components/UiSpacer";
import SubmitButton from "@/components/SubmitButton";
import FieldLabel from "@/components/FieldLabel";

export default function Login() {
    const [showForm, setShowForm] = useState(false);
    const [initialValues] = useState({ email: '' });

    const handleFormSubmit = async (values: {}) => {

    };


    useEffect(() => {
        //Check login status
        setTimeout(() => {
            setShowForm(true)
        }, 4000)
    }, [])



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
                                <SubmitButton style={{ color: 'white', bgcolor: '#7F56D9' }}
                                    disabled={!formProps.isValid} fullWidth={false}
                                    marginTop={0} label={'Subscribe'} formProps={formProps}
                                />
                            </Box>
                        </Form >)
                    }}
                </Formik >
            </Box>
        }
    </AuthLayout >
}