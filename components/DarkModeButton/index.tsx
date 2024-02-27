import { Button, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Moon, Sun } from "../../public/icons/icons";
import { Circle } from "@mui/icons-material";

type Props = {
    toggleDarkMode: () => void,
    isDarkMode: boolean
}

export default function DarkModeButton({ toggleDarkMode, isDarkMode }: Props) {
    const [darkMode, setDarkMode] = useState(false);
    // const isDarkMode = localStorage.getItem('theme') === 'dark'

    useEffect(() => {
        setDarkMode(isDarkMode)
    }, [isDarkMode])

    return <Button onClick={toggleDarkMode} sx={{
        flexDirection: darkMode ? 'row-reverse' : 'row', display: 'flex', borderRadius: '18px',
        ":hover": { background: darkMode ? '#FFFFFF90' : '#33333390' }, maxWidth: 'max-content',
        bgcolor: darkMode ? 'white' : 'black', px: 1, py: .5, color: darkMode ? 'black' : 'white'
    }}>
        <Circle sx={{ color: darkMode ? 'black' : 'white', mx: 1, fontSize: 20 }} />
        {darkMode ? <Sun /> : <Moon />}
    </Button>
}