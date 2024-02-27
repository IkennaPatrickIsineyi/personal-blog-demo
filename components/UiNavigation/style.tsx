import { SxProps } from "@mui/material";

type PropKeys = {
    container: SxProps,
};

export const navigationStyle: PropKeys = {
    container: {
        backgroundColor: 'background.default',
        color: 'text.primary',
        display: 'flex',
        alignItems: 'center'
    },
}