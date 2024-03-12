
import { useRouter } from 'next/navigation';
import { Box, IconButton } from '@mui/material';
import { Download, VideoCall, VoiceChat } from '@mui/icons-material';
import { GenericObjectType } from '@/utils/types';

const MediaRenderer = (props: GenericObjectType) => {
    const router = useRouter();

    const handleFileDownload = ({ fileUrl, name }: { fileUrl: string, name: string }) => {
        // saveAs(fileUrl, name)
    }


    const iconStyle = { width: '20px', height: '20px' }

    const actionData: GenericObjectType = {
        audio: {
            icon: <VoiceChat sx={iconStyle} />, title: 'Watch audio',
            action: (url: string) => { router.push(url) }
        },
        video: {
            icon: <VideoCall sx={iconStyle} />, title: 'Watch video',
            action: (url: string) => { router.push(url) }
        },
        audioDownload: {
            icon: <Download sx={iconStyle} />, title: 'Download Audio',
            action: (fileUrl: string) => { console.log('file url', fileUrl); handleFileDownload({ fileUrl, name: `audio.${fileUrl?.split('.')?.pop()}` }) }
        },
        documentDownload: {
            icon: <Download sx={iconStyle} />, title: 'Download Document',
            action: (fileUrl: string) => { console.log('file url', fileUrl); handleFileDownload({ fileUrl, name: `document.${fileUrl?.split('.')?.pop()}` }) }
        },
    }

    const items = [
        'video', 'audio', 'audioDownload', 'documentDownload', 'resourceMapping'
    ]

    const downloadable = ['audioDownload', 'documentDownload', 'resourceMapping'];

    const createUrl = (url: string) => {
        if (!url) return '';
        return (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('www.')) ? url : `https://${url}`
    }

    return (
        !props?.data?.id ? <div></div> : <Box sx={{
            width: '100%', p: .4, verticalAlign: 'middle', maxWidth: '100%',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
            {items?.map((item: string, index: number) => {
                const value = props?.value[item];
                return value ? <IconButton href={downloadable.includes(item) ? '#' : createUrl(value)}
                    target='_blank'
                    title={actionData[item]?.title}
                    onClick={(e) => {
                        if (downloadable.includes(item)) {
                            e.preventDefault()
                            actionData[item]?.action(value)
                        }
                    }} key={index} sx={{
                        mr: .3, p: .5, minWidth: 0
                    }}>
                    {actionData[item]?.icon}
                </IconButton> : <div></div>
            })}
        </Box>
    );
}

export default MediaRenderer