import { SxProps } from '@mui/material'

type Props = {
    [key: string]: SxProps
}

export const indexStyle: Props = {
    tableWrapper: { height: 'calc(100vh - 120px)', width: '100%' }
}
