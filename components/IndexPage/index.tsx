'use client'

import { Box } from "@mui/material";
import { indexPageStyle } from "./style";
import UiContainer from '@/components/UiContainer'
import UiTextBanner from '@/components/UiTextBanner'
import UiSpacer from '@/components/UiSpacer'
import RecentPosts from '@/components/RecentPosts'
import { recentPostSample } from './sampleData'

const recentPosts = recentPostSample

export default function IndexPage() {
    return <Box sx={indexPageStyle.container}>
        <UiTextBanner value="The blog" />

        <UiSpacer size="large" direction="vertical" />

        <UiContainer size="large">
            <RecentPosts posts={recentPosts} />
        </UiContainer>
    </Box>
}