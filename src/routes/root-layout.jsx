import { useEffect, useState } from "react"
import { Link, Outlet, ScrollRestoration } from "react-router"

import { Container } from "@/components/container"
import { Footer } from "@/components/footer"
// import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { RouteErrorBoundary } from "@/routes/route-error-boundary"

export function Component() {
  const [scrolled, setScrolled] = useState(() => window.scrollY > 0)

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 0)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <div className="flex min-h-svh flex-col">
      <header
        className={cn(
          "bg-background sticky top-0 z-50 border-b transition-shadow",
          scrolled && "shadow-md"
        )}
      >
        <Container className="flex items-center justify-between py-3">
          <img src="/assets/logo/logo.webp" alt="Logo" className="h-12 w-auto" />
          <nav className="flex items-center gap-4 text-sm font-medium">
            <Link to="/" className="hover:text-foreground/80 font-semibold text-[1rem]">
              Home
            </Link>
            <Link to="/about" className="hover:text-foreground/80 font-semibold text-[1rem]">
              About
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Button size="default" className="rounded-lg bg-eko-primary px-6 py-5  font-semibold text-white hover:bg-eko-primary/90" render={<Link to="/auth/login" />} nativeButton={false}>
              Masuk
            </Button>
            <Button size="default" className="rounded-lg bg-eko-secondary px-6 py-5  font-semibold text-white hover:bg-eko-secondary/90" render={<Link to="/auth/register" />} nativeButton={false}>
              Daftar
            </Button>
            {/* <ModeToggle /> */}
          </div>
        </Container>
      </header>

      <main className="flex flex-1 flex-col">
        <Outlet />
      </main>

      <Footer />

      <ScrollRestoration />
    </div>
  )
}

export { RouteErrorBoundary as ErrorBoundary }
