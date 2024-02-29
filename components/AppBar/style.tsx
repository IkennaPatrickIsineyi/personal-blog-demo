import { spacing } from "@/utils/sizes";
import { SxProps } from "@mui/material";

type PropKeys = {
    container: SxProps,
};

export const appbarStyle: PropKeys = {
    container: {
        backgroundColor: 'background.default',
        color: 'text.primary',
        display: 'flex',
        alignItems: 'center',
        py: spacing.small,
        /*   px: spacing.medium,
          py: spacing.normal */
    },
}