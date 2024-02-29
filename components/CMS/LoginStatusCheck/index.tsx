import UiLoader from "@/components/UiLoader";
import UiSpacer from "@/components/UiSpacer";
import UiText from "@/components/UiText";
import { Box } from "@mui/material";

export default function LoginStatusCheck() {
    return <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <UiLoader />
        <UiSpacer direction="vertical" size="small" />
        <UiText value={'Verifying Login Status...'} size="normal" />
    </Box>
}