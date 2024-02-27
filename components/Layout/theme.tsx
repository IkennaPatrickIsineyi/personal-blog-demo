import { Theme } from "@emotion/react"
import { createTheme } from "@mui/material"
import { useMemo } from "react"

type ThemeType = {
    darkMode: boolean
}

export const theme = ({ darkMode }: ThemeType): Theme => useMemo(() => {
    return createTheme({
        typography: {
            button: {
                textTransform: 'none',
            },
            fontFamily: 'Manrope'
        },
        palette: {
            mode: darkMode ? 'dark' : 'light',
            primary: { main: '#1A1A1A' },
            secondary: { main: '#667085' }
        },
        components: {
            MuiButton: {
                styleOverrides: {
                    contained: {
                        backgroundColor: '#0E60BF',
                        color: 'white',
                        '&:hover': {
                            backgroundColor: darkMode ? '#FFFFFF50' : '#1A1A1A50',
                            color: 'black'
                        }
                    },
                    text: {
                        color: '#0E60BF',
                        '&:hover': {
                            backgroundColor: darkMode ? '#FFFFFF50' : '#1A1A1A50',
                            color: 'white'
                        }

                    }
                }
            },
            MuiListItemButton: {
                styleOverrides: {
                    root: {
                        color: 'black',
                        '&.Mui-selected': {
                            borderRight: '2px solid #0E60BF',
                            color: '#0E60BF'
                        }
                    }
                }
            }
        }
    })
}, [darkMode])