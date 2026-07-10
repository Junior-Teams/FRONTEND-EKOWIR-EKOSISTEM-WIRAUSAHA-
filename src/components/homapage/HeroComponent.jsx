import { Link } from "react-router"

import { Container } from "@/components/container"

export default function HeroComponent() {
  return (
    <section className="w-full py-12 md:py-20">
      <Container className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16">
        <div>
          <h1 className="text-4xl leading-tight font-extrabold text-foreground md:text-5xl">
           Tingkatkan Literasi Koperasimu Bersama
            <br />
            <span className="text-eko-primary">Ekobis.</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            Belajar jadi lebih terarah dengan video materi, latihan soal,
            forum diskusi, dan leaderboard untuk memantau progresmu. Akses di
            mana saja.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/auth/register"
              className="rounded-lg bg-eko-primary px-6 py-3 font-semibold text-white hover:bg-eko-primary/90"
            >
              Mulai Belajar
            </Link>
            <Link
              to="/auth/login"
              className="rounded-lg border-2 border-eko-primary px-6 py-3 font-semibold text-eko-primary hover:bg-eko-primary/10"
            >
              Sudah Punya Akun
            </Link>
          </div>
        </div>

        <div className="flex justify-center">
          <img
            src="/assets/illustration/hero.svg"
            alt="Ilustrasi belajar"
            className="w-full max-w-lg"
          />
        </div>
      </Container>
    </section>
  )
}
