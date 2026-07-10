import { Container } from "@/components/container"

export function Component() {
  return (
    <Container className="flex flex-1 flex-col items-center justify-center gap-2 py-6 text-center">
      <h1 className="text-2xl font-semibold">About</h1>
      <p className="text-muted-foreground text-sm">
        This route is lazy-loaded in its own chunk — proof the router's
        code-splitting is wired up correctly.
      </p>
    </Container>
  )
}
