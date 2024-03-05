import { Box, SxProps } from "@mui/material";
import React from "react";

type Props = {
    size: 'small' | 'medium' | 'large',
    children: React.JSX.Element,
    sx?: SxProps
}

const paddingSizes = {
    small: { xs: .5, md: 1 },
    medium: { xs: 2, md: 1.5, lg: 2 },
    large: { xs: 2, sm: 4, md: 4, lg: 12 }
}

export default function UiContainer({ size, children, sx }: Props) {
    return <Box sx={{ px: paddingSizes[size], ...sx }}>
        {children}
    </Box>
}