'use client'

import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import ProjectSummary from "../ProjectSummary";
import UiSpacer from "../UiSpacer";
import UiText from "../UiText";
import UiPagination from "../UiPagination";
import { allProjectsSample } from "../../utils/dataSamples";

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

    useEffect(() => {
        //Get the projects and set the total projects
        setProjects(allProjectsSample.slice(0, itemsPerPage));
        setTotalPosts(allProjectsSample.length)
    }, [])

    const onPaginate = ({ offset, endOffset }: { offset: number, endOffset: number }) => {
        setProjects(allProjectsSample.slice(offset, endOffset))
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