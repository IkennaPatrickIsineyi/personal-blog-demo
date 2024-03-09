'use client'

import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import UiContainer from "../UiContainer";
import Newsletter from "../Newsletter";
import { allPostSample } from "../../utils/dataSamples";
import BlogPostSummary from "../BlogPostSummary";
import UiSpacer from "../UiSpacer";
import UiText from "../UiText";
import { useApi } from "@/services/api";

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


export default function NewsletterPage() {
    const [posts, setPosts] = useState<PostType>([]);
    const [itemsPerPage, setItemsPerPage] = useState(5)

    const { request, processing, error, success } = useApi();

    const getPosts = async (offset: number, endOffset: number) => {
        const res = await request({
            method: 'GET',
            url: `/main/api/blog?offset=${offset}&&limit=${itemsPerPage}`
        })

        if (res?.data) {
            setPosts(res?.data?.posts?.map((i: any) => {
                return {
                    ...i, id: i?._id, image: i?.summaryImage,
                    date: i?.timestamp, title: i?.summaryTitle,
                }
            }));
        }
    }

    useEffect(() => {
        getPosts(0, itemsPerPage)
    }, [])


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
                {posts.map((post, index) => {
                    return <Box sx={{ mr: { md: 2, lg: 4 } }}>
                        <BlogPostSummary key={index}
                            {...{ ...post, flex: false, fullwidth: false, width: '300px', headliner: false }} />
                    </Box>
                })}
            </Box>
        </Box>
    </UiContainer>
}