import { Link } from "react-router"

import { Container } from "@/components/container"

export function Component() {
  return (
    <Container className="flex flex-1 flex-col items-center justify-center gap-2 py-6 text-center">
      <h1 className="text-2xl font-semibold">404 — Page not found</h1>
      <Link to="/" className="text-primary text-sm underline underline-offset-4">
        Go back home
      </Link>
    </Container>
  )
}
