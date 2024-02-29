import { Box } from "@mui/material";
import React from "react";
import { projectPageStyle } from './style'
import UiTextBanner from '../UiTextBanner'
import UiText from '../UiText'
import RecentProjects from "../RecentProjects";
import UiContainer from "../UiContainer";
import AllProjects from "../AllProjects";
import { allProjectsSample } from "../../utils/dataSamples";
import UiSpacer from "../UiSpacer";


export default function () {
    return <Box sx={projectPageStyle.container}>
        {/* Banner */}
        <UiTextBanner value="Projects" />

        <UiSpacer direction="vertical" size="large" />

        {/* All Projects */}
        <UiContainer size="large">
            <RecentProjects projects={allProjectsSample.slice(0, 5)} />
        </UiContainer>

        <UiContainer size="large">
            <AllProjects />
        </UiContainer>
    </Box>
}