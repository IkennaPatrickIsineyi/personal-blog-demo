import UiSpacer from "@/components/UiSpacer";
import UiText from "@/components/UiText";
import { variables } from "@/utils/variables";
import { West } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

type Props = {
    children: React.ReactNode,
    heading: string,
    instruction: string,
    includeBackButton?: boolean
}

export default function AuthLayout({ children, includeBackButton, heading, instruction }: Props) {
    const router = useRouter();

    const goBack = () => {
        router.back()
    }

    return <Box sx={{
        display: 'flex', maxWidth: '100%', height: '100vh', overflowY: 'auto',
        flexDirection: { xs: 'column', sm: 'row' }
    }}>
        {/* Description */}
        <Box sx={{
            display: 'flex', flexDirection: 'column', width: { xs: '100vw', sm: '40vw', md: '50vw' },
            justifyContent: 'center', height: '100vh', position: 'relative', alignItems: 'center',
            backgroundImage: `url(/images/cms-background.png)`, backgroundRepeat: 'no-repeat', backgroundSize: '100% 100%'
        }}>
            {/* Overlay */}
            <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, background: '#33333310' }}></div>

            {/* Site name */}
            <Typography sx={{ fontSize: { xs: 20, sm: 26, lg: 34 }, textAlign: 'center', fontWeight: 800, fontFamily: 'inter' }}>
                {variables.siteName}
            </Typography>

            <UiSpacer direction="vertical" size='medium' />

            {/* Description */}
            <Typography sx={{
                fontSize: { xs: 14, lg: 18 }, textAlign: 'center', fontWeight: 800,
                fontFamily: 'inter'
            }}>
                {variables.siteName}
            </Typography>
        </Box>

        {/* Children */}
        <Box sx={{
            display: 'flex', flexDirection: 'column', width: { xs: '100vw', sm: '60vw', md: '50vw' },
            justifyContent: 'center', height: '100vh', alignItems: 'center', position: 'relative'
        }}>

            {includeBackButton && <IconButton onClick={goBack} sx={{
                position: 'absolute', top: 20, left: 20
            }}>
                <West />
            </IconButton>}


            {/* Heading */}
            <UiText value={heading} size="extra" fontWeight={800} textAlign="center" />
            <UiSpacer direction="vertical" size="xsmall" />

            {/* Instruction */}
            <UiText value={instruction} size="small" textAlign="center" fontWeight={600}
                sx={{ maxWidth: { xs: '80%', sm: '70%', md: '50%' } }} />
            <UiSpacer direction="vertical" size="small" />

            {children}
        </Box>
    </Box>
}