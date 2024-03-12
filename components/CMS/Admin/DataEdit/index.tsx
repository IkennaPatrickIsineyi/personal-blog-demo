'use client'

import FieldLabel from "@/components/FieldLabel";
import ImageUpload from "@/components/ImageUpload/ImageUpload";
import UiContainer from "@/components/UiContainer";
import UiSpacer from "@/components/UiSpacer";
import UiTextField from "@/components/UiTextField";
import { useApi } from "@/services/api";
import { adminSchema } from "@/services/formSchema";
import { Box, Typography } from "@mui/material";
import { Form, Formik, FormikProps } from "formik";
import { useEffect, useState } from "react";
import '@mdxeditor/editor/style.css'
import * as Yup from 'yup';
import SubmitButton from "@/components/SubmitButton";
import { useSearchParams } from "next/navigation";
import UiLoader from "@/components/UiLoader";
import UiText from "@/components/UiText";



export default function EditAdmin() {
    const [initialValues, setInitialValues] = useState({
        profilePicture: '', fullName: '', email: '',
    })

    const { processing, request, error, success } = useApi();

    const id = useSearchParams().get('id')

    useEffect(() => {
        const fetchData = async () => {
            request({ method: 'GET', url: `/api/admin/?id=${id}` }).then(
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
        const { data } = await request({ method: 'POST', url: `/api/admin/${id ? 'edit' : 'create'}`, body: values });

        if (data) {
            console.log('admin has been created', data);
            window.location.replace('/cms/admin')
        }
    };


    return <UiContainer size="medium">
        {(!id ? true : Boolean(initialValues.fullName))
            ? <Box>
                <UiSpacer direction="vertical" size="large" />
                <Formik
                    initialValues={initialValues}
                    validationSchema={() => Yup.object(adminSchema)}
                    onSubmit={handleFormSubmit}>
                    {(formProps) => {
                        console.log('form values', formProps.values)
                        return (<Form style={{ width: '100%' }}>
                            <Box sx={{
                                display: 'flex', flexDirection: 'column',
                                width: '100%', alignItems: 'center'
                            }}>
                                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, width: '100%' }}>
                                    {/* Image */}
                                    <Box sx={{
                                        width: { xs: '100%', sm: '30%', md: '30%' }, mr: { sm: 2, lg: 4 },
                                        mb: { xs: 5, md: 2 }
                                    }}>
                                        <FieldLabel label={'Profile Picture'} />
                                        <ImageUpload handleChange={(fileUrl) => { handleFileUpload(fileUrl, formProps, 'profilePicture') }}
                                            fileHeight={'1440'} fileWidth={'400'} maxSize={'50MB'} height={'15vw'} width='100%'
                                            multiple={false} file={formProps?.values?.profilePicture}
                                            errorMsg={(formProps.errors?.profilePicture) ? formProps.errors?.profilePicture : ''}
                                            accept={{ 'image/*': ['.png', '.gif'], }}
                                            extensionArray={['PNG', 'JPG']}
                                        />
                                    </Box>

                                    {/* Full name, email */}
                                    <Box sx={{
                                        display: 'flex', flexDirection: 'column',
                                        width: { xs: '100%', sm: '66%', md: '67%' }
                                    }}>
                                        {/* Full name */}
                                        <Box sx={{ mb: 3 }}>
                                            {/* Label */}
                                            <FieldLabel label={'Full Name'} />

                                            {/* Textfield */}
                                            <UiTextField placeholder={'Full name'} name='fullName' />
                                        </Box>

                                        {/* email */}
                                        <Box sx={{ mb: 1 }}>
                                            {/* Label */}
                                            <FieldLabel label={'Email'} />

                                            {/* Textfield */}
                                            <UiTextField type='email' placeholder={'Email'} name='email' />
                                        </Box>
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