'use client'

import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { projectPageStyle } from './style'
import UiTextBanner from '../UiTextBanner'
import RecentProjects from "../RecentProjects";
import UiContainer from "../UiContainer";
import AllProjects from "../AllProjects";
import UiSpacer from "../UiSpacer";
import { useApi } from "@/services/api";
import UiLoader from "../UiLoader";
import NoContent from "../NoContent";


export default function () {
    const [recent, setRecent] = useState<Array<any> | null>(null);

    const { request, processing, error, success } = useApi();

    const getRecent = async () => {
        const res = await request({
            method: 'GET',
            url: `/main/api/project/recent`
        })

        if (res?.data) {
            console.log('data of projects', res.data)
            setRecent(res?.data?.projects);
        }
    }

    useEffect(() => {
        getRecent()
    }, [])


    return <Box sx={projectPageStyle.container}>
        {/* Banner */}
        <UiTextBanner value="Projects" />

        <UiSpacer direction="vertical" size="large" />

        {/* All Projects */}
        <UiContainer size="large">
            {recent ?
                recent.length ?
                    <RecentProjects projects={recent} />
                    : <NoContent title="No projects at the moment. Please check back later." />
                : <UiLoader />}
        </UiContainer>

        <UiContainer size="large">
            <AllProjects />
        </UiContainer>
    </Box>
}