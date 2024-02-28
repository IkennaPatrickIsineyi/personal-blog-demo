import { Box, CircularProgress } from "@mui/material";
import React from "react";

export default function UiLoader() {
    return <Box sx={{ display: 'flex', alignItems: 'center', mt: 3, justifyContent: 'center', maxWidth: '100%' }}>
        <CircularProgress />
    </Box>
}