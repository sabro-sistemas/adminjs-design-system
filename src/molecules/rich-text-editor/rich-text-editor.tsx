/* eslint-disable react/require-default-props */
import Image from '@tiptap/extension-image'
import { Table, TableCell, TableHeader, TableRow } from '@tiptap/extension-table'
import TextAlign from '@tiptap/extension-text-align'
import Typography from '@tiptap/extension-typography'
import { CharacterCount } from '@tiptap/extensions'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React, { FC, useCallback } from 'react'

import MenuBar from './components/menu-bar.jsx'
import { EditorWrapper } from './rich-text-editor.styled.jsx'

interface EditorOptions {
  [key: string]: any;
}
interface RichTextEditorOptions extends Partial<EditorOptions> {
  limit?: number
}

interface RichTextEditorProps {
  value: any
  onChange: (value: string) => void
  options?: RichTextEditorOptions
}

const RichTextEditor: FC<RichTextEditorProps> = (props) => {
  const { value, onChange, options = {} } = props
  const handleUpdate = useCallback(({ editor }) => {
    onChange(editor.getHTML())
  }, [])

  const { limit, extensions = [], ...restOptions } = options

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ link: { openOnClick: false } }),
      CharacterCount.configure({ limit, mode: 'nodeSize' }),
      Image,
      Table,
      TableCell,
      TableHeader,
      TableRow,
      TextAlign.configure({ types: ['heading', 'paragraph', 'image'] }),
      Typography,
      ...extensions,
    ],
    content: value,
    onUpdate: handleUpdate,
    injectCSS: true,
    shouldRerenderOnTransaction: true,
    ...restOptions,
  })

  return (
    <>
      <MenuBar editor={editor} />
      <EditorWrapper>
        <EditorContent editor={editor} />
        {options.limit && (
          <span className="characterCount">
            {value?.length}/{limit}
          </span>
        )}
      </EditorWrapper>
    </>
  )
}

RichTextEditor.displayName = 'RichTextEditor'

export { RichTextEditor }
export default RichTextEditor
