import { Navigate, Outlet } from "react-router"

import { Skeleton } from "@/components/ui/skeleton"
import { useCurrentUser } from "@/hooks/auth/useCurrentUser"
import { RouteErrorBoundary } from "@/routes/route-error-boundary"

export function Component() {
  const { data: user, isLoading } = useCurrentUser()

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-64 w-full" />
      </div>
    )
  }

  if (user?.role !== "admin") {
    return <Navigate to="/dashboard" replace />
  }

  return <Outlet />
}

export { RouteErrorBoundary as ErrorBoundary }
