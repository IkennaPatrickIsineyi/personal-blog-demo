'use client'

import { Box, IconButton, Typography } from "@mui/material";
import React, { useState } from "react";
import { fontSizes } from "../../utils/sizes";
import UiSpacer from "../UiSpacer";
import UiText from '../UiText'
import moment from "moment";
import { useRouter } from "next/navigation";
import { Delete, Edit } from "@mui/icons-material";
import { useApi } from "@/services/api";
import UiLoader from "../UiLoader";

type Props = {
    id: string | number,
    image?: string,
    title: string,
    introduction: string,
    slug?: string,
    categories: {
        value: string,
        color: string
    }[],
    flex: boolean,
    fullwidth: boolean,
    cms?: boolean,
    editable?: boolean,
    headliner: boolean,
    width?: string
}

export default function ProjectSummary({ id, image, headliner, title, introduction, categories,
    flex, fullwidth, width, slug, editable = false, cms = false }: Props) {
    const router = useRouter();

    const [showActionRow, setShowActionRow] = useState<boolean>(false)

    const { request, error, processing } = useApi()

    const onMouseOut = () => {
        setShowActionRow(false)
    }
    const onMouseIn = () => {
        setShowActionRow(true)
    }

    const handleEditClick = (e: React.MouseEvent) => {
        e.stopPropagation()
    }

    const handleDelete = async (e: React.MouseEvent) => {
        e.stopPropagation()
        const { data } = await request({ method: 'DELETE', url: `/api/project/delete?slug=${slug}` });

        if (data) {
            console.log('post deleted');
            window.location.reload();
        }
    }

    return <a href={cms ? '' : `${process.env.NEXT_PUBLIC_SITEURL}/project?slug=${slug}`} style={{ textDecoration: 'none' }}>
        <Box sx={{
            display: 'flex', flexDirection: flex ? 'row' : 'column', width: { xs: '100%', sm: width || '100%' },
            mb: 3, overflow: 'hidden', cursor: 'pointer', alignItems: 'flex-start', ":hover": {
                backgroundColor: '#33333330',
                boxShadow: 'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px'
            }, borderRadius: '16px', position: 'relative'
        }} onMouseEnter={onMouseIn} onMouseLeave={onMouseOut}>
            {editable && <Box sx={{
                display: showActionRow ? 'flex' : 'none', alignItems: 'center',
                maxWidth: '100%', position: 'absolute', top: 0, left: 0, pl: 2, bgcolor: '#FFFFFF90'
            }}>
                {/* Edit button */}
                <IconButton onClick={handleEditClick} href={`/cms/projects/edit?slug=${slug}`} sx={{ mr: 2, color: 'primary.main' }} >
                    <Edit />
                </IconButton>

                {/* Delete button */}
                <IconButton sx={{ mr: 1, color: 'primary.main' }} onClick={handleDelete}>
                    {processing ? <UiLoader /> : <Delete />}
                </IconButton>
            </Box>}


            {/* image */}
            <Box sx={{
                width: { xs: '100%', md: '100%' }, height: { xs: 'auto' },
            }}>
                <img src={image} style={{ height: '100%', width: '100%', objectFit: 'contain' }} />
            </Box>

            <UiSpacer direction={flex ? "horizontal" : "vertical"} size={flex ? "small" : "small"} />

            <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', px: { xs: 1 }, pb: 1.5 }}>

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