'use client'

import UiButton from "@/components/UiButton";
import UiContainer from "@/components/UiContainer";
import UiSpacer from "@/components/UiSpacer";
import { useApi } from "@/services/api";
import { Box, IconButton } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import UiText from "@/components/UiText";
import { Edit } from "@mui/icons-material";
import UiLoader from "@/components/UiLoader";

type AboutType = {
    image?: string,
    experience: string,
    education: string,
    skills: string,
    about: string,
}


export default function About() {
    const [data, setData] = useState<AboutType | null>(null)

    const router = useRouter();
    const { request, processing, error, success } = useApi();

    const getData = async () => {
        const res = await request({
            method: 'GET',
            url: `/api/about`
        })

        if (res?.data) {
            console.log('data of about', res.data)
            setData(res?.data?.about);
        }
    }

    useEffect(() => {
        getData()
    }, [])


    return <UiContainer size="medium">
        {data ? <Box sx={{
            width: { xs: '100%', sm: '80%', md: '60%' }, mx: 'auto', position: 'relative', my: 2, borderRadius: '16px',
            px: 2, py: 1, boxShadow: 'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px'
        }}>
            <Box sx={{
                display: 'flex', alignItems: 'center', justifyContent: { xs: 'center', sm: 'flex-end' }, maxWidth: '100%',
                position: 'fixed', top: 70, right: 20, zIndex: 323
            }}>
                {/* Create button */}
                <UiButton href="/cms/about/edit" size="tiny" value={'Edit'}
                    rightIcon={<Edit sx={{ fontSize: 14, ml: 1 }} />} variant={"contained"}
                />
            </Box>

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
        </Box> : <UiLoader />}
    </UiContainer>
}