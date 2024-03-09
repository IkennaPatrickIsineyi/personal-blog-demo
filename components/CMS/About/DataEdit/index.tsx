'use client'

import Editor from "@/components/EditorComponent";
import FieldLabel from "@/components/FieldLabel";
import ImageUpload from "@/components/ImageUpload/ImageUpload";
import UiContainer from "@/components/UiContainer";
import UiSpacer from "@/components/UiSpacer";
import UiTextArea from "@/components/UiTextArea";
import UiTextField from "@/components/UiTextField";
import { useApi } from "@/services/api";
import { aboutSchema, blogSchema } from "@/services/formSchema";
import { DropdownDataType } from "@/utils/types";
import { Box, IconButton } from "@mui/material";
import { Form, Formik, FormikProps } from "formik";
import { useCallback, useEffect, useState } from "react";
import '@mdxeditor/editor/style.css'
import * as Yup from 'yup';
import DataPreview from "../DataPreview";
import SubmitButton from "@/components/SubmitButton";
import UiLoader from "@/components/UiLoader";
import CollapseContainer from "@/components/CollapseContainer";
import { Visibility } from "@mui/icons-material";

type Props = {
    edit: boolean
}

export default function EditAbout({ edit }: Props) {
    const [users, setUsers] = useState<DropdownDataType>([]);
    const [categories, setCategories] = useState<DropdownDataType>([]);
    const [showPreview, setShowPreview] = useState(false)

    const [initialValues, setInitialValues] = useState({
        image: '', experience: '', education: '', skills: '',
        about: '', metaTitle: '', metaDescription: ''
    })

    const { processing, request, error, success } = useApi();

    useEffect(() => {
        const fetchData = async () => {
            edit && request({ method: 'GET', url: `/api/about/data` }).then(
                res => {
                    if (res?.data) {
                        edit && setInitialValues(res.data?.about);
                    }
                },
                err => console.log
            );
        }

        fetchData()
    }, [])

    const handleFileUpload = (url: string, formProps: FormikProps<any>, id: string) => {
        formProps.setFieldValue(id, url)
    };

    const handleFormSubmit = async (values: {}) => {
        const { data } = await request({ method: 'POST', url: `/api/about/${edit ? 'edit' : 'create'}`, body: values });

        if (data) {
            console.log('about has been updated', data);
            window.location.replace('/cms/about')
        }
    };

    const handleDropdownSelect = (value: string, fieldId: string, formProps: FormikProps<any>) => {
        formProps.setFieldValue(fieldId, value)
    }

    const handleDropdownSelectArray = (value: string, fieldId: string, formProps: FormikProps<any>) => {
        if (formProps.values[fieldId].includes(value)) {
            formProps.setFieldValue(fieldId, formProps.values[fieldId].filter((i: any) => i !== value))
        }
        else {
            formProps.setFieldValue(fieldId, [...(formProps.values[fieldId] || []), value])
        }
    }

    const handleContent = useCallback(({ id, value, formProps }: { id: string, value?: string, formProps: FormikProps<any> }) => {
        formProps.setFieldValue(id, value)
    }, [])

    const openPreview = () => {
        setShowPreview(true)
    }

    const closePreview = () => {
        setShowPreview(false)
    }


    return <UiContainer size="medium">
        {(!edit ? true : Boolean(initialValues.experience))
            ? <Box>
                <UiSpacer direction="vertical" size="large" />
                <Formik
                    initialValues={initialValues}
                    validationSchema={() => Yup.object(aboutSchema)}
                    onSubmit={handleFormSubmit}>
                    {(formProps) => {
                        console.log('form values', formProps.values)
                        return (<Form style={{ width: '100%' }}>
                            <Box sx={{
                                display: 'flex', flexDirection: 'column',
                                width: '100%', alignItems: 'center', position: 'relative'
                            }}>
                                {/* Preview Button */}
                                <IconButton onClick={openPreview} sx={{
                                    position: 'fixed', top: 70, bgcolor: 'primary.main', color: 'white',
                                    right: 20
                                }}>
                                    <Visibility />
                                </IconButton>

                                {/* Image */}
                                <Box sx={{
                                    width: '100%', mb: { xs: 5, md: 2 }
                                }}>
                                    <CollapseContainer title="Image Section">
                                        <Box sx={{ width: '100%', pb: 2 }}>
                                            <FieldLabel label={'My Image'} />
                                            <ImageUpload handleChange={(fileUrl) => { handleFileUpload(fileUrl, formProps, 'image') }}
                                                fileHeight={'1440'} fileWidth={'400'} maxSize={'50MB'} height={'15vw'} width='100%'
                                                multiple={false} file={formProps?.values?.image}
                                                errorMsg={(formProps.errors?.image) ? formProps.errors?.image : ''}
                                                accept={{ 'image/*': ['.png', '.gif'], }}
                                                extensionArray={['PNG', 'JPG']}
                                            />
                                        </Box>
                                    </CollapseContainer>
                                </Box>

                                {/* About me */}
                                <Box sx={{ mb: 2, width: '100%', }}>
                                    <CollapseContainer title="About Me Section">
                                        <Box>
                                            {/* Label */}
                                            <FieldLabel label={'About Me'} />

                                            {/* Textfield */}
                                            <Editor
                                                handleChange={(value?: string) => { handleContent({ id: 'about', value, formProps }) }}
                                                imageFolder="posts" content={formProps.values.about || ''}
                                                placeholder="Write about yourself here..."
                                                disablePreview={true} error={formProps.errors.about || ''}
                                            />
                                        </Box>
                                    </CollapseContainer>
                                </Box>

                                {/* Skills */}
                                <Box sx={{ width: '100%', mb: 2 }}>
                                    <CollapseContainer title="My Skills Section">
                                        <Box>
                                            {/* Label */}
                                            <FieldLabel label={'Skills'} />

                                            {/* Textfield */}
                                            <Editor
                                                handleChange={(value?: string) => { handleContent({ id: 'skills', value, formProps }) }}
                                                imageFolder="skills" content={formProps.values.skills || ''}
                                                placeholder="List your skills here..."
                                                disablePreview={true} error={formProps.errors.skills || ''}
                                            />
                                        </Box>
                                    </CollapseContainer>
                                </Box>

                                {/* Experience */}
                                <Box sx={{ width: '100%', mb: 2 }}>
                                    <CollapseContainer title="My Work Experience Section">
                                        <Box>
                                            {/* Label */}
                                            <FieldLabel label={'Experience'} />

                                            {/* Textfield */}
                                            <Editor
                                                handleChange={(value?: string) => { handleContent({ id: 'experience', value, formProps }) }}
                                                imageFolder="experience" content={formProps.values.experience || ''}
                                                placeholder="List your work experience here..."
                                                disablePreview={true} error={formProps.errors.experience || ''}
                                            />
                                        </Box>
                                    </CollapseContainer>
                                </Box>

                                {/* Education */}
                                <Box sx={{ width: '100%', mb: 2 }}>
                                    <CollapseContainer title="My Education Section">
                                        <Box>
                                            {/* Label */}
                                            <FieldLabel label={'Education'} />

                                            {/* Textfield */}
                                            <Editor
                                                handleChange={(value?: string) => { handleContent({ id: 'education', value, formProps }) }}
                                                imageFolder="education" content={formProps.values.education || ''}
                                                placeholder="List your education here..."
                                                disablePreview={true} error={formProps.errors.education || ''}
                                            />
                                        </Box>
                                    </CollapseContainer>
                                </Box>

                                <UiSpacer direction="vertical" size="large" />

                                {/* Meta data section */}
                                <Box sx={{ width: '100%', mb: 2 }}>
                                    <CollapseContainer title="Meta data Section">
                                        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                                            {/* Meta title */}
                                            <Box sx={{ mb: 1 }}>
                                                {/* Label */}
                                                <FieldLabel label={'Meta Title'} />

                                                {/* Textfield */}
                                                <UiTextField placeholder={'Meta title for SEO...'} name='metaTitle' />
                                            </Box>

                                            {/* Meta description */}
                                            <Box sx={{ mb: 1 }}>
                                                {/* Label */}
                                                <FieldLabel label={'Meta Description'} />

                                                {/* Textfield */}
                                                <UiTextArea placeholder={'Meta description for SEO...'} name='metaDescription' />
                                            </Box>

                                        </Box>
                                    </CollapseContainer>
                                </Box>
                                <UiSpacer direction="vertical" size="large" />

                                {/* Submit button */}
                                <SubmitButton style={{ color: 'white', width: { xs: '90%', sm: '60%' } }}
                                    disabled={!formProps.isValid || processing} fullWidth={true}
                                    marginTop={0} label={'Create'} formProps={formProps} processing={processing}
                                />

                                <UiSpacer direction="vertical" size="large" />
                            </Box>

                            {
                                showPreview && <DataPreview {...{ ...(formProps.values) }}
                                    open={showPreview}
                                    handleClose={closePreview}
                                />
                            }
                        </Form>)
                    }}

                </Formik>
            </Box>
            : <UiLoader />
        }
    </UiContainer >
}