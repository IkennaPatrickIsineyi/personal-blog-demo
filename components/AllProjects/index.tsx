'use client'

import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import ProjectSummary from "../ProjectSummary";
import UiSpacer from "../UiSpacer";
import UiText from "../UiText";
import UiPagination from "../UiPagination";
import { allProjectsSample } from "../../utils/dataSamples";
import { useApi } from "@/services/api";

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
}

export default function AllProjects() {
    const [projects, setProjects] = useState<PostType>([]);
    const [totalPosts, setTotalPosts] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(5)

    const { request, processing, error, success } = useApi();

    const getProjects = async (offset: number, endOffset: number) => {
        const res = await request({
            method: 'GET',
            url: `/main/api/project?offset=${offset}&&limit=${itemsPerPage}`
        })

        if (res?.data) {
            console.log('data of projects', res.data)
            setProjects(res?.data?.projects?.map((i: any) => {
                return {
                    ...i, id: i?._id, image: i?.summaryImage,
                    date: i?.timestamp, title: i?.summaryTitle,
                }
            }));
            setTotalPosts(res?.data?.total);
        }
    }

    useEffect(() => {
        getProjects(0, itemsPerPage)
    }, [])

    const onPaginate = async ({ offset, endOffset }: { offset: number, endOffset: number }) => {
        await getProjects(offset, endOffset)
    }

    return <Box sx={{ display: 'flex', flexDirection: 'column', maxWidth: '100%' }}>
        <UiText size='large' fontFamily='inter' fontWeight={700} value={'All Projects'}
            color='text.primary'
        />

        <UiSpacer direction="vertical" size="small" />

        <Box sx={{
            display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, width: '100%',
            justifyContent: { sm: 'space-between' }, flexWrap: 'wrap'
        }}>
            {/* Posts */}
            {projects.map((post, index) => {
                return (
                    <Box key={index} sx={{ mr: { sm: 1, md: 1.5, lg: 2 } }}>
                        <ProjectSummary key={index} {...{ ...post, headliner: false, width: '300px', flex: false, fullwidth: false }} />
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