// import { Link } from "react-router"

import { Container } from "@/components/container"

export default function AboutComponent() {
  return (
    <section className="w-full py-12 md:py-20">
      <Container className="flex flex-col md:flex-row-reverse justify-center items-center gap-10 md:gap-16">
        <div className="w-1/2">
          <h1 className="text-4xl leading-tight font-extrabold text-foreground md:text-5xl">
           Sedikit Tentang Kami
            <br />
            <span className="text-eko-primary">Ekobis - Ekosistem Bussines</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            Belajar jadi lebih terarah dengan video materi, latihan soal,
            forum diskusi, dan leaderboard untuk memantau progresmu. Akses di
            mana saja.
          </p>
          {/* <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/auth/register"
              className="rounded-lg bg-eko-primary px-6 py-3 font-semibold text-white hover:bg-eko-primary/90"
            >
              Mulai Belajar
            </Link>
          </div> */}
        </div>

        <div className="w-1/2 flex justify-center">
          <img
            src="/assets/illustration/about.svg"
            alt="Ilustrasi belajar"
            className="w-full max-w-lg"
          />
        </div>
      </Container>
    </section>
  )
}
