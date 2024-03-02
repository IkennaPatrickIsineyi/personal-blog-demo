import { Button, CircularProgress, SxProps } from "@mui/material";
import { FormikProps } from "formik";

type Props = {
    formProps: FormikProps<any>,
    label: string,
    disabled: boolean,
    fullWidth: boolean,
    marginTop?: number,
    processing?: boolean,
    style?: SxProps,
    variant?: 'contained' | 'text' | 'outlined'
}

export default function SubmitButton({ formProps, style, processing, label, disabled, fullWidth = true,
    marginTop = 2, variant = 'contained' }: Props) {
    return <div style={{
        width: fullWidth ? '100%' : 'max-content', alignItems: 'center',
        display: 'flex', justifyContent: 'center'
    }}>
        <Button id='loginSubmit' type="submit"
            onClick={async () => { await formProps?.submitForm() }}
            disabled={disabled || formProps.isSubmitting}
            fullWidth variant={variant} sx={{
                mt: marginTop, fontWeight: 400, mx: 'auto', fontSize: 14, borderRadius: '16px',
                maxWidth: fullWidth ? '100%' : 'max-content', ...style,
            }} >
            {(formProps.isSubmitting || processing) && <CircularProgress id='loginSubmit' size={20}
                sx={{ mr: 2, color: '#08e8de' }} />}
            {label}
        </Button>
    </div>
}