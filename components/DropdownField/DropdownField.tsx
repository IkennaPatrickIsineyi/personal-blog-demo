import { ArrowDropDown, ArrowDropUp, CheckBox, CheckBoxOutlineBlank, } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { FieldHookConfig, useField } from "formik";
import { useEffect, useState } from "react";
import { dropdownFieldStyle, dropdownStyle } from "./style";

type Props = {
    placeholder?: string,
    items: Array<any>,
    selectedItem?: any,
    multiple?: boolean,
    handleChange: (id: any) => void,
    type?: string,
}

export default function DropdownField({ items, placeholder, selectedItem, multiple = false,
    handleChange, ...props }: Props & FieldHookConfig<any>) {
    const [field, meta, helpers] = useField(props);

    const [showOptions, setShowOptions] = useState(false)

    const openMenu = () => {
        setShowOptions(true)
    }

    useEffect(() => {
        const payload = (e: Event) => {
            if (!document?.getElementById('dropdown-in-cms')?.contains(e?.target as Node)) {
                setShowOptions(false)
            }
        }

        showOptions && document.addEventListener('click', payload)

        return () => {
            document.removeEventListener('click', payload)
        }
    }, [showOptions])


    return <Box sx={dropdownFieldStyle.container}>
        {/* Heading */}
        <Box sx={{
            ...dropdownFieldStyle.headingContainer,
            bgcolor: (selectedItem || typeof selectedItem === 'number') ? 'white' : '#F4F4F4',
        }}
            onClick={openMenu}>
            <Typography sx={dropdownStyle.headingLabel}>
                {multiple && (selectedItem?.length > 0 ? `${selectedItem?.length} items selected` : placeholder)}
                {!multiple && ((selectedItem || typeof selectedItem === 'number') ? items?.find(i => i?.value === selectedItem)?.component : placeholder)}
            </Typography>

            <Box sx={{ flexGrow: 1 }} />

            {showOptions ? <ArrowDropUp sx={dropdownStyle.caret} /> :
                <ArrowDropDown sx={dropdownStyle.caret} />}
        </Box>

        {/* Items */}
        {showOptions && <Box id='dropdown-in-cms' sx={dropdownFieldStyle.content}>
            {items?.map((item, index) => {
                return <Box key={index}
                    sx={dropdownFieldStyle.item}
                    onClick={() => { handleChange(item?.value); setShowOptions(false) }}>
                    {multiple && (selectedItem?.includes(item.value)
                        ? <CheckBox sx={dropdownFieldStyle.spacingLeft} />
                        : <CheckBoxOutlineBlank sx={dropdownFieldStyle.spacingLeft} />)} {item?.component}
                </Box>
            })}
        </Box>}

        {meta.error ? (
            <Typography style={dropdownFieldStyle.errorLabel}>{meta.error}</Typography>
        ) : null}
    </Box>
}