import { Box, Typography } from "@mui/material";
import UiText from "../UiText";
import UiSpacer from "../UiSpacer";
import { Form, Formik } from "formik";
import * as Yup from 'yup';
import { useState } from "react";
import { newsletterSchema } from "@/services/formSchema";
import UiTextField from "../UiTextField";
import SubmitButton from "../SubmitButton";
import { fontSizes } from "@/utils/sizes";
import { useApi } from "@/services/api";

export default function Newsletter() {
    const [initialValues] = useState({ email: '' });

    const { request, error, success } = useApi();

    const handleFormSubmit = async (values: {}) => {
        const { data } = await request({ method: 'POST', url: `/main/api/subscribers/create`, body: values });

        if (data) {
            console.log('subscriber has been created', data);
            // window.location.replace('/cms/subscribers')
        }
    };

    return <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
        <UiSpacer direction="vertical" size="medium" />

        <UiText size="normal" textAlign="center" color="#7F56D9" fontWeight={600} fontFamily="inter"
            value={'Newsletter'}
        />

        <UiSpacer direction="vertical" size="small" />

        <UiText size="extra" textAlign="center" color="text.primary" fontWeight={800} fontFamily="inter"
            value={'Stories and interviews'}
        />

        <UiSpacer direction="vertical" size="small" />

        <UiText size="normal" textAlign="center" color="text.secondary" fontWeight={400} fontFamily="inter"
            value={'Subscribe to learn about new product features, the latest in technology, solutions, and updates.'}
        />

        <UiSpacer direction="vertical" size="small" />

        <Formik
            initialValues={initialValues}
            validationSchema={() => Yup.object(newsletterSchema)}
            onSubmit={handleFormSubmit}>
            {(formProps) => {
                console.log('form values', formProps.values.email)
                return (<Form style={{ width: '100%' }}>
                    <Box sx={{ display: 'flex', width: '100%', flexDirection: 'column', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', width: '100%', alignItems: 'flex-start' }}>
                            {/* Text field */}
                            <UiTextField width="60%" placeholder={'Enter your email'} name='email' />

                            <UiSpacer direction="horizontal" size="medium" />

                            {/* Submit button */}
                            <SubmitButton style={{ color: 'white', bgcolor: '#7F56D9' }}
                                disabled={!formProps.isValid} fullWidth={false}
                                marginTop={0} label={'Subscribe'} formProps={formProps}
                            />
                        </Box>

                        {(Boolean(error) || Boolean(success)) && <UiSpacer direction="vertical" size="small" />}

                        {(Boolean(error) || Boolean(success)) && <UiText value={error || success || ''} size="small" color={error ? "red" : 'green'} />}
                        {(Boolean(error) || Boolean(success)) && <UiSpacer direction="vertical" size="small" />}

                    </Box>

                </Form >)
            }}
        </Formik >

        <UiSpacer direction="vertical" size="xsmall" />

        <Typography sx={{ fontSize: fontSizes.small, color: 'text.secondary', fontFamily: 'inter' }}>
            We care about your data in our <Typography component='a' href='#'
                sx={{ textDecorationColor: 'none', color: 'text.secondary', fontFamily: 'inter', fontSize: fontSizes.small, }}>privacy policy</Typography>
        </Typography>


        <UiSpacer direction="vertical" size="large" />
    </Box >
}