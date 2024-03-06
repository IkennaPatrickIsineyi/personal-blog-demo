'use client'

import DropdownField from "@/components/DropdownField/DropdownField";
import DropdownItemsBuilder from "@/components/DropdownField/DropdownItemsBuilder";
import Editor from "@/components/EditorComponent";
import FieldLabel from "@/components/FieldLabel";
import ImageUpload from "@/components/ImageUpload/ImageUpload";
import UiContainer from "@/components/UiContainer";
import UiSpacer from "@/components/UiSpacer";
import UiTextArea from "@/components/UiTextArea";
import UiTextField from "@/components/UiTextField";
import { useApi } from "@/services/api";
import { blogSchema } from "@/services/formSchema";
import { DropdownDataType } from "@/utils/types";
import { Box } from "@mui/material";
import { Form, Formik, FormikProps } from "formik";
import { useCallback, useEffect, useState } from "react";
import '@mdxeditor/editor/style.css'
import * as Yup from 'yup';

export default function EditBlog() {
    const [users, setUsers] = useState<DropdownDataType>([]);
    const [categories, setCategories] = useState<DropdownDataType>([]);

    useEffect(() => {
        setUsers([
            { label: 'John Doe', value: '12', image: '' },
            { label: 'Peter Rain', value: '122', image: '' },
        ]);

        setCategories([
            { label: 'Research', value: '32', image: '' },
            { label: 'Design', value: '93', image: '' },
        ])
    }, [])

    const { processing, request, error, success } = useApi();

    const [initialValues] = useState({
        summaryImage: '', summaryTitle: '', author: '', introduction: '', categories: [], content: '',
        metaTitle: '', metaDescription: '',
    })

    const handleFileUpload = (url: string, formProps: FormikProps<any>, id: string) => {
        formProps.setFieldValue(id, url)
    };

    const handleFormSubmit = async (values: {}) => {
        const { data } = await request({ method: 'POST', url: '/api/blog/create', body: values });

        if (data) {
            console.log('blog has been created', data);
            window.location.href = '/cms/blog'
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

    const handleContent = useCallback(({ value, formProps }: { value?: string, formProps: FormikProps<any> }) => {
        formProps.setFieldValue('content', value)
    }, [])


    return <UiContainer size="medium">
        <Box>
            <UiSpacer direction="vertical" size="large" />
            <Formik
                initialValues={initialValues}
                validationSchema={() => Yup.object(blogSchema)}
                onSubmit={handleFormSubmit}>
                {(formProps) => {
                    console.log('form values', formProps.values)
                    return (<Form style={{ width: '100%' }}>
                        <Box sx={{
                            display: 'flex', flexDirection: 'column',
                            width: '100%', alignItems: 'center'
                        }}>
                            {/* Post summary section */}
                            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, width: '100%' }}>
                                {/* Image */}
                                <Box sx={{
                                    width: { xs: '100%', sm: '30%', md: '30%' }, mr: { sm: 2, lg: 4 },
                                    mb: 2
                                }}>
                                    <FieldLabel label={'Summary Image'} />
                                    <ImageUpload handleChange={(fileUrl) => { handleFileUpload(fileUrl, formProps, 'summaryImage') }}
                                        fileHeight={'1440'} fileWidth={'400'} maxSize={'50MB'} height={'15vw'} width='100%'
                                        multiple={false} file={formProps?.values?.summaryImage}
                                        errorMsg={(formProps.errors?.summaryImage) ? formProps.errors?.summaryImage : ''}
                                        accept={{ 'image/*': ['.png', '.gif'], }}
                                        extensionArray={['PNG', 'JPG']}
                                    />
                                </Box>

                                {/* Title, details, author, categories */}
                                <Box sx={{
                                    display: 'flex', flexDirection: 'column',
                                    width: { xs: '100%', sm: '66%', md: '67%' }
                                }}>
                                    {/* Title */}
                                    <Box sx={{ mb: 1 }}>
                                        {/* Label */}
                                        <FieldLabel label={'Summary Title'} />

                                        {/* Textfield */}
                                        <UiTextField placeholder={'Blog post summary title'} name='summaryTitle' />
                                    </Box>

                                    {/* Details */}
                                    <Box sx={{ mb: 1 }}>
                                        {/* Label */}
                                        <FieldLabel label={'Summary Details'} />

                                        {/* Textfield */}
                                        <UiTextArea placeholder={'Blog post summary details'} name='introduction' />
                                    </Box>

                                    {/* Author */}
                                    <Box sx={{ mb: 1 }}>
                                        {/* Label */}
                                        <FieldLabel label={'Author'} />

                                        {/* Textfield */}
                                        <DropdownField
                                            items={DropdownItemsBuilder({ items: users })}
                                            handleChange={(value) => { handleDropdownSelect(value, 'author', formProps) }}
                                            placeholder={'Select Author'} name='author'
                                            selectedItem={formProps.values.author}
                                        />
                                    </Box>

                                    {/* Categories */}

                                    <Box sx={{ mb: 1 }}>
                                        {/* Label */}
                                        <FieldLabel label={'Categories'} />

                                        {/* Textfield */}
                                        <DropdownField
                                            items={DropdownItemsBuilder({ items: categories })}
                                            handleChange={(value) => { handleDropdownSelectArray(value, 'categories', formProps) }}
                                            placeholder={'Select Categories'} name='categories' multiple
                                            selectedItem={formProps.values.categories}
                                        />
                                    </Box>
                                </Box>
                            </Box>

                            {/* Full content section */}
                            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, width: '100%' }}>
                                <Editor
                                    handleChange={(value?: string) => { handleContent({ value, formProps }) }}
                                    imageFolder="posts"
                                    placeholder="Create your content here..."
                                />
                            </Box>

                            {/* Meta data section */}
                            <Box sx={{ display: 'flex', flexDirection: 'column', maxWidth: '100%' }}>
                                {/* Meta title */}
                                {/* Meta description */}
                            </Box>
                        </Box>
                    </Form>)
                }}
            </Formik>

            <UiSpacer direction="vertical" size="small" />

            {/* Full content section */}
            <Box>

            </Box>

            <UiSpacer direction="vertical" size="small" />

            {/* Meta data section*/}
            <Box sx={{ display: 'flex', flexDirection: 'column', maxWidth: '100%' }}>
                {/* Meta title */}
                {/* Meta description */}
            </Box>
        </Box>
    </UiContainer>
}