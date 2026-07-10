import { Link, isRouteErrorResponse, useRouteError } from "react-router"

export function RouteErrorBoundary() {
  const error = useRouteError()
  const status = isRouteErrorResponse(error) ? error.status : undefined
  const message = isRouteErrorResponse(error)
    ? error.statusText || error.data
    : error instanceof Error
      ? error.message
      : "Unexpected error"

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-2 text-center">
      <h1 className="text-2xl font-semibold">
        {status ? `${status} — Something went wrong` : "Something went wrong"}
      </h1>
      <p className="text-muted-foreground text-sm">{message}</p>
      <Link to="/" className="text-primary text-sm underline underline-offset-4">
        Go back home
      </Link>
    </div>
  )
}
