import { Box } from "@mui/material";
import React from "react";
import ProjectSummary from "../ProjectSummary";
import UiSpacer from "../UiSpacer";
import UiText from "../UiText";

type PostType = {
    id: string | number,
    image?: string,
    title: string,
    introduction: string,
    categories: {
        value: string,
        color: string
    }[],
}[]

type Props = {
    projects: PostType
}

export default function RecentProjects({ projects }: Props) {

    return <Box sx={{ display: 'flex', flexDirection: 'column', maxWidth: '100%' }}>
        <UiText size='large' fontFamily='inter' fontWeight={700} value={'Recent Projects'}
            color='text.primary'
        />

        <UiSpacer direction="vertical" size="small" />

        <Box sx={{
            display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, width: '100%',
            justifyContent: { lg: 'space-between' }
        }}>
            {/* Headliner project */}
            <Box sx={{
                width: { xs: '100%', lg: '49%' },
            }}>
                {projects[0] && <ProjectSummary {...{ ...projects[0], headliner: true, flex: false, fullwidth: true }} />}
            </Box>

            {/* Two other projects */}
            <Box sx={{
                display: 'flex', flexDirection: 'column', width: { xs: '100%', lg: '49%' }
            }}>
                {/* For mobile */}
                <Box sx={{ display: { sm: 'none' } }}>
                    {projects[1] && <ProjectSummary {...{ ...projects[1], headliner: false, flex: false, fullwidth: true }} />}
                </Box>
                {/* For others */}
                <Box sx={{ display: { xs: 'none', sm: 'inherit' } }}>
                    {projects[1] && <ProjectSummary {...{ ...projects[1], headliner: false, flex: true, fullwidth: true }} />}
                </Box>

                {/*  <UiSpacer direction="vertical" size="medium" /> */}
                {/* For mobile */}
                <Box sx={{ display: { sm: 'none' } }}>
                    {projects[2] && <ProjectSummary {...{ ...projects[2], headliner: false, flex: false, fullwidth: true }} />}
                </Box>
                {/* For others */}
                <Box sx={{ display: { xs: 'none', sm: 'inherit' } }}>
                    {projects[2] && <ProjectSummary {...{ ...projects[2], headliner: false, flex: true, fullwidth: true }} />}
                </Box>
            </Box>
        </Box>

        <UiSpacer direction="vertical" size="medium" />
        {/* Final Post */}
        {/* For Desktop */}
        <Box sx={{ display: { xs: 'none', lg: 'inherit' } }}>
            {projects[3] && <ProjectSummary {...{ ...projects[3], headliner: false, flex: true, fullwidth: true }} />}
        </Box>

        {/* For others */}
        <Box sx={{ display: { lg: 'none' } }}>
            {projects[3] && <ProjectSummary {...{ ...projects[3], headliner: false, flex: false, fullwidth: true }} />}
        </Box>

        <UiSpacer direction="vertical" size="medium" />
    </Box>
}