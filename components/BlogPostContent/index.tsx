'use client'

import { BlogPostType } from "@/utils/types"
import { Box, CircularProgress, Typography } from "@mui/material"
import UiContainer from "../UiContainer"
import UiText from "../UiText"
import moment from "moment"
import { fontSizes } from "@/utils/sizes"
import BlogPostSummary from "../BlogPostSummary"
import UiSpacer from "../UiSpacer"
import { useEffect, useState } from "react"
import { postContentSample, recentPostSample } from "./sampleData"
import { useSearchParams } from "next/navigation"
import UiLoader from '@/components/UiLoader'
import Newsletter from "../Newsletter"

type DataType = {
    content: string,
    date: string,
    title: string,
    categories: {
        value: string, color: string
    }[],
    recentPosts: BlogPostType
}

export default function BlogPostContent(/* { content, recentPosts, title, categories, date }: Props */) {
    const [data, setData] = useState<DataType>({ content: '', date: '', title: '', categories: [], recentPosts: [] });

    //Get Id of the post
    const postId = useSearchParams().get('id');

    useEffect(() => {
        //Get the post content, title, date, categories,recent posts
        setData({
            content: postContentSample,
            date: '2024/01/24',
            title: 'Grid system for better Design User Interface',
            categories: [
                { value: 'design', color: '#6941C6', },
                { value: 'research', color: '#3538CD' }
            ],
            recentPosts: recentPostSample
        })
    }, [])

    return <UiContainer size="large">
        {data.content ? <Box sx={{
            display: 'flex', alignItems: 'flex-start', justifyContent: { md: 'space-between' },
            flexDirection: { xs: 'column', md: 'row-reverse' }
        }}>
            {/* Post content */}
            <Box sx={{ display: 'flex', flexDirection: 'column', maxWidth: { xs: '100%', md: '60%', lg: '70%' } }}>
                {/* date */}
                <UiText size='small' fontFamily='inter' fontWeight={500}
                    value={moment(data.date).format('ddd, Do MMM yyyy').toString()}
                    color='#6941C6'
                />

                <UiSpacer direction="vertical" size='small' />

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

            {/* Recent posts */}
            <Box sx={{
                display: 'flex', flexDirection: { xs: 'column', }, width: { xs: '100%', md: '35%', lg: '25%' },
            }}>
                <UiText size='large' fontFamily='inter' fontWeight={700} value={'Recent blog posts'}
                    color='text.primary'
                />

                <UiSpacer direction="vertical" size='small' />

                {/* Posts */}
                <Box sx={{
                    display: 'flex', flexDirection: { xs: 'column', sm: 'row', md: 'column' }, flexWrap: 'wrap',
                    width: '100%',
                }}>
                    {data.recentPosts.map((post, index) => {
                        return (
                            <Box key={index} sx={{ mr: { sm: 1, md: 1.5, lg: 2 } }}>
                                <BlogPostSummary key={index} {...{
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