'use client'
import BlogPostSummary from "@/components/BlogPostSummary";
import UiButton from "@/components/UiButton";
import UiContainer from "@/components/UiContainer";
import UiPagination from "@/components/UiPagination";
import UiSpacer from "@/components/UiSpacer";
import { useApi } from "@/services/api";
import { allPostSample } from "@/utils/dataSamples";
import { Add, Delete, Edit } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import DataPreview from "../DataPreview";
import UiLoader from "@/components/UiLoader";

type PostType = {
    id: string | number,
    image?: string,
    date: string,
    author: string,
    title: string,
    content?: string,
    slug?: string,
    introduction: string,
    categories: {
        value: string,
        color: string
    }[],
}[]


export default function Blog() {
    const [data, setData] = useState<PostType | null>(null)
    const [totalPosts, setTotalPosts] = useState(0);
    const [content, setContent] = useState('');
    const [itemsPerPage, setItemsPerPage] = useState(5)

    const router = useRouter();
    const { request, processing, error, success } = useApi();

    const getPosts = async (offset: number, endOffset: number) => {
        const res = await request({
            method: 'GET',
            url: `/api/blog?offset=${offset}&&limit=${itemsPerPage}`
        })

        if (res?.data) {
            console.log('data of posts', res.data)
            setData(res?.data?.posts?.map((i: any) => {
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
        await getPosts(offset, endOffset)
    }


    const handleOpenDetails = (content?: string) => {
        setContent(content || '')
    }

    const closeDetails = () => {
        setContent('')
    }

    return <UiContainer size="medium">
        {data ? <Box sx={{ display: 'flex', flexDirection: 'column', maxWidth: '100%' }}>
            <UiSpacer direction="vertical" size="small" />

            {/* Actions */}
            <Box sx={{
                display: 'flex', alignItems: 'center', justifyContent: { xs: 'center', sm: 'flex-end' }, maxWidth: '100%',
                position: 'sticky', top: 0, zIndex: 323
            }}>
                {/* Create button */}
                <UiButton href="/cms/blog/create" size="small" value={'Create Post'}
                    rightIcon={<Add />} variant={"contained"}
                />
            </Box>

            <UiSpacer direction="vertical" size="small" />

            {/* List of blog posts*/}
            <Box sx={{
                display: 'flex', alignItems: 'flex-start', flexDirection: { xs: 'column', sm: 'row' }, flexWrap: 'wrap',
                maxWidth: '100%'
            }}>
                {data.map((item, index) => {
                    return <Box key={index} sx={{ mr: { sm: 2, lg: 3 }, }}
                        onClick={(e) => {
                            e.preventDefault();
                            handleOpenDetails(item?.content)
                        }}>

                        <BlogPostSummary
                            {...{
                                ...item, cms: true, editable: true, headliner: false, fullwidth: false,
                                width: '300px', flex: false, slug: item?.slug
                            }}
                        />

                    </Box>
                })}
            </Box>

            <UiSpacer direction="vertical" size="small" />

            <UiPagination
                onPaginate={onPaginate}
                itemsPerPage={itemsPerPage}
                pageRangeDisplayed={2}
                totalItems={totalPosts}
            />

            {content && <DataPreview content={content} open={(Boolean(content))}
                handleClose={closeDetails}
            />}
        </Box> : <UiLoader />}
    </UiContainer>
}