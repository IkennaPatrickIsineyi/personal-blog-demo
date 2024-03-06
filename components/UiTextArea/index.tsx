import { Box, TextField, Typography } from "@mui/material";
import { FieldHookConfig, useField } from "formik"

import { useState } from "react";

type Props = {
    placeholder?: string,
    small?: boolean,
    maxLength?: number,
    min?: number,
    noValidation?: boolean,
    type?: string,
    width?: string,
    variant?: 'outlined',
    rows?: number
    // props: FieldHookConfig<any>
}


export default function UiTextArea({ placeholder, maxLength, rows, variant = 'outlined', ...props }:
    Props & FieldHookConfig<any>) {

    const [field, meta, helpers] = useField(props);

    const [length, setLength] = useState(meta?.value?.length ?? 0);

    const handleChange = (value?: string) => {
        helpers.setValue(value)
    }

    return <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', }}>

        <TextField {...field} /* {...props} */ id={props.id} fullWidth variant={variant} multiline
            rows={rows || 4}
            placeholder={placeholder} sx={{ fontSize: 14, fontWeight: 500, bgcolor: 'white' }}
            onKeyUp={(e) => { setLength(meta.value?.length) }}
            inputProps={{ ...(maxLength ? { maxLength } : {}) }}
        />

        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>

            {/* meta.touched && */ meta.error ? (
                <Typography style={{ color: 'red', fontSize: 11, marginTop: '4px' }}>{meta.error}</Typography>
            ) : null}

            {maxLength && <Typography sx={{
                fontSize: 12, mt: 1, alignSelf: 'flex-end'
            }}>{length}/{maxLength}</Typography>}

        </Box>

    </Box>
}