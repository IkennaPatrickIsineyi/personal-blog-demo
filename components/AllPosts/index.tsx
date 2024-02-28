import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import BlogPostSummary from "../BlogPostSummary";
import UiSpacer from "../UiSpacer";
import UiText from "../UiText";
import UiPagination from "../UiPagination";
import { allPostSample } from "./sampleData";

type PostType = {
    id: string | number,
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
}

export default function AllPosts() {
    const [posts, setPosts] = useState<PostType>([]);
    const [totalPosts, setTotalPosts] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(5)

    useEffect(() => {
        //Get the posts and set the total posts
        setPosts(allPostSample.slice(0, itemsPerPage));
        setTotalPosts(allPostSample.length)
    }, [])

    const onPaginate = ({ offset, endOffset }: { offset: number, endOffset: number }) => {
        setPosts(allPostSample.slice(offset, endOffset))
    }

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
                    <Box key={index} sx={{ mr: { sm: 1, md: 1.5, lg: 2 } }}>
                        <BlogPostSummary key={index} {...{ ...post, headliner: false, width: '300px', flex: false, fullwidth: false }} />
                    </Box>
                )
            })}
        </Box>

        <UiSpacer direction="vertical" size="small" />

        <UiPagination
            onPaginate={onPaginate}
            itemsPerPage={itemsPerPage}
            pageRangeDisplayed={2}
            totalItems={totalPosts}
        />

    </Box>
}