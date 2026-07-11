const EMPTY_DOC = { type: "doc", content: [{ type: "paragraph" }] }

// Materi content is stored as stringified Tiptap JSON in `array_element`,
// but rows created before the rich-text editor hold plain text. This parses
// either form into a Tiptap document so old materi keep rendering.
export function parseMateriContent(raw) {
  if (!raw) return EMPTY_DOC
  try {
    const parsed = JSON.parse(raw)
    if (parsed?.type === "doc") return parsed
  } catch {
    // legacy plain text, fall through
  }
  return {
    type: "doc",
    content: raw
      .split("\n")
      .map((line) => ({
        type: "paragraph",
        content: line ? [{ type: "text", text: line }] : undefined,
      })),
  }
}

// Plain-text flattening of the document, for previews in admin tables etc.
export function getMateriContentText(raw) {
  const doc = parseMateriContent(raw)
  const parts = []
  const walk = (node) => {
    if (node.text) parts.push(node.text)
    node.content?.forEach(walk)
  }
  walk(doc)
  return parts.join(" ")
}

export function isMateriContentEmpty(raw) {
  const doc = typeof raw === "string" ? parseMateriContent(raw) : raw
  return !doc?.content?.some((node) => node.type !== "paragraph" || node.content?.length)
}
