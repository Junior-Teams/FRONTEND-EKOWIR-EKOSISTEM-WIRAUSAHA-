import { Outlet } from "react-router"

import { ModeToggle } from "@/components/mode-toggle"
import { RouteErrorBoundary } from "@/routes/route-error-boundary"

export function Component() {
  return (
    <div className="bg-grid bg-background flex min-h-svh flex-col">
      <header className="flex justify-end px-4 py-3">
        <ModeToggle />
      </header>

      <main className="flex flex-1 flex-col items-center justify-center px-4">
        <Outlet />
      </main>
    </div>
  )
}

export { RouteErrorBoundary as ErrorBoundary }
