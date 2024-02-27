import { Box, Typography } from "@mui/material";
import React from "react";
import { uiTextBannerStyle } from './style'

type Props = {
    value: string,
}

export default function UiTextBanner({ value }: Props) {
    return <Typography sx={uiTextBannerStyle.container}>
        {value}
    </Typography>
}