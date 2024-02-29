'use client'

import { Box, ThemeProvider } from "@mui/material"
import React, { useEffect, useState } from "react"
import { theme } from "./theme"
import { layoutStyle } from "./style"
import AppBar from "../AppBar"
import Footer from '../Footer'
import UiSpacer from "../UiSpacer"

type LayoutType = {
    children: React.ReactNode
}

export default function Layout({ children }: LayoutType) {
    const [state, setState] = useState({
        darkMode: false, cms: false, isMobile: false, menuOpen: false
    });

    useEffect(() => {
        updateState({
            isMobile: window.innerWidth < 900,
            darkMode: localStorage.getItem('theme') === 'dark' ? true : false
        })
    }, [])

    const toggleDarkMode = () => {
        const newMode = state.darkMode ? 'light' : 'dark'
        localStorage.setItem('theme', newMode)
        updateState({ darkMode: newMode === 'dark' })
    }


    const updateState = (newValue: any) => {
        setState((previousValue) => { return { ...previousValue, ...newValue } });
    }


    return <ThemeProvider theme={theme({ darkMode: state.darkMode })}>
        <Box sx={layoutStyle.container}>
            <AppBar isDarkMode={state.darkMode} toggleDarkMode={toggleDarkMode} />
            <UiSpacer direction="vertical" size="small" />
            {children}
            <UiSpacer direction="vertical" size="medium" />
            <Footer />
        </Box>
    </ThemeProvider>
}