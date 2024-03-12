import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import BlogPostSummary from "../BlogPostSummary";
import UiSpacer from "../UiSpacer";
import UiText from "../UiText";
import UiPagination from "../UiPagination";
import { allPostSample } from "@/utils/dataSamples";
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

type Props = {
}


export default function AllPosts() {
    const [posts, setPosts] = useState<PostType>([]);
    const [totalPosts, setTotalPosts] = useState(0);
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
            setTotalPosts(res?.data?.total);
        }
    }

    useEffect(() => {
        getPosts(0, itemsPerPage)
    }, [])


    const onPaginate = async ({ offset, endOffset }: { offset: number, endOffset: number }) => {
        // setPosts(allPostSample.slice(offset, endOffset))
        await getPosts(offset, endOffset)
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