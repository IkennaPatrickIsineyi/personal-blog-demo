import { Box, Typography } from "@mui/material";
import React from "react";
import { fontSizes } from "../../utils/sizes";
import UiSpacer from "../UiSpacer";
import UiText from '../UiText'
import moment from "moment";
import { useRouter } from "next/navigation";

type Props = {
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
    flex: boolean,
    fullwidth: boolean,
    headliner: boolean,
    width?: string
}

export default function BlogPostSummary({ id, image, headliner, date, author, title, introduction, categories,
    flex, fullwidth, width }: Props) {
    const router = useRouter();

    const handleClick = ({ id }: { id: number | string }) => {
        router.push(`/post?id=${id}`)
    }

    return <a href={`${process.env.NEXT_PUBLIC_SITEURL}/post?id=${id}`} style={{ textDecoration: 'none' }}>
        <Box sx={{
            display: 'flex', flexDirection: flex ? 'row' : 'column', width: { xs: '100%', sm: width || '100%' },
            mb: 3, overflow: 'hidden', cursor: 'pointer', alignItems: 'flex-start', ":hover": {
                backgroundColor: '#33333330',
                boxShadow: 'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px'
            }, borderRadius: '16px'
        }}/*  onClick={() => { handleClick({ id }) }} */>
            {/* image */}
            <Box sx={{
                width: { xs: '100%', md: '100%' }, height: { xs: 'auto' },
            }}>
                <img src={image} style={{ height: '100%', width: '100%', objectFit: 'contain' }} />
            </Box>

            <UiSpacer direction={flex ? "horizontal" : "vertical"} size={flex ? "small" : "small"} />

            <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', px: { md: 1 }, pb: 1.5 }}>
                {/* Author and date */}
                <UiText size='small' fontFamily='inter' fontWeight={500}
                    value={`${author}, ${moment(date).format('Do MMM yyyy').toString()}`}
                    color='#6941C6'
                />

                <UiSpacer direction={"vertical"} size={"xsmall"} />

                {/* Title */}
                <UiText size={headliner ? 'extra' : 'large'} fontFamily='inter'
                    fontWeight={700} value={title}
                    color='text.primary'
                />

                <UiSpacer direction={"vertical"} size={"xsmall"} />

                {/* Introduction */}
                <UiText size={headliner ? 'normal' : 'medium'} fontFamily='inter'
                    fontWeight={400} value={introduction} maxLines={2}
                    color='text.secondary'
                />

                <UiSpacer direction={"vertical"} size={"small"} />

                {/* Categories */}
                <Box sx={{ display: 'flex', alignItems: 'center', }}>
                    {categories.map((category, index) => {
                        return <Typography key={index} sx={{
                            bgcolor: `${category.color}10`, color: category.color, fontSize: fontSizes.small,
                            fontFamily: 'inter', mr: 1, px: 1, py: .5, borderRadius: '8px', textTransform: 'capitalize',
                            fontWeight: 600
                        }}>
                            {category.value}
                        </Typography>
                    })}
                </Box>
            </Box>
        </Box>
    </a>

}