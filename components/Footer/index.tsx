import React from "react";
import UiContainer from "../UiContainer";
import { Box } from "@mui/material";
import { variables } from '../../utils/variables'
import UiText from "../UiText";
import moment from "moment";

const actions = [
    { label: 'Twitter', url: 'https://twitter.com' },
    { label: 'Linkedin', url: 'https://linkedin.com' },
    { label: 'Github', url: 'https://github.com' },
]

export default function Footer() {
    return <UiContainer size="large" sx={{ mt: 'auto', pb: 2 }}>
        <Box sx={{
            display: 'flex', alignItems: { xs: 'center', sm: 'flex-start' }, flexDirection: { xs: 'column-reverse', sm: 'row' },
            flexWrap: 'wrap'
        }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {/* Site name */}
                <a href={process.env.NEXT_PUBLIC_SITEURL} style={{ textDecoration: 'none', marginRight: '8px' }}>
                    <UiText size="normal" value={variables.siteName} color='text.primary'
                        fontFamily="inter" fontWeight={700}
                    />
                </a>

                {/* copyright */}
                <UiText size="normal" value={`© ${moment().format('yyyy').toString()}`} color='text.primary'
                    fontFamily="inter" fontWeight={400} sx={{ mr: 1 }}
                />
            </Box>


            {/* Action buttons */}
            {actions.map((item, index) => {
                return <a key={index} href={item.url} style={{ textDecoration: 'none', marginRight: '8px' }}>
                    <UiText size="normal" value={item.label} color='text.primary'
                        fontFamily="inter" fontWeight={400}
                    />
                </a>
            })}
        </Box>
    </UiContainer>
}