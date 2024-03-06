import UiText from "@/components/UiText";
import { markdownToHtml } from "@/utils/markdownToHtml";
import { Close } from "@mui/icons-material";
import { Box, IconButton, Modal, Slide } from "@mui/material";
import { useEffect, useState } from "react";

type Props = {
    open: boolean,
    handleClose: () => void,
    content: string
}

export default function DataPreview({ open, content, handleClose }: Props) {
    const [html, setHtml] = useState('');

    useEffect(() => {
        markdownToHtml(content).then((res: string) => setHtml(res), err => console.log)
    }, [])

    return open && <Modal open={open} onClose={handleClose} sx={{
        display: 'flex', justifyContent: { xs: 'flex-start', md: 'flex-end' },
        width: '100%'
    }}>
        <Slide direction="left" mountOnEnter unmountOnExit in={true}>
            <Box sx={{
                display: 'flex', flexDirection: 'column', width: { xs: '95vw', md: '70vw', lg: '70vw' },
                alignItems: 'flex-start', backgroundColor: 'background.default', height: '100vh', overflowY: 'auto',
            }}>
                {/* Toolbar */}
                <Box sx={{
                    display: 'flex', alignItems: 'center', py: 1.5, width: '100%', position: 'sticky', top: 0,
                    boxShadow: 'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px',
                    zIndex: 323, bgcolor: 'white'
                }}>
                    {/* Close button */}
                    <IconButton sx={{ mx: 2 }} onClick={handleClose}>
                        <Close />
                    </IconButton>

                    {/* Title */}
                    <UiText value={'Blog Post Preview'} fontWeight={700} size="large" />
                </Box>

                {/* Content */}
                <Box dangerouslySetInnerHTML={{ __html: html }}
                    sx={{
                        mx: 'auto', px: 2, my: 2, boxShadow: 'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px',
                        width: { xs: '90%', sm: '90%', md: '70%', lg: '70%' }
                    }} >
                </Box>
            </Box>
        </Slide>
    </Modal>
}