import { Box, IconButton, Slide } from "@mui/material";
import Modal from "@mui/material/Modal";
import UiText from '@/components/UiText'
import { variables } from '@/utils/variables'
import React from "react";
import UiButton from "../UiButton";
import UiSpacer from "../UiSpacer";
import DarkModeButton from "../DarkModeButton";
import { Close } from "@mui/icons-material";
import { MenuOptions } from "@/utils/types";

/* type MenuOptions = {
    id: string,
    label: string,
    path: string,
    children?: {
        id: string,
        label: string,
        path: string,
    }[]
}[] */


type Props = {
    open: boolean,
    handleClose: () => void,
    menuItems: MenuOptions,
    selectedMenu: string,
    excludeDarkmode?: boolean,
    handleItemClick: ({ id, path }: { id: string, path: string }) => void,
    isDarkMode: boolean,
    title?: string,
    toggleDarkMode?: () => void
}


export default function UiSideNavigation({ open, handleClose, selectedMenu, isDarkMode, toggleDarkMode = () => { },
    menuItems, handleItemClick, excludeDarkmode, title = variables.siteName }: Props) {
    return open && <Modal open={open} onClose={handleClose} sx={{ display: { md: 'none' } }}>
        <Slide direction="right" mountOnEnter unmountOnExit in={true}>
            <Box sx={{
                display: 'flex', flexDirection: 'column', px: 2, width: '70vw', alignItems: 'flex-start',
                backgroundColor: 'background.default', height: '100vh', overflowY: 'auto',
            }}>
                <UiSpacer direction="vertical" size='large' />

                {/* Site name */}
                <UiText textAlign="center" size="extra" color='text.primary' value={title}
                    fontFamily="inter" fontWeight={700}
                />

                <UiSpacer direction="vertical" size='medium' />

                {/* Menu items */}
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                    {menuItems.map((item, index) => {
                        return <UiButton key={index} href={item.path}
                            size="large"
                            value={item.label} fontFamily="inter" textAlign="left"
                            variant="text" color="text.primary"
                            fontWeight={selectedMenu === item.path ? 700 : 400}
                            handleClick={() => { handleItemClick({ id: item.id, path: item.path }) }} />
                    })}
                </Box>

                {/* Darkmode button */}
                {!excludeDarkmode && <Box sx={{ display: 'flex', justifyContent: 'center', maxWidth: '100%', pt: 2 }}>
                    <DarkModeButton isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
                </Box>}

                <Box sx={{ flexGrow: 1 }} />

                <IconButton onClick={handleClose} sx={{ mb: 2 }}>
                    <Close sx={{ color: 'text.primary' }} />
                </IconButton>
            </Box>
        </Slide>
    </Modal >
}