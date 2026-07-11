import { EditorContent, useEditor, useEditorState } from "@tiptap/react"
import { isValidYoutubeUrl } from "@tiptap/extension-youtube"
import {
  Bold,
  Heading1,
  Heading2,
  Heading3,
  Italic,
  List,
  ListOrdered,
  Quote,
  Redo2,
  SquarePlay,
  Table as TableIcon,
  Undo2,
} from "lucide-react"
import { useEffect, useRef, useState } from "react"
import toast from "react-hot-toast"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { parseMateriContent } from "@/lib/materi-content"
import { NEO_BORDER, NEO_PRESS, NEO_SHADOW } from "@/lib/neobrutalism"
import { getMateriExtensions } from "@/lib/tiptap-extensions"
import { cn } from "@/lib/utils"

function ToolbarButton({ isActive, disabled, onClick, title, children }) {
  return (
    <button
      type="button"
      title={title}
      aria-label={title}
      disabled={disabled}
      // onMouseDown+preventDefault keeps the editor selection/focus intact
      // while clicking toolbar buttons.
      onMouseDown={(event) => event.preventDefault()}
      onClick={onClick}
      className={cn(
        "flex size-8 shrink-0 items-center justify-center rounded-md transition-colors disabled:pointer-events-none disabled:opacity-40 [&_svg]:size-4",
        isActive
          ? "bg-eko-primary text-white"
          : "hover:bg-muted text-foreground"
      )}
    >
      {children}
    </button>
  )
}

function YoutubeDialog({ open, onOpenChange, onSubmit }) {
  const [url, setUrl] = useState("")

  function submit() {
    if (!isValidYoutubeUrl(url)) {
      toast.error("URL YouTube tidak valid")
      return
    }
    onSubmit(url)
    setUrl("")
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn("sm:max-w-md", NEO_BORDER, NEO_SHADOW)}>
        <DialogHeader>
          <DialogTitle>Sisipkan Video YouTube</DialogTitle>
          <DialogDescription>
            Tempel tautan video YouTube untuk disematkan di dalam materi.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-2">
          <Label htmlFor="youtube-url">URL Video</Label>
          <Input
            id="youtube-url"
            placeholder="https://www.youtube.com/watch?v=..."
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault()
                submit()
              }
            }}
          />
        </div>

        <DialogFooter>
          <Button
            type="button"
            onClick={submit}
            className={cn(NEO_BORDER, NEO_SHADOW, NEO_PRESS)}
          >
            Sisipkan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// Rich text editor for materi content. Controlled through react-hook-form's
