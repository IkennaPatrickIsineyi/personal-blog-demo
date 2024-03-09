'use client'

import { Box } from "@mui/material";
import React from "react";
import AppBar from "./AppBar";
import UiButton from "@/components/UiButton";
import { usePathname } from "next/navigation";
import { useApi } from "@/services/api";

type Props = {
    pageName: string,
    id: string,
    children: React.JSX.Element
}

const menuItems = [
    { id: 'blog', label: 'Blog', path: '/cms/blog' },
    { id: 'projects', label: 'Projects', path: '/cms/projects' },
    { id: 'about', label: 'About', path: '/cms/about' },
    { id: 'admin', label: 'Admin', path: '/cms/admin' },
    { id: 'subscribers', label: 'Subscribers', path: '/cms/subscribers' },
]

export default function DataLayout({ pageName, id, children }: Props) {
    const { request, processing } = useApi();

    const currentPath = `/${usePathname().split('/')[2]}`

    const pathMapping: { [key: string]: string } = {
        '/': '/',
        '/blog': '/cms/blog',
        '/projects': '/cms/projects',
        '/admin': '/cms/admin',
        '/about': '/cms/about',
        '/subscribers': '/cms/subscribers'
    }

    const handleLogout = async () => {
        const res = await request({ method: 'GET', url: '/api/sign-out' })

        if (res?.data) {
            window.location.replace('/cms')
        }
    }

    return <Box sx={{ display: 'flex', flexDirection: 'column', maxHeight: '100vh', overflowY: 'hidden' }}>
        {/* App bar */}
        <AppBar menuItems={menuItems} />

        {/* side navigation menu and children */}
        <Box sx={{
            display: 'flex', maxWidth: '100%', flexDirection: { xs: 'column', md: 'row' },
            height: 'calc(100vh - 47px)', overflowY: 'hidden'
        }}>
            {/* Side navigation */}
            <Box sx={{
                width: { md: '20vw', lg: '15vw' }, bgcolor: 'primary.main', display: { xs: 'none', md: 'flex' },
                flexDirection: 'column', height: '100%', overflowY: 'auto', alignItems: 'flex-start'
            }}>
                {menuItems.map((item, index) => {
                    return <UiButton key={index} href={item.path}
                        size="normal" fullWidth
                        value={item.label} fontFamily="inter" textAlign="left"
                        variant="text" color="white" hoverBgColor="black"
                        fontWeight={pathMapping[currentPath] === item.path ? 700 : 400}
                        handleClick={() => { }}
                    />
                })}

                {/* Log out button */}
                <Box sx={{ mt: 'auto', width: '100%' }}>
                    <UiButton size="normal"
                        value={'Log out'} fontFamily="inter" textAlign="left"
                        variant="text" color="white" fullWidth
                        fontWeight={400} hoverBgColor="black"
                        handleClick={handleLogout}
                    />
                </Box>

            </Box>

            {/* Children */}
            <Box sx={{
                width: { xs: '100%', md: '80vw', lg: '85vw' }, bgcolor: 'white', height: '100%',
                overflowY: 'auto'
            }}>
                {children}
            </Box>
        </Box>
    </Box>
}