import { Box } from "@mui/material";
import React from "react";

type Props = {
    direction: 'vertical' | 'horizontal',
    size: 'small' | 'medium' | 'large' | 'xsmall'
}

const spacing = {
    xsmall: { xs: .1, md: .3 },
    small: { xs: .5, md: 1 },
    medium: { xs: 1, md: 1.5 },
    large: { xs: 1.5, md: 2, lg: 4 }
}

export default function UiSpacer({ direction, size }: Props) {
    return <Box sx={{
        mx: direction === 'vertical' ? 0 : spacing[size],
        my: direction === 'horizontal' ? 0 : spacing[size]
    }} />
}