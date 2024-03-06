import Image from 'next/image'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { Box } from '@mui/material'
import UiLoader from '../UiLoader'

const EditorComp = dynamic(() => import('@/components/ContentEditor'), { ssr: false })

const markdown = `
Hello **world**!
`

type Props = {
    imageFolder: string,
    placeholder: string,
    content?: string,
    handleChange: (value?: string) => void,
}

export default function Editor({ imageFolder, handleChange, content, placeholder }: Props) {
    return (<Box sx={{ border: '1px solid black', width: '100%', height: 'max-content', minHeight: '60vh' }}>
        <Suspense fallback={<UiLoader />}>
            <EditorComp placeholder={placeholder} handleChange={handleChange} markdown={content || ''} />
        </Suspense>
    </Box>
    )
}