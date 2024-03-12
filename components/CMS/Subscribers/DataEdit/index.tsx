'use client'

import FieldLabel from "@/components/FieldLabel";
import ImageUpload from "@/components/ImageUpload/ImageUpload";
import UiContainer from "@/components/UiContainer";
import UiSpacer from "@/components/UiSpacer";
import UiTextField from "@/components/UiTextField";
import { useApi } from "@/services/api";
import { adminSchema, subscriberSchema } from "@/services/formSchema";
import { Box, Typography } from "@mui/material";
import { Form, Formik, FormikProps } from "formik";
import { useEffect, useState } from "react";
import '@mdxeditor/editor/style.css'
import * as Yup from 'yup';
import SubmitButton from "@/components/SubmitButton";
import { useSearchParams } from "next/navigation";
import UiLoader from "@/components/UiLoader";
import UiText from "@/components/UiText";



export default function EditSubscriber() {
    const [initialValues, setInitialValues] = useState({
        email: '',
    })

    const { processing, request, error, success } = useApi();

    const id = useSearchParams().get('id')

    useEffect(() => {
        const fetchData = async () => {
            request({ method: 'GET', url: `/api/subscribers/?id=${id}` }).then(
                res => {
                    if (res?.data) {
                        id && setInitialValues({ ...(res.data || {}), id });
                    }
                },
                err => console.log
            );
        }

        id && fetchData()
    }, [])


    const handleFileUpload = (url: string, formProps: FormikProps<any>, id: string) => {
        formProps.setFieldValue(id, url)
    };

    const handleFormSubmit = async (values: {}) => {
        const { data } = await request({ method: 'POST', url: `/api/subscribers/${id ? 'edit' : 'create'}`, body: values });

        if (data) {
            console.log('subscriber has been created', data);
            window.location.replace('/cms/subscribers')
        }
    };


    return <UiContainer size="medium">
        {(!id ? true : Boolean(initialValues.email))
            ? <Box>
                <UiSpacer direction="vertical" size="large" />
                <Formik
                    initialValues={initialValues}
                    validationSchema={() => Yup.object(subscriberSchema)}
                    onSubmit={handleFormSubmit}>
                    {(formProps) => {
                        console.log('form values', formProps.values)
                        return (<Form style={{ width: '100%' }}>
                            <Box sx={{
                                display: 'flex', flexDirection: 'column',
                                width: '100%', alignItems: 'center'
                            }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', width: '100%' }}>
                                    {/* email */}
                                    <Box sx={{ mb: 1, width: { xs: '90%', md: '70%' } }}>
                                        {/* Label */}
                                        <FieldLabel label={'Email'} />

                                        {/* Textfield */}
                                        <UiTextField type='email' placeholder={'Email'} name='email' />
                                    </Box>
                                </Box>

                                <UiSpacer direction="vertical" size="large" />

                                {Boolean(error) && <UiText value={error || ''} size="small" color="red" />}
                                {Boolean(error) && <UiSpacer direction="vertical" size="small" />}

                                {/* Submit button */}
                                <SubmitButton style={{ color: 'white', width: { xs: '90%', sm: '60%' } }}
                                    disabled={!formProps.isValid || processing} fullWidth={true}
                                    marginTop={0} label={id ? 'Save' : 'Create'} formProps={formProps} processing={processing}
                                />

                                <UiSpacer direction="vertical" size="large" />
                            </Box>
                        </Form>)
                    }}

                </Formik>
            </Box>
            : <UiLoader />}
    </UiContainer>
}