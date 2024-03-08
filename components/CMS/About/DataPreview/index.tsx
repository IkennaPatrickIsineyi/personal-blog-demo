import UiSpacer from "@/components/UiSpacer";
import UiText from "@/components/UiText";
import { markdownToHtml } from "@/utils/markdownToHtml";
import { Close } from "@mui/icons-material";
import { Box, IconButton, Modal, Slide } from "@mui/material";
import { useEffect, useState } from "react";

type Props = {
    open: boolean,
    handleClose: () => void,
    image?: string,
    experience: string,
    education: string,
    skills: string,
    about: string,
}

type DataType = {
    image?: string,
    experience: string,
    education: string,
    skills: string,
    about: string,
}

export default function DataPreview({ open, image, experience, education, skills, about, handleClose }: Props) {
    const [html, setHtml] = useState<DataType>({ experience: '', education: '', skills: '', about: '' });

    const updateHtml = (newValue: {}) => {
        setHtml((value) => {
            return { ...value, ...newValue }
        })
    }

    useEffect(() => {
        markdownToHtml(experience).then((res: string) => updateHtml({ experience: res }), err => console.log)
        markdownToHtml(education).then((res: string) => updateHtml({ education: res }), err => console.log)
        markdownToHtml(skills).then((res: string) => updateHtml({ skills: res }), err => console.log)
        markdownToHtml(about).then((res: string) => updateHtml({ about: res }), err => console.log)
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
                    <UiText value={'About Preview'} fontWeight={700} size="large" />
                </Box>

                {/* Content */}
                <Box sx={{
                    mx: 'auto', px: 2, my: 2, boxShadow: 'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px',
                    width: { xs: '90%', sm: '90%', md: '70%', lg: '70%' }
                }}>
                    {/* Image */}
                    <Box sx={{ height: 'auto', width: '100%', pt: 2 }}>
                        <img src={image} style={{ height: '100%', width: '100%', objectFit: 'contain' }} />
                    </Box>


                    <UiSpacer direction="vertical" size="large" />

                    {/* About me heading*/}
                    <UiText value={'About Me'} size="large" color="text.primary" fontWeight={700} />

                    <UiSpacer direction="vertical" size="xsmall" />

                    {/* About me value */}
                    <UiText value={html?.about || ''} isHtml size="normal" color="text.secondary" />

                    <UiSpacer direction="vertical" size="large" />

                    {/* Skills heading*/}
                    <UiText value={'Skills'} size="large" color="text.primary" fontWeight={700} />


                    {/* Skills value */}
                    <UiText value={html?.skills || ''} isHtml size="normal" color="text.secondary" />

                    <UiSpacer direction="vertical" size="large" />

                    {/* Experience heading*/}
                    <UiText value={'Experience'} size="large" color="text.primary" fontWeight={700} />

                    {/* Experience value */}
                    <UiText value={html?.experience || ''} isHtml size="normal" color="text.secondary" />

                    <UiSpacer direction="vertical" size="large" />

                    {/* Education heading*/}
                    <UiText value={'Education'} size="large" color="text.primary" fontWeight={700} />

                    {/* Education value */}
                    <UiText value={html?.education || ''} isHtml size="normal" color="text.secondary" />

                    <UiSpacer direction="vertical" size="large" />
                </Box>
            </Box>
        </Slide>
    </Modal>
}