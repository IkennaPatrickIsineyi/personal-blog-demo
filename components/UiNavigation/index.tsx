import { Box, Button, IconButton } from "@mui/material"
import React, { useState } from "react"
import { navigationStyle } from "./style"
import UiButton from "../UiButton"
import UiSideNavigation from '@/components/UiSideNavigation'
import { MenuIcon } from "@/public/icons/icons"
import { usePathname } from "next/navigation"

type MenuOptions = {
    id: string,
    label: string,
    path: string,
    children?: {
        id: string,
        label: string,
        path: string,
    }[]
}[]

type Props = {
    menuItems: MenuOptions,
    isDarkMode: boolean,
    toggleDarkMode: () => void
}

type HandleClickProps = {
    id: string,
    path: string
}

/* const menuItems = [
    { id: '', label: '', path: '', children: [] }
] */

export default function UiNavigation({ menuItems, isDarkMode, toggleDarkMode }: Props) {
    const [openMenu, setOpenMenu] = useState(false)

    const handleClick = ({ id, path }: HandleClickProps): void => {
        setOpenMenu(false)
    }

    const handleOpenMenu = () => {
        setOpenMenu(true)
    }

    const handleCloseMenu = () => {
        setOpenMenu(false)
    }

    const currentPath = `/${usePathname().split('/')[1]}`

    const pathMapping: { [key: string]: string } = {
        '/': '/',
        '/post': '/',
        '/projects': '/projects',
        '/project': '/projects',
        '/newsletter': '/newsletter',
        '/about': '/about'
    }


    console.log('current path', currentPath);

    return <Box sx={navigationStyle.container}>
        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            {menuItems.map((item, index) => {
                return <UiButton key={index} href={item.path}
                    size="large" padding="narrow" margin="spaced" //fontWeight={500}
                    value={item.label} fontFamily="inter" fontWeight={pathMapping[currentPath] === item.path ? 700 : 400}
                    variant="text" color="text.primary"
                    handleClick={() => { handleClick({ id: item.id, path: item.path }) }} />
            })}
        </Box>

        <IconButton sx={{ display: { md: 'none' } }} onClick={handleOpenMenu}>
            <MenuIcon />
        </IconButton>

        <UiSideNavigation
            open={openMenu}
            selectedMenu={pathMapping[currentPath]}
            isDarkMode={isDarkMode}
            toggleDarkMode={toggleDarkMode}
            handleItemClick={handleClick}
            handleClose={handleCloseMenu}
            menuItems={menuItems}
        />
    </Box>
}