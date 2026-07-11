import { useEffect, useState } from "react"
import { Link, Outlet, ScrollRestoration } from "react-router"
import { Menu, X } from "lucide-react" // Import icon dari Lucide

import { Container } from "@/components/container"
import { Footer } from "@/components/footer"
import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { RouteErrorBoundary } from "@/routes/route-error-boundary"

export function Component() {
  const [scrolled, setScrolled] = useState(() => window.scrollY > 0)
  const [isOpen, setIsOpen] = useState(false) // State untuk mobile menu

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 0)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Fungsi untuk menutup menu saat link diklik
  const closeMenu = () => setIsOpen(false)

  return (
    <div className="flex min-h-svh flex-col">
      <header
        className={cn(
          "bg-background sticky top-0 z-50 border-b transition-shadow",
          scrolled && "shadow-md"
        )}
      >
        <Container className="flex items-center justify-between py-3">
          <Link to="/" onClick={closeMenu}>
            <img src="/assets/logo/logo.svg" alt="Logo" className="h-12 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link to="/" className="hover:text-foreground/80 font-semibold text-[1rem]">
              Home
            </Link>
            <Link to="/about" className="hover:text-foreground/80 font-semibold text-[1rem]">
              About
            </Link>
            <Link to="/#fitur" className="hover:text-foreground/80 font-semibold text-[1rem]">
              Fitur
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <Button size="default" className="rounded-lg bg-eko-primary px-6 py-5 font-semibold text-white hover:bg-eko-primary/90" render={<Link to="/auth/login" />} nativeButton={false}>
              Masuk
            </Button>
            <Button size="default" className="rounded-lg bg-eko-secondary px-6 py-5 font-semibold text-white hover:bg-eko-secondary/90" render={<Link to="/auth/register" />} nativeButton={false}>
              Daftar
            </Button>
            <ModeToggle />
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center gap-2 md:hidden">
            <ModeToggle /> {/* Biarkan mode toggle tetap ada di header mobile */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </Container>

        {/* Mobile Navigation Dropdown */}
        {isOpen && (
          <div className="md:hidden border-t bg-background">
            <Container className="flex flex-col gap-4 py-4 pb-6">
              <nav className="flex flex-col gap-4 text-sm font-medium">
                <Link to="/" onClick={closeMenu} className="hover:text-foreground/80 font-semibold text-[1rem]">
                  Home
                </Link>
                <Link to="/about" onClick={closeMenu} className="hover:text-foreground/80 font-semibold text-[1rem]">
                  About
                </Link>
                <Link to="/#fitur" onClick={closeMenu} className="hover:text-foreground/80 font-semibold text-[1rem]">
                  Fitur
                </Link>
              </nav>
              <div className="flex flex-col gap-3 pt-2">
                <Button className="w-full rounded-lg bg-eko-primary py-5 font-semibold text-white hover:bg-eko-primary/90" render={<Link to="/auth/login" onClick={closeMenu} />} nativeButton={false}>
                  Masuk
                </Button>
                <Button className="w-full rounded-lg bg-eko-secondary py-5 font-semibold text-white hover:bg-eko-secondary/90" render={<Link to="/auth/register" onClick={closeMenu} />} nativeButton={false}>
                  Daftar
                </Button>
              </div>
            </Container>
          </div>
        )}
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