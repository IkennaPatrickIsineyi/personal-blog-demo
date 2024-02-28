import { fontFamilies } from "@/utils/variables";
import { SxProps } from "@mui/material";

type PropKeys = {
    container: SxProps,
};

export const uiTextBannerStyle: PropKeys = {
    container: {
        fontSize: { xs: 40, sm: 60, md: 140, lg: 180, xl: 230 }, px: { xs: 1, lg: 0 }, borderTop: '1px solid ',
        mx: { xs: 0, md: 4, lg: 12 },/*  py: { xs: .5, md: 1, lg: 1 }, */ borderBottom: '1px solid ',
       /*  my: { xs: 1, lg: 4 }, */ lineHeight: { lg: '240px' },
        textTransform: 'uppercase', fontWeight: 700, fontFamily: 'inter', textAlign: 'center',
    }
}