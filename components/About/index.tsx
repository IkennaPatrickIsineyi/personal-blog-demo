'use client'

import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { aboutPageStyle } from "./style";
import UiTextBanner from "../UiTextBanner";
import UiContainer from "../UiContainer";
import UiText from "../UiText";
import UiSpacer from "../UiSpacer";
import { useApi } from "@/services/api";
import UiLoader from "../UiLoader";

type AboutType = {
    image?: string,
    experience: string,
    education: string,
    skills: string,
    about: string,
}


export default function About() {
    const [data, setData] = useState<AboutType | null>(null)
    const { request, processing, error, success } = useApi();

    const getData = async () => {
        const res = await request({
            method: 'GET',
            url: `/main/api/about`
        })

        if (res?.data) {
            console.log('data of about', res.data)
            setData(res?.data?.about);
        }
    }

    useEffect(() => {
        getData()
    }, [])

    return <Box sx={aboutPageStyle.container}>
        {/* Banner */}
        <UiTextBanner value="Ikenna" />

        <UiSpacer direction="vertical" size="large" />

        {data ? <UiContainer size="large">
            <Box>
                {/* Image */}
                <Box sx={{ height: 'auto', width: '100%', pt: 2 }}>
                    <img src={data?.image} style={{ height: '100%', width: '100%', objectFit: 'contain' }} />
                </Box>

                <UiSpacer direction="vertical" size="large" />

                {/* About me heading*/}
                <UiText value={'About Me'} size="large" color="text.primary" fontWeight={700} />

                <UiSpacer direction="vertical" size="xsmall" />

                {/* About me value */}
                <UiText value={data?.about || ''} isHtml size="normal" color="text.secondary" />

                <UiSpacer direction="vertical" size="large" />

                {/* Skills heading*/}
                <UiText value={'Skills'} size="large" color="text.primary" fontWeight={700} />

                {/* Skills value */}
                <UiText value={data?.skills || ''} isHtml size="normal" color="text.secondary" />

                <UiSpacer direction="vertical" size="large" />

                {/* Experience heading*/}
                <UiText value={'Experience'} size="large" color="text.primary" fontWeight={700} />

                {/* Experience value */}
                <UiText value={data?.experience || ''} isHtml size="normal" color="text.secondary" />

                <UiSpacer direction="vertical" size="large" />

                {/* Education heading*/}
                <UiText value={'Education'} size="large" color="text.primary" fontWeight={700} />

                {/* Education value */}
                <UiText value={data?.education || ''} isHtml size="normal" color="text.secondary" />

                <UiSpacer direction="vertical" size="large" />
            </Box>
        </UiContainer> : <UiLoader />}

    </Box>
}