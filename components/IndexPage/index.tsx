'use client'

import { Box } from "@mui/material";
import { indexPageStyle } from "./style";
import UiContainer from '@/components/UiContainer'
import UiTextBanner from '@/components/UiTextBanner'
import UiSpacer from '@/components/UiSpacer'
import RecentPosts from '@/components/RecentPosts'
import AllPosts from "../AllPosts";
import { useEffect, useState } from "react";
import { useApi } from "@/services/api";
import UiLoader from "../UiLoader";
import NoContent from "../NoContent";

//let initialised = false;

export default function IndexPage() {
    const [recent, setRecent] = useState<Array<any> | null>(null);

    const { request, processing, error, success } = useApi();

    useEffect(() => {
        const getRecent = async () => {
            const res = await request({
                method: 'GET',
                url: `/main/api/blog/recent`
            })

            console.log('res at index', res)

            if (res?.data) {
                setRecent(res?.data?.posts);
            }
        }

        getRecent()
    }, [])


    return <Box sx={indexPageStyle.container}>
        <UiTextBanner value="The blog" />

        <UiSpacer size="large" direction="vertical" />

        <UiContainer size="large">
            {recent ?
                recent.length ?
                    <RecentPosts posts={recent} />
                    : <NoContent title="No blog posts at the moment. Please check back later" />
                : <UiLoader />}
        </UiContainer>

        <UiContainer size="large">
            <AllPosts />
        </UiContainer>
    </Box>
}