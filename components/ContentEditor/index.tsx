'use client'

import { BlockTypeSelect, BoldItalicUnderlineToggles, ChangeCodeMirrorLanguage, CreateLink, InsertFrontmatter, InsertImage, InsertTable, InsertThematicBreak, ListsToggle, MDXEditor, MDXEditorMethods, Separator, UndoRedo, codeMirrorPlugin, frontmatterPlugin, headingsPlugin, imagePlugin, listsPlugin, tablePlugin, thematicBreakPlugin, toolbarPlugin } from "@mdxeditor/editor"
import { FC } from 'react'

interface EditorProps {
    markdown: string
    editorRef?: React.MutableRefObject<MDXEditorMethods | null>,
    handleChange: (value?: string) => void,
    placeholder: string
}

/**
 * Extend this Component further with the necessary plugins or props you need.
 * proxying the ref is necessary. Next.js dynamically imported components don't support refs. 
*/
const Editor: FC<EditorProps> = ({ markdown, handleChange, placeholder, editorRef }) => {
    const imageUploadHandler = async (file: File) => {
        return ''
    }

    return <MDXEditor ref={editorRef} placeholder={placeholder} onChange={handleChange} markdown={markdown} plugins={[headingsPlugin(), frontmatterPlugin(),
    imagePlugin({ imageUploadHandler }), tablePlugin(), listsPlugin(), thematicBreakPlugin(), toolbarPlugin({
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
            </>
        )
    })]} />
}

export default Editor
