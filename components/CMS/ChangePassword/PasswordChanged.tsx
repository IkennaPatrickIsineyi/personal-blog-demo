import UiButton from "@/components/UiButton";
import UiSpacer from "@/components/UiSpacer";
import UiText from "@/components/UiText";
import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";

export default function PasswordChanged() {
    const router = useRouter();
    const goToLogin = () => {
        router.replace('/');
    }

    return <Box>
        <UiText value={'Your password has been changed.'} size="normal" />
        <UiSpacer direction="vertical" size="medium" />
        <UiButton value={'Login'} size="small" handleClick={goToLogin} variant="contained" />
    </Box>
}