import { Box } from "@mui/material";
import { useState } from "react";
import UiText from "../UiText";
import UiButton from "../UiButton";
import { KeyboardArrowDown, KeyboardArrowLeft, KeyboardArrowRight, KeyboardArrowUp } from "@mui/icons-material";

type Props = {
    children: React.JSX.Element,
    title: string,
}

export default function CollapseContainer({ children, title }: Props) {
    const [open, setOpen] = useState(true);

    const toggleOpen = () => {
        setOpen(!open)
    }

    return <Box sx={{
        display: 'flex', flexDirection: 'column', width: '90%', borderRadius: '16px', px: 2, py: 1,
        boxShadow: 'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px'
    }}>
        <Box sx={{
            display: 'flex', alignItems: 'center', maxWidth: '100%', justifyContent: 'space-between',
            borderBottom: open ? '1px solid #33333350' : 'none', mb: open ? 2 : 0
        }}>
            {/* Title */}
            <UiText value={title || ''} size='large' color="primary.main" fontWeight={700} />

            {/* Togglebutton */}
            <UiButton letterCase="capitalize" variant="text" value={open ? 'Close' : 'Open'} handleClick={toggleOpen}
                rightIcon={open ? <KeyboardArrowDown /> : <KeyboardArrowUp />} size="small" />
        </Box>

        {open && children}
    </Box>
}