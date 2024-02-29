import { SxProps, Typography } from "@mui/material";
import React from "react";
import { fontSizes } from "../../utils/sizes";
import { fontFamilies } from "@/utils/variables";

type Props = {
    size: 'small' | 'tiny' | 'normal' | 'medium' | 'large' | 'extra',
    color?: string,
    textAlign?: 'left' | 'right' | 'center',
    fontWeight?: number,
    fontFamily?: typeof fontFamilies,
    value: string | number,
    maxLines?: number,
    sx?: SxProps
}

export default function UiText({ size, textAlign, sx, color, maxLines, fontWeight, fontFamily, value }: Props) {
    return <Typography sx={{
        fontSize: fontSizes[size], textAlign, fontFamily: fontFamily || 'inter', color, fontWeight, ...sx,
        ...(maxLines ? {
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: maxLines,
            WebkitBoxOrient: 'vertical',
        } : {})
    }}>
        {value}
    </Typography>
}