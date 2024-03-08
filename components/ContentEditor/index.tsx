'use client'

import { useFileUpload } from "@/services/uploadFile"
import {
    BlockTypeSelect, BoldItalicUnderlineToggles, Button, CreateLink, InsertImage,
    InsertTable, InsertThematicBreak, ListsToggle, MDXEditor, MDXEditorMethods, Separator,
    UndoRedo, frontmatterPlugin, headingsPlugin, imagePlugin, listsPlugin, tablePlugin,
    thematicBreakPlugin, toolbarPlugin
} from "@mdxeditor/editor"
import { Box, Typography } from "@mui/material"
import { FC } from 'react'
import UiSpacer from "../UiSpacer"

interface EditorProps {
    markdown: string
    editorRef?: React.MutableRefObject<MDXEditorMethods | null>,
    handleChange: (value?: string) => void,
    placeholder: string,
    disablePreview?: boolean,
    openPreview?: () => void,
}

/**
 * Extend this Component further with the necessary plugins or props you need.
 * proxying the ref is necessary. Next.js dynamically imported components don't support refs. 
*/
const Editor: FC<EditorProps> = ({ markdown, disablePreview = false,
    handleChange, openPreview = () => { }, placeholder, editorRef }) => {
    const { request } = useFileUpload();

    const imageUploadHandler = async (file: File) => {
        //Upload the files to cloud storage
        const uploadedFiles = await request({ fileArray: [file] })

        console.log('result of file upload', uploadedFiles)

        return `${Object.values((uploadedFiles || [])[0] || {})[0]}#editorImage`
    }

    const handlePreview = () => {
        console.log('button click')
        openPreview()
    }

    return <MDXEditor ref={editorRef} placeholder={placeholder} onChange={handleChange}
        markdown={markdown} plugins={[headingsPlugin(), frontmatterPlugin(),
        imagePlugin({ imageUploadHandler, disableImageResize: true }), tablePlugin(), listsPlugin(), thematicBreakPlugin(), toolbarPlugin({
            toolbarContents: () => (
                <>
                    <UndoRedo />
                    <Separator />
                    <BoldItalicUnderlineToggles />
                    <Separator />
                    <BlockTypeSelect />
                    <Separator />
                    <CreateLink />
                    <Separator />
                    <InsertImage />
                    <Separator />
                    <InsertTable />
                    <Separator />
                    <InsertThematicBreak />
                    <Separator />
                    <ListsToggle />
                    <Separator />
                    {!disablePreview && <Button style={{ marginLeft: 'auto', padding: '4px 16px', background: '#1A1A1A', color: 'white', cursor: 'pointer' }}
                        onClick={handlePreview}>
                        Preview
                    </Button>}
                </>
            )
        })]} />
}

export default Editor
