import { Box, OutlinedInput, Typography } from "@mui/material";
import { FieldHookConfig, useField } from "formik";
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
    // props: FieldHookConfig<any>
}

export default function UiTextField({ placeholder, small, maxLength, min, width, type,
    noValidation, variant, ...props }: Props & FieldHookConfig<any>) {
    const [field, meta, helpers] = useField(props);
    const [length, setLength] = useState(meta?.value?.length ?? 0);

    const numbersKeys = [(min === 1 && !meta?.value) ? '' : '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'Backspace', 'ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight'];


    return <Box sx={{ width }}>
        {/* Text field */}
        <OutlinedInput {...field} /* {...props} */ type={type || 'text'} name={field.name} id={props.id}
            fullWidth inputProps={{
                min: min ?? 0,
                ...(maxLength ? { maxLength } : {})
            }}
            onKeyUp={(e) => { setLength(meta.value?.length) }}
            onKeyDown={(e) => { (e.type === 'number' && (!numbersKeys.includes(e?.key))) && e.preventDefault() }}

            placeholder={placeholder} sx={{
                fontSize: 14, width: small ? '70px' : '100%', height: small ? '40px' : '38px',
                background: 'white', fontWeight: 500, borderRadius: '8px', color: 'black', fontFamily: 'inter'
            }}
        />



        {/* Error message */}
        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
            {/* meta.touched && */!noValidation && meta.error ? (
                <Typography style={{
                    color: 'red', fontFamily: 'inter',
                    fontSize: 11, marginTop: '4px'
                }}>{meta.error}</Typography>
            ) : null}

            {maxLength && <Typography sx={{
                fontSize: 12, mt: 1, alignSelf: 'flex-end'
            }}>{length}/{maxLength}</Typography>}
        </Box>
    </Box>
}