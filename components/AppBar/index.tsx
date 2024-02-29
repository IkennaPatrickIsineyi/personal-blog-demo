import { Box } from "@mui/material";
import UiText from '@/components/UiText'
import UiNavigation from '@/components/UiNavigation'
import DarkModeButton from '@/components/DarkModeButton'
import { variables } from '@/utils/variables'
import { appbarStyle } from './style'
import UiContainer from "../UiContainer";

type Props = {
    toggleDarkMode: () => void,
    isDarkMode: boolean
}

type MenuItemsOptions = {
    id: string,
    label: string,
    path: string,
    children?: {
        id: string,
        label: string,
        path: string,
    }[]
}[]

const menuItems: MenuItemsOptions = [
    { id: 'blog', label: 'Blog', path: '/', },
    { id: 'projects', label: 'Projects', path: '/projects', },
    { id: 'about', label: 'About', path: '/about', },
    { id: 'newsletter', label: 'Newsletter', path: '/newsletter', },
]

export default function AppBar({ toggleDarkMode, isDarkMode }: Props) {
    return <Box sx={{ position: 'sticky', top: 0, zIndex: 2323, width: '100%', backgroundColor: 'background.default' }}>
        <UiContainer size="large" sx={{}}>
            <Box sx={appbarStyle.container}>
                {/* Site name */}
                <a href={process.env.NEXT_PUBLIC_SITEURL} style={{ textDecoration: 'none' }}>
                    <UiText size="extra" value={variables.siteName} color='text.primary'
                        fontFamily="inter" fontWeight={700}
                    />
                </a>

                <Box sx={{ flexGrow: 1 }} />

                {/* Navigation */}
                <UiNavigation menuItems={menuItems} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

                {/* Darkmode button */}
                <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                    <DarkModeButton isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
                </Box>
            </Box>
        </UiContainer>
    </Box>
}