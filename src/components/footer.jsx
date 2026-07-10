import { Link } from "react-router"

import { Container } from "@/components/container"

const LINKS = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Masuk", to: "/auth/login" },
  { label: "Daftar", to: "/auth/register" },
]

export function Footer() {
  return (
    <footer className="bg-eko-primary text-white">
      <Container className="grid grid-cols-1 gap-10 py-12 md:grid-cols-3">
        <div>
          <img src="/assets/logo/logo.png" alt="Ekobis" className="h-10 w-auto" />
          <p className="mt-4 text-sm text-white/80">
            Ekobis membantu kamu memahami dan mengelola koperasi lewat
            materi belajar, latihan soal, forum diskusi, dan leaderboard —
            semua bisa diakses di mana saja.
          </p>
        </div>

        <div>
          <h3 className="text-eko-secondary text-sm font-semibold tracking-wide uppercase">
            Tautan
          </h3>
          <ul className="mt-4 flex flex-col gap-2 text-sm">
            {LINKS.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="text-white/80 hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-eko-secondary text-sm font-semibold tracking-wide uppercase">
            Kontak
          </h3>
          <div className="mt-4 flex flex-col gap-1 text-sm text-white/80">
            <p>Ekobis - Ekosistem Bisnis</p>
            <p>Jakarta, Indonesia</p>
            <a href="mailto:halo@ekobis.id" className="mt-2 hover:text-white">
              halo@ekobis.id
            </a>
          </div>
        </div>
      </Container>

      <div className="border-t border-white/10 py-4">
        <Container>
          <p className="text-center text-xs text-white/60">
            © {new Date().getFullYear()} Ekobis. All rights reserved.
          </p>
        </Container>
      </div>
    </footer>
  )
}
