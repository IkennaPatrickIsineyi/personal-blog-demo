import { Button } from "@mui/material";
import React from "react";
import { fontSizes } from "../../utils/sizes";
import UiText from "@/components/UiText";
import { fontFamilies } from "@/utils/variables";

type Props = {
    size: 'small' | 'tiny' | 'normal' | 'medium' | 'large' | 'extra',
    color?: string,
    hoverColor?: string,
    hoverBgColor?: string,
    fontWeight?: number,
    value: string | number,
    variant?: 'contained' | 'text' | 'outlined',
    fontFamily?: typeof fontFamilies,
    padding?: 'narrow' | 'wide',
    margin?: 'tight' | 'spaced'
    textAlign?: 'left' | 'right' | 'center',
    leftIcon?: JSX.Element | 'string',
    fullWidth?: boolean,
    rightIcon?: JSX.Element | 'string',
    href?: string,
    letterCase?: 'uppercase' | 'capitalize' | 'lowercase'
    handleClick?: () => any,
}

export default function UiButton({ size, href, color, variant = 'contained', fontFamily, hoverColor,
    hoverBgColor, letterCase, handleClick = () => { }, leftIcon, rightIcon, fontWeight, value, padding, margin,
    textAlign, fullWidth = false }: Props) {
    return <Button
        variant={variant} href={href}
        sx={{
            fontSize: fontSizes[size], color, textAlign, textTransform: letterCase,
            width: fullWidth ? '100%' : 'max-content', display: 'flex',
            justifyContent: textAlign === 'center' ? 'center' : 'flex-start',
            mx: margin && (margin === 'tight' ? 1 : 2), my: margin === 'spaced' ? 1.5 : .5,
            px: padding && (padding === 'narrow' ? 1 : 2), py: padding === 'narrow' ? .5 : 1,
            ":hover": {
                color: hoverColor,
                background: hoverBgColor
            }
        }}
        onClick={handleClick}>
        {leftIcon}
        <UiText value={value} textAlign={textAlign} fontFamily={fontFamily} size={size} fontWeight={fontWeight} />
        {rightIcon}
    </Button>
}