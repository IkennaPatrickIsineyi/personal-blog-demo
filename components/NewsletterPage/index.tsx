'use client'

import { Box } from "@mui/material";
import React from "react";
import UiContainer from "../UiContainer";
import Newsletter from "../Newsletter";
import { allPostSample } from "../../utils/dataSamples";
import BlogPostSummary from "../BlogPostSummary";
import UiSpacer from "../UiSpacer";
import UiText from "../UiText";

export default function NewsletterPage() {
    return <UiContainer size="large">
        <Box>
            {/* Newsletter */}
            <Newsletter />

            <UiSpacer direction="vertical" size="large" />

            <UiText value={'Recent blog posts'} size="large" color="text.primary" fontWeight={700} />

            <UiSpacer direction="vertical" size="medium" />

            {/* Recent posts */}
            <Box sx={{
                display: 'flex', flexDirection: { xs: 'column', sm: 'row' },
                flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: { sm: 'space-between' }
            }}>
                {allPostSample.slice(0, 3).map((post, index) => {
                    return <Box sx={{ mr: { md: 2, lg: 4 } }}>
                        <BlogPostSummary key={index}
                            {...{ ...post, flex: false, fullwidth: false, width: '300px', headliner: false }} />
                    </Box>
                })}
            </Box>
        </Box>
    </UiContainer>
}