import { Typography } from "@mui/material";
import React from "react";
import { fontSizes } from "../../utils/sizes";
import { fontFamilies } from "@/utils/variables";

type Props = {
    size: 'small' | 'tiny' | 'normal' | 'medium' | 'large' | 'extra',
    color?: string,
    textAlign?: 'left' | 'right' | 'center',
    fontWeight?: number,
    fontFamily?: typeof fontFamilies,
    value: string | number
}

export default function UiText({ size, textAlign, color, fontWeight, fontFamily, value }: Props) {
    return <Typography sx={{ fontSize: fontSizes[size], textAlign, fontFamily, color, fontWeight }}>
        {value}
    </Typography>
}