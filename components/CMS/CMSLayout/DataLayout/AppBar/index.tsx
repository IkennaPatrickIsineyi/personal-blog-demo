'use client'

import SearchBox from "@/components/CMS/SearchBox";
import UiText from "@/components/UiText";
import { MenuOptions } from "@/utils/types";
import { variables } from "@/utils/variables";
import { Box, IconButton } from "@mui/material";
import { useState } from "react";
import { MenuIcon } from "@/public/icons/icons"
import UiSideNavigation from "@/components/UiSideNavigation";
import { usePathname } from "next/navigation";

type Props = {
    menuItems: MenuOptions,
}

export default function AppBar({ menuItems }: Props) {
    const [showMenu, setShowMenu] = useState(false);

    const closeMenu = () => {
        setShowMenu(false)
    }

    const openMenu = () => {
        setShowMenu(true)
    }

    const currentPath = `/${usePathname().split('/')[2]}`

    const pathMapping: { [key: string]: string } = {
        '/': '/',
        '/blog': '/cms/blog',
        '/projects': '/cms/projects',
        '/admin': '/cms/admin',
        '/about': '/cms/about',
        '/subscribers': '/cms/subscribers'
    }

    const handleClick = () => {
        setShowMenu(false)
    }

    return <Box sx={{
        display: 'flex', alignItems: 'center', maxWidth: '100%', px: 2, py: { xs: .5, sm: 1 }, borderBottom: '1px solid rgba(14, 30, 37, 0.12)',
        boxShadow: 'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px'
    }}>
        {/* Site name */}
        <UiText value={variables.cmsName} size="large" color="text.primary" fontWeight={800} />

        <Box sx={{ flexGrow: 1 }} />
        {/* Search box */}
        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <SearchBox />
        </Box>

        {/* Side menu button for mobile */}
        <IconButton sx={{ display: { md: 'none' } }} onClick={openMenu}>
            <MenuIcon />
        </IconButton>

        <UiSideNavigation
            open={showMenu}
            selectedMenu={pathMapping[currentPath]}
            isDarkMode={false}
            title={variables.cmsName}
            handleItemClick={handleClick}
            excludeDarkmode
            handleClose={closeMenu}
            menuItems={menuItems}
        />

    </Box>
}