import { Box, Typography } from "@mui/material";
import React from "react";
import { fontSizes } from "../../utils/sizes";
import UiSpacer from "../UiSpacer";
import UiText from '../UiText'

type Props = {
    id: string,
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
    return <Box sx={{
        display: 'flex', flexDirection: flex ? 'row' : 'column', width: { xs: '100%', md: width || '100%' },
        mb: 2, overflow: 'hidden', cursor: 'pointer', ":hover": { backgroundColor: '#33333330' }, borderRadius: '16px'
    }}>
        {/* image */}
        <Box sx={{ width: { xs: '100%', md: '100%' }, height: { xs: '100px', md: '130px', lg: '160px' } }}>
            <img src={image} style={{ height: '100%', width: '100%' }} />
        </Box>

        <UiSpacer direction={flex ? "horizontal" : "vertical"} size={flex ? "small" : "small"} />

        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', py: 1, px: { md: 1 } }}>
            {/* Author and date */}
            <UiText size='small' fontFamily='inter' fontWeight={500} value={`${author}, ${date}`}
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
                fontWeight={400} value={introduction}
                color='text.secondary'
            />

            <UiSpacer direction={"vertical"} size={"small"} />

            {/* Categories */}
            <Box sx={{ display: 'flex', alignItems: 'center', }}>
                {categories.map((category, index) => {
                    return <Typography key={index} sx={{
                        bgcolor: `${category.color}10`, color: category.color, fontSize: fontSizes.tiny,
                        fontFamily: 'inter', mr: 1, px: 1, py: .5, borderRadius: '4px', textTransform: 'capitalize',
                        fontWeight: 600
                    }}>
                        {category.value}
                    </Typography>
                })}
            </Box>
        </Box>
    </Box>
}