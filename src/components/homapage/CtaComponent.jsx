import { Link } from "react-router"

import { Container } from "@/components/container"

export default function CtaComponent() {
  return (
    <section className="w-full bg-eko-tertiary/15 py-16 md:py-24">
      <Container className="flex flex-col items-center text-center">
        <img
          src="/assets/illustration/about.svg"
          alt="Ilustrasi siswa belajar"
          className="w-full max-w-md"
        />

        <h2 className="mt-8 text-3xl font-extrabold text-foreground md:text-4xl">
          Semakin Yakin Kelola{" "}
          <span className="underline decoration-eko-secondary decoration-4 underline-offset-4">
            Koperasimu
          </span>
        </h2>

        <p className="mt-4 text-lg text-muted-foreground">
          Kuasai materi dan latihan seputar koperasi bersama Ekowir
        </p>

        <Link
          to="/auth/register"
          className="mt-8 rounded-lg bg-eko-primary px-8 py-4 font-semibold text-white hover:bg-eko-primary/90"
        >
          Mulai Belajar Sekarang
        </Link>
      </Container>
    </section>
  )
}
