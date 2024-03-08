import Image from 'next/image'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { Box, Typography } from '@mui/material'
import UiLoader from '../UiLoader'
import { useFileUpload } from '@/services/uploadFile'

const EditorComp = dynamic(() => import('@/components/ContentEditor'), { ssr: false })

const markdown = `
Hello **world**!
`

type Props = {
    imageFolder: string,
    placeholder: string,
    disablePreview?: boolean,
    content?: string,
    handleChange: (value?: string) => void,
    openPreview?: () => void,
    error?: string,
}

export default function Editor({ imageFolder, disablePreview = false,
    error, openPreview = () => { }, handleChange, content, placeholder }: Props) {

    return (<>
        <Box sx={{ border: '1px solid #33333320', width: '100%', height: 'max-content', /* minHeight: '60vh' */ }}>
            <Suspense fallback={<UiLoader />}>
                <EditorComp placeholder={placeholder} disablePreview={disablePreview}
                    openPreview={openPreview} handleChange={handleChange} markdown={content || ''}
                />
            </Suspense>
        </Box>

        {/* Error message */}
        {error ? (
            <Typography style={{ color: 'red', fontSize: 11, marginTop: '4px' }}>{error}</Typography>
        ) : null}
    </>
    )
}