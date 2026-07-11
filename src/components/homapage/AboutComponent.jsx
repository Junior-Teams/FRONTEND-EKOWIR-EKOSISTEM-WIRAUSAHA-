// import { Link } from "react-router"

import { Container } from "@/components/container"

export default function AboutComponent() {
  return (
    <section className="w-full py-12 md:py-20">
      <Container className="flex flex-col md:flex-row-reverse justify-center items-center gap-10 md:gap-16">
        <div className="md:w-1/2 flex flex-col gap-6">
          <h1 className="text-4xl leading-tight font-extrabold text-foreground md:text-5xl">
           Sedikit Tentang Kami
            <br />
            <span className="text-eko-primary">Ekowir - Ekosistem Wirausaha</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
          Platform ini hadir untuk membantu kamu memahami dan mengelola koperasi lewat materi belajar, latihan soal, forum diskusi,berbasi gamifikasi.
          </p>
          <p>
          Menggabungkan teknologi dan pendidikan, Ekowir bertujuan untuk meningkatkan literasi koperasi di Indonesia, memberdayakan individu untuk menjadi pengelola koperasi yang lebih baik, dan mendorong pertumbuhan ekonomi berbasis komunitas.
          </p>
        
        </div>

        <div className="md:w-1/2 flex justify-center">
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
