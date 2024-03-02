import { Box } from "@mui/material";
import UiText from "../UiText";
import UiSpacer from "../UiSpacer";

type Props = {
    error: string | null | undefined,
    success: string | null | undefined
}
export default function FormMessage({ error, success }: Props) {
    return <Box>
        {error && <UiText value={error} size="small" color="red" />}

        {error && <UiSpacer direction="vertical" size="medium" />}

        {success && <UiText value={success} size="small" color="green" />}

        {success && <UiSpacer direction="vertical" size="medium" />}
    </Box>
}