import { Box } from "@mui/material";
import UiText from "../UiText";

type Props = {
    title: string
}

export default function NoContent({ title }: Props) {
    return <Box sx={{ display: 'flex', maxWidth: '100%', alignItems: 'center', justifyContent: 'center' }}>
        <UiText value={title} size="normal" />
    </Box>
}