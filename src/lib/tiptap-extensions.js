import { Table, TableCell, TableHeader, TableRow } from "@tiptap/extension-table"
import { Youtube } from "@tiptap/extension-youtube"
import { StarterKit } from "@tiptap/starter-kit"

// Single source of truth for what a materi document can contain. Both the
// admin editor and the read-only viewer build from this same list, so the
// stored JSON can never hold a node type one side understands and the other
// doesn't — and pasted HTML is parsed through this schema, dropping anything
// unrecognized (no way to smuggle in scripts).
export function getMateriExtensions() {
  return [
    StarterKit.configure({ heading: { levels: [1, 2, 3] } }),
    Table.configure({ resizable: false }),
    TableRow,
    TableHeader,
    TableCell,
    Youtube.configure({ nocookie: true, width: 640, height: 360 }),
  ]
}