// Controller: `value` is the stored string (Tiptap JSON or legacy plain
// text), `onChange` receives stringified Tiptap JSON on every edit.
export function MateriEditor({ value, onChange }) {
  const [youtubeOpen, setYoutubeOpen] = useState(false)

  // Distinguishes our own onUpdate emissions from external value changes
  // (e.g. the form's reset() once the materi loads), so external changes
  // sync into the editor without feedback loops.
  const lastEmittedRef = useRef(value ?? "")

  const editor = useEditor({
    extensions: getMateriExtensions(),
    content: parseMateriContent(value),
    onUpdate: ({ editor }) => {
      const json = JSON.stringify(editor.getJSON())
      lastEmittedRef.current = json
      onChange?.(json)
    },
    editorProps: {
      attributes: {
        class: "min-h-64 p-4",
      },
    },
  })

  useEffect(() => {
    if (!editor || value === undefined || value === lastEmittedRef.current) return
    lastEmittedRef.current = value
    // emitUpdate: false — syncing external form state in, not a user edit
    editor.commands.setContent(parseMateriContent(value), { emitUpdate: false })
  }, [editor, value])

  const active = useEditorState({
    editor,
    selector: ({ editor }) => ({
      bold: editor?.isActive("bold") ?? false,
      italic: editor?.isActive("italic") ?? false,
      h1: editor?.isActive("heading", { level: 1 }) ?? false,
      h2: editor?.isActive("heading", { level: 2 }) ?? false,
      h3: editor?.isActive("heading", { level: 3 }) ?? false,
      bulletList: editor?.isActive("bulletList") ?? false,
      orderedList: editor?.isActive("orderedList") ?? false,
      blockquote: editor?.isActive("blockquote") ?? false,
      table: editor?.isActive("table") ?? false,
      canUndo: editor?.can().undo() ?? false,
      canRedo: editor?.can().redo() ?? false,
    }),
  })

  if (!editor) return null

  const chain = () => editor.chain().focus()

  return (
    <div className={cn("materi-content overflow-hidden rounded-lg bg-white dark:bg-neutral-900", NEO_BORDER)}>
      <div className="flex flex-wrap items-center gap-1 border-b-2 border-black bg-neutral-50 p-2 dark:border-white dark:bg-neutral-800">
        <ToolbarButton title="Tebal" isActive={active.bold} onClick={() => chain().toggleBold().run()}>
          <Bold />
        </ToolbarButton>
        <ToolbarButton title="Miring" isActive={active.italic} onClick={() => chain().toggleItalic().run()}>
          <Italic />
        </ToolbarButton>

        <span className="mx-1 h-5 w-px bg-border" />

        <ToolbarButton title="Heading 1" isActive={active.h1} onClick={() => chain().toggleHeading({ level: 1 }).run()}>
          <Heading1 />
        </ToolbarButton>
        <ToolbarButton title="Heading 2" isActive={active.h2} onClick={() => chain().toggleHeading({ level: 2 }).run()}>
          <Heading2 />
        </ToolbarButton>
        <ToolbarButton title="Heading 3" isActive={active.h3} onClick={() => chain().toggleHeading({ level: 3 }).run()}>
          <Heading3 />
        </ToolbarButton>

        <span className="mx-1 h-5 w-px bg-border" />

        <ToolbarButton title="Daftar poin" isActive={active.bulletList} onClick={() => chain().toggleBulletList().run()}>
          <List />
        </ToolbarButton>
        <ToolbarButton title="Daftar bernomor" isActive={active.orderedList} onClick={() => chain().toggleOrderedList().run()}>
          <ListOrdered />
        </ToolbarButton>
        <ToolbarButton title="Kutipan" isActive={active.blockquote} onClick={() => chain().toggleBlockquote().run()}>
          <Quote />
        </ToolbarButton>

        <span className="mx-1 h-5 w-px bg-border" />

        <ToolbarButton
          title="Sisipkan tabel"
          isActive={active.table}
          onClick={() => chain().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
        >
          <TableIcon />
        </ToolbarButton>
        <ToolbarButton title="Sisipkan video YouTube" onClick={() => setYoutubeOpen(true)}>
          <SquarePlay />
        </ToolbarButton>

        <span className="mx-1 h-5 w-px bg-border" />

        <ToolbarButton title="Urungkan" disabled={!active.canUndo} onClick={() => chain().undo().run()}>
          <Undo2 />
        </ToolbarButton>
        <ToolbarButton title="Ulangi" disabled={!active.canRedo} onClick={() => chain().redo().run()}>
          <Redo2 />
        </ToolbarButton>
      </div>

      {active.table && (
        <div className="flex flex-wrap items-center gap-2 border-b-2 border-black bg-neutral-50 px-2 py-1.5 text-xs dark:border-white dark:bg-neutral-800">
          <button type="button" className="rounded px-1.5 py-0.5 font-semibold hover:bg-muted" onMouseDown={(e) => e.preventDefault()} onClick={() => chain().addRowAfter().run()}>
            + Baris
          </button>
          <button type="button" className="rounded px-1.5 py-0.5 font-semibold hover:bg-muted" onMouseDown={(e) => e.preventDefault()} onClick={() => chain().addColumnAfter().run()}>
            + Kolom
          </button>
          <button type="button" className="rounded px-1.5 py-0.5 font-semibold hover:bg-muted" onMouseDown={(e) => e.preventDefault()} onClick={() => chain().deleteRow().run()}>
            − Baris
          </button>
          <button type="button" className="rounded px-1.5 py-0.5 font-semibold hover:bg-muted" onMouseDown={(e) => e.preventDefault()} onClick={() => chain().deleteColumn().run()}>
            − Kolom
          </button>
          <button type="button" className="text-destructive rounded px-1.5 py-0.5 font-semibold hover:bg-muted" onMouseDown={(e) => e.preventDefault()} onClick={() => chain().deleteTable().run()}>
            Hapus Tabel
          </button>
        </div>
      )}

      <EditorContent editor={editor} />

      <YoutubeDialog
        open={youtubeOpen}
        onOpenChange={setYoutubeOpen}
        onSubmit={(url) => chain().setYoutubeVideo({ src: url }).run()}
      />
    </div>
  )
}
