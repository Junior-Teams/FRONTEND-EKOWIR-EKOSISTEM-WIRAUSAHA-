import { EditorContent, useEditor } from "@tiptap/react"
import { useEffect } from "react"

import { parseMateriContent } from "@/lib/materi-content"
import { getMateriExtensions } from "@/lib/tiptap-extensions"
import { cn } from "@/lib/utils"

// Read-only renderer for materi rich text. Same extension set as the admin
// editor, so what admins compose is rendered pixel-identically here — tables,
// embedded YouTube videos and all.
export function MateriContent({ content, className }) {
  const editor = useEditor({
    extensions: getMateriExtensions(),
    content: parseMateriContent(content),
    editable: false,
  })

  useEffect(() => {
    if (!editor) return
    editor.commands.setContent(parseMateriContent(content), { emitUpdate: false })
  }, [editor, content])

  if (!editor) return null

  return (
    <div className={cn("materi-content", className)}>
      <EditorContent editor={editor} />
    </div>
  )
}
