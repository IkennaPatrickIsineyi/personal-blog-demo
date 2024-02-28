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

export default function AllPosts({ posts }: Props) {
    return <Box sx={{ display: 'flex', flexDirection: 'column', maxWidth: '100%' }}>
        <UiText size='large' fontFamily='inter' fontWeight={700} value={'All Blog Posts'}
            color='text.primary'
        />

        <UiSpacer direction="vertical" size="small" />

        <Box sx={{
            display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, width: '100%',
            justifyContent: { sm: 'space-between' }, flexWrap: 'wrap'
        }}>
            {/* Posts */}
            {posts.map((post, index) => {
                return (
                    <Box sx={{ mr: { sm: 1, md: 1.5, lg: 2 } }}>
                        <BlogPostSummary key={index} {...{ ...post, headliner: false, width: '300px', flex: false, fullwidth: false }} />
                    </Box>
                )
            })}
        </Box>

    </Box>
}