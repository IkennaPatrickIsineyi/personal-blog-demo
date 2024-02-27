import { Box } from "@mui/material";
import React from "react";
import BlogPostSummary from "../BlogPostSummary";
import UiSpacer from "../UiSpacer";
import UiText from "../UiText";

type PostType = {
    id: string,
    image?: string,
    date: string,
    author: string,
    title: string,
    introduction: string,
    categories: {
        value: string,
        color: string
    }[],
}[]

type Props = {
    posts: PostType
}

export default function RecentPosts({ posts }: Props) {
    return <Box sx={{ display: 'flex', flexDirection: 'column', maxWidth: '100%' }}>
        <UiText size='large' fontFamily='inter' fontWeight={700} value={'Recent Blog Posts'}
            color='text.primary'
        />

        <UiSpacer direction="vertical" size="small" />

        <Box sx={{
            display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, width: '100%',
            justifyContent: { lg: 'space-between' }
        }}>
            {/* Headliner post */}
            <Box sx={{
                width: { xs: '100%', lg: '49%' },
            }}>
                {posts[0] && <BlogPostSummary {...{ ...posts[0], headliner: true, flex: false, fullwidth: true }} />}
            </Box>

            {/* Two other posts */}
            <Box sx={{
                display: 'flex', flexDirection: 'column', width: { xs: '100%', lg: '49%' }
            }}>
                {posts[1] && <BlogPostSummary {...{ ...posts[1], headliner: false, flex: true, fullwidth: true }} />}
                {/*  <UiSpacer direction="vertical" size="medium" /> */}
                {posts[2] && <BlogPostSummary {...{ ...posts[2], headliner: false, flex: true, fullwidth: true }} />}
            </Box>
        </Box>

        <UiSpacer direction="vertical" size="medium" />
        {/* Final Post */}
        {posts[3] && <BlogPostSummary {...{ ...posts[3], headliner: false, flex: true, fullwidth: true }} />}

        <UiSpacer direction="vertical" size="medium" />
    </Box>
}