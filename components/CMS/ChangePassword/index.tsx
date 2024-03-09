'use client'

import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import * as Yup from 'yup'
import AuthLayout from "../CMSLayout/AuthLayout";
import { Form, Formik } from "formik";
import { passwordChangeSchema } from "@/services/formSchema";
import UiTextField from "@/components/UiTextField";
import UiLoader from "@/components/UiLoader";
import UiSpacer from "@/components/UiSpacer";
import SubmitButton from "@/components/SubmitButton";
import FieldLabel from "@/components/FieldLabel";
import { useApi } from "@/services/api";
import UiButton from "@/components/UiButton";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import PasswordChanged from "./PasswordChanged";


export default function ChangePassword() {
    const [showForm, setShowForm] = useState(false);
    const [passwordChanged, setPasswordChanged] = useState(false);

    const pathArray = usePathname().split('/');


    const [initialValues] = useState({
        email: pathArray[pathArray.length - 1], password1: '',
        password2: '', token: pathArray[pathArray.length - 2]
    });

    const router = useRouter()

    const { request, processing } = useApi()

    useEffect(() => {
        const fetchData = async () => {
            request({
                method: 'POST', url: '/api/verify-token',
                body: { token: pathArray[pathArray.length - 2], email: pathArray[pathArray.length - 1] }
            }).then(resp => {
                const data = resp.data;

                console.log('request result', data);

                if (data) {
                    console.log('valid token', data);
                    setShowForm(true)
                }
            }, err => console.log('error in request', err));
        }

        fetchData()
    }, [])


    const goToLogin = () => {
        router.replace('/cms');
    }

    const handleFormSubmit = async (values: {}) => {
        const { data } = await request({ method: 'POST', url: '/api/change-password', body: values });

        if (data) {
            console.log('Password has been changed', data);
            setPasswordChanged(true)
        }
    };


    return <AuthLayout heading={passwordChanged ? 'Password Changed' : "Change Password"}
        instruction={passwordChanged ? "Your password has been changed" :
            "Enter the password that you want to set as the new password"}>
        {!showForm
            ? <UiLoader />
            : passwordChanged ?
                <UiButton value={'Login'} size="small" handleClick={goToLogin} variant="contained" />
                : <Box sx={{ maxWidth: '100%' }}>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={() => Yup.object(passwordChangeSchema)}
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
                                        {/* Password */}
                                        {/* Field Label */}
                                        <FieldLabel label={'Password'} required={true} />

                                        {/* Text field */}
                                        <UiTextField width="100%" type="password" placeholder={'Enter your password'} name='password1' />
                                    </Box>

                                    <UiSpacer direction="vertical" size="medium" />

                                    <Box sx={{
                                        display: 'flex', flexWrap: 'wrap', flexDirection: 'column',
                                        maxWidth: '100%', alignItems: 'flex-start'
                                    }}>
                                        {/* Password */}
                                        {/* Field Label */}
                                        <FieldLabel label={'Confirm Password'} required={true} />

                                        {/* Text field */}
                                        <UiTextField width="100%" type="password" placeholder={'Enter your password'} name='password2' />
                                    </Box>


                                    <UiSpacer direction="vertical" size="medium" />

                                    {/* Submit button */}
                                    <SubmitButton style={{ color: 'white', /* bgcolor: '#7F56D9' */ }}
                                        disabled={!formProps.isValid || processing} fullWidth={true}
                                        marginTop={0} label={'Change Password'} formProps={formProps} processing={processing}
                                    />

                                </Box>
                            </Form >)
                        }}
                    </Formik >
                </Box>
        }
    </AuthLayout >
}