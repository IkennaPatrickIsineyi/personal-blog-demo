
import { GenericObjectType } from '@/utils/types'
import { Avatar } from '@mui/material'

export default function AvatarRenderer(props: GenericObjectType) {

    return <div style={{
        display: 'flex', alignItems: 'center',
        height: '100%'
    }}>
        <Avatar
            src={props?.value}
            sx={{ height: '30px', width: '30px' }}
        />
    </div>
}