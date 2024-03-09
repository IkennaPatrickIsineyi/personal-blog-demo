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
import DataPreview from "../DataPreview";
import SubmitButton from "@/components/SubmitButton";
import { useSearchParams } from "next/navigation";
import UiLoader from "@/components/UiLoader";
import CollapseContainer from "@/components/CollapseContainer";



export default function EditBlog() {
    const [users, setUsers] = useState<DropdownDataType>([]);
    const [categories, setCategories] = useState<DropdownDataType>([]);
    const [showPreview, setShowPreview] = useState(false)

    const [initialValues, setInitialValues] = useState({
        summaryImage: '', summaryTitle: '', author: '', introduction: '', categories: [], content: '',
        metaTitle: '', metaDescription: ''
    })

    const { processing, request, error, success } = useApi();

    const slug = useSearchParams().get('slug')

    useEffect(() => {
        const fetchData = async () => {
            request({ method: 'GET', url: `/api/blog/data?slug=${slug}` }).then(
                res => {
                    if (res?.data) {
                        slug && setInitialValues(res.data?.post);
                        setUsers(res.data?.users?.map((i: any) => {
                            return { label: i?.fullName, value: i?._id, image: i?.profilePicture }
                        }));
                        setCategories(res.data?.categories?.map((i: any) => {
                            return { label: i?.value, value: i?._id, image: '' }
                        }));
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
        const { data } = await request({ method: 'POST', url: `/api/blog/${slug ? 'edit' : 'create'}`, body: values });

        if (data) {
            console.log('blog has been created', data);
            window.location.replace('/cms/blog')
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

    const openPreview = () => {
        setShowPreview(true)
    }

    const closePreview = () => {
        setShowPreview(false)
    }


    return <UiContainer size="medium">
        {(!slug ? true : Boolean(initialValues.summaryTitle))
            ? <Box>
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
                                <CollapseContainer title="Summary Section">
                                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, width: '100%' }}>
                                        {/* Image */}
                                        <Box sx={{
                                            width: { xs: '100%', sm: '30%', md: '30%' }, mr: { sm: 2, lg: 4 },
                                            mb: { xs: 5, md: 2 }
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
                                </CollapseContainer>

                                <UiSpacer direction="vertical" size="large" />

                                {/* Full content section */}
                                <CollapseContainer title="Content Section">
                                    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                                        <FieldLabel label={'Blog Post Content'} />
                                        <Editor
                                            handleChange={(value?: string) => { handleContent({ value, formProps }) }}
                                            imageFolder="posts" content={formProps.values.content || ''}
                                            placeholder="Create your content here..."
                                            openPreview={openPreview} error={formProps.errors.content || ''}
                                        />
                                    </Box>
                                </CollapseContainer>

                                <UiSpacer direction="vertical" size="large" />

                                {/* Meta data section */}
                                <CollapseContainer title="Meta data Section">
                                    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                                        {/* Meta title */}
                                        <Box sx={{ mb: 1 }}>
                                            {/* Label */}
                                            <FieldLabel label={'Meta Title'} />

                                            {/* Textfield */}
                                            <UiTextField placeholder={'Blog post meta title for SEO...'} name='metaTitle' />
                                        </Box>

                                        {/* Meta description */}
                                        <Box sx={{ mb: 1 }}>
                                            {/* Label */}
                                            <FieldLabel label={'Meta Description'} />

                                            {/* Textfield */}
                                            <UiTextArea placeholder={'Blog post meta description for SEO...'} name='metaDescription' />
                                        </Box>

                                    </Box>
                                </CollapseContainer>

                                <UiSpacer direction="vertical" size="large" />

                                {/* Submit button */}
                                <SubmitButton style={{ color: 'white', width: { xs: '90%', sm: '60%' } }}
                                    disabled={!formProps.isValid || processing} fullWidth={true}
                                    marginTop={0} label={'Create'} formProps={formProps} processing={processing}
                                />

                                <UiSpacer direction="vertical" size="large" />
                            </Box>

                            {showPreview && <DataPreview content={formProps.values.content} open={showPreview}
                                handleClose={closePreview}
                            />}
                        </Form>)
                    }}

                </Formik>
            </Box>
            : <UiLoader />}
    </UiContainer>
}