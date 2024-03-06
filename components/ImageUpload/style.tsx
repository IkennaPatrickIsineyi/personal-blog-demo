import { SxProps } from '@mui/material'

type Props = {
    [key: string]: SxProps
}


export const fileUploadStyle: Props = {
    container: {
        borderRadius: '16px', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center',
        width: '100%', justifyContent: 'center',
    },
    labelContainer: {
        display: 'flex', ml: 'auto', mb: 'auto', mt: 0, px: 1, py: .5, borderRadius: '0 16px 0 0',
        maxWidth: 'max-conent', alignItems: 'center', bgcolor: '#34343480',
    },
    camera: { height: '20px', width: '20px' },
    changeImage: { fontSize: 12, ml: 2, color: 'white' },
    addImageContainer: { my: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' },
    uploadIcon: { fontSize: 14, },
    wrapper1: {
        display: 'flex', justifyContent: 'center', px: 2, wordBreak: 'break-all',
        flexWrap: 'wrap', alignItems: 'center', mb: 1, maxWidth: '80%', whiteSpace: 'normal'
    },
    clickLabel: {
        cursor: 'pointer', fontSize: { xs: 11, md: 12, lg: 12 }, display: 'flex', alignItems: 'center',
        color: 'primary.main', mr: .5, textDecoration: 'underline'
    },
    dragLabel: { fontSize: { xs: 11, md: 12, lg: 14 }, display: { xs: 'none', md: 'flex' }, alignItems: 'center' },
    imageInfo: {
        fontSize: { xs: 8, md: 10, lg: 12 }, fontWeight: 500, color: '#898989', whiteSpace: 'normal', maxWidth: '80%', textAlign: 'center',
        display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center'
    },
    errorLabel: { color: 'red', fontSize: 11, marginTop: '4px' }
}