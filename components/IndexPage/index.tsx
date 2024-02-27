'use client'

import { Box } from "@mui/material";
import { indexPageStyle } from "./style";
import UiContainer from '@/components/UiContainer'
import UiTextBanner from '@/components/UiTextBanner'
import UiSpacer from '@/components/uiSpacer'

export default function IndexPage() {
    return <Box sx={indexPageStyle.container}>
        <UiTextBanner value="The blog" />

        <UiSpacer size="large" direction="vertical" />

        <UiContainer size="large">
            <Box>
                hello home
            </Box>
        </UiContainer>
    </Box>
}