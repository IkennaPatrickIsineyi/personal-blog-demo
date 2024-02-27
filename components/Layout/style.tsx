import { spacing } from "@/utils/sizes";
import { SxProps } from "@mui/material";

type PropKeys = {
    container: SxProps,
};

export const layoutStyle: PropKeys = {
    container: {
        backgroundColor: 'background.default',
        color: 'text.primary',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        overflowY: 'auto'
    },
}