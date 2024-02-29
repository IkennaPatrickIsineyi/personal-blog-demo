'use client'

import { ProjectType } from "../../utils/types"
import { Box, Typography } from "@mui/material"
import UiContainer from "../UiContainer"
import UiText from "../UiText"
import { fontSizes } from "../../utils/sizes"
import UiSpacer from "../UiSpacer"
import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import UiLoader from '../../components/UiLoader'
import Newsletter from "../Newsletter"
import { projectContentSample } from "../../utils/dataSamples"
import React from "react"
import { allProjectsSample } from "../../utils/dataSamples"
import ProjectSummary from "../ProjectSummary"

type DataType = {
    content: string,
    title: string,
    categories: {
        value: string, color: string
    }[],
    recentProjects: ProjectType
}

export default function ProjectDetails(/* { content, recentPosts, title, categories, date }: Props */) {
    const [data, setData] = useState<DataType>({ content: '', title: '', categories: [], recentProjects: [] });

    //Get Id of the project
    const projectId = useSearchParams().get('id');

    useEffect(() => {
        //Get the project content, title, date, categories,recent posts
        setData({
            content: projectContentSample,
            title: 'Grid system for better Design User Interface',
            categories: [
                { value: 'design', color: '#6941C6', },
                { value: 'research', color: '#3538CD' }
            ],
            recentProjects: allProjectsSample.slice(0, 5)
        })
    }, [])

    return <UiContainer size="large">
        {data.content ? <Box sx={{
            display: 'flex', alignItems: 'flex-start', justifyContent: { md: 'space-between' },
            flexDirection: { xs: 'column', md: 'row-reverse' }
        }}>
            {/* Post content */}
            <Box sx={{ display: 'flex', flexDirection: 'column', maxWidth: { xs: '100%', md: '60%', lg: '65%' } }}>

                {/* Title */}
                <UiText size={'extra'} fontFamily='inter' fontWeight={700} value={data.title}
                    color='text.primary'
                />

                <UiSpacer direction="vertical" size='small' />

                {/* Content */}
                <Box dangerouslySetInnerHTML={{ __html: data.content }} sx={{ color: 'text.secondary', fontFamily: 'inter', }}>
                </Box>

                {/* Categories */}
                <Box sx={{ display: 'flex', alignItems: 'center', }}>
                    {data.categories.map((category, index) => {
                        return <Typography key={index} sx={{
                            bgcolor: `${category.color}10`, color: category.color, fontSize: fontSizes.small,
                            fontFamily: 'inter', mr: 1, px: 1, py: .5, borderRadius: '8px', textTransform: 'capitalize',
                            fontWeight: 600
                        }}>
                            {category.value}
                        </Typography>
                    })}
                </Box>

                <UiSpacer direction="vertical" size='medium' />

                {/* Newsletter */}
                <Box sx={{ display: { xs: 'none', md: 'inherit' } }}>
                    <Newsletter />
                </Box>

            </Box>

            {/* Recent projects */}
            <Box sx={{
                display: 'flex', flexDirection: { xs: 'column', }, width: { xs: '100%', md: '35%', lg: '25%' },
            }}>
                <UiText size='large' fontFamily='inter' fontWeight={700} value={'Recent Projects'}
                    color='text.primary'
                />

                <UiSpacer direction="vertical" size='small' />

                {/* Posts */}
                <Box sx={{
                    display: 'flex', flexDirection: { xs: 'column', sm: 'row', md: 'column' }, flexWrap: 'wrap',
                    width: '100%',
                }}>
                    {data.recentProjects.map((post, index) => {
                        return (
                            <Box key={index} sx={{ mr: { sm: 1, md: 1.5, lg: 2 } }}>
                                <ProjectSummary key={index} {...{
                                    ...post, headliner: false, width: '300px',
                                    flex: false, fullwidth: false
                                }} />
                            </Box>
                        )
                    })}
                </Box>

                <UiSpacer direction="vertical" size='medium' />

                {/* Newsletter */}
                <Box sx={{ display: { md: 'none' } }}>
                    <Newsletter />
                </Box>
            </Box>


        </Box> : <UiLoader />}


    </UiContainer >
}