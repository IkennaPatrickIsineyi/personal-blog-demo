'use client'
import BlogPostSummary from "@/components/BlogPostSummary";
import UiButton from "@/components/UiButton";
import UiContainer from "@/components/UiContainer";
import UiPagination from "@/components/UiPagination";
import UiSpacer from "@/components/UiSpacer";
import { allPostSample } from "@/utils/dataSamples";
import { Add, Delete, Edit } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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

export default function Blog() {
    const [data, setData] = useState<PostType>([])
    const [totalPosts, setTotalPosts] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(5)

    const router = useRouter();

    useEffect(() => {
        setData(allPostSample)
        setData(allPostSample.slice(0, itemsPerPage));
        setTotalPosts(allPostSample.length)
    }, [])

    const onPaginate = ({ offset, endOffset }: { offset: number, endOffset: number }) => {
        setData(allPostSample.slice(offset, endOffset))
    }

    const handleCreate = () => {
        router.push('/cms/blog/create')
    }

    return <UiContainer size="medium">
        <Box sx={{ display: 'flex', flexDirection: 'column', maxWidth: '100%' }}>
            <UiSpacer direction="vertical" size="small" />

            {/* Actions */}
            <Box sx={{
                display: 'flex', alignItems: 'center', justifyContent: { xs: 'center', sm: 'flex-end' }, maxWidth: '100%',
                position: 'sticky', top: 0, zIndex: 323
            }}>
                {/* Create button */}
                <UiButton /* handleClick={handleCreate} */ href="/cms/blog/create" size="small" value={'Create Post'}
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
                    return <Box sx={{ mr: { sm: 2, lg: 3 }, }}>

                        <BlogPostSummary
                            key={index}
                            {...{
                                ...item, editable: true, headliner: false, fullwidth: false,
                                width: '300px', flex: false
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
        </Box>
    </UiContainer>
}