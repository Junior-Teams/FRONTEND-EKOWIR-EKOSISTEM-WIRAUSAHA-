import { BookOpenText, FileQuestion, MessagesSquare, Trophy } from "lucide-react"

import { Container } from "@/components/container"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const FEATURES = [
  {
    icon: BookOpenText,
    title: "Video Materi",
    description:
      "Pelajari konsep koperasi lewat video materi yang ringkas dan mudah dipahami.",
  },
  {
    icon: FileQuestion,
    title: "Latihan Soal",
    description:
      "Uji pemahamanmu dengan latihan soal interaktif di setiap modul.",
  },
  {
    icon: MessagesSquare,
    title: "Forum Diskusi",
    description:
      "Diskusikan materi dan tanya jawab bersama anggota koperasi lainnya.",
  },
  {
    icon: Trophy,
    title: "Leaderboard",
    description:
      "Pantau progres belajarmu dan bersaing sehat lewat papan peringkat.",
  },
]

export default function FiturComponent() {
  return (
    <section id="fitur" className="w-full py-12 md:py-20">
      <Container className="flex flex-col items-center text-center">
        <h2 className="text-3xl font-extrabold text-foreground md:text-4xl">
          Fitur yang Membantumu{" "}
          <span className="text-eko-primary">Belajar Lebih Terarah</span>
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          Semua yang kamu butuhkan untuk memahami pengelolaan koperasi ada di
          satu tempat.
        </p>

        <div className="mt-10 grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature) => (
            <Card key={feature.title} className="text-left">
              <CardHeader>
                <div className="flex size-12 items-center justify-center rounded-lg bg-eko-primary/10">
                  <feature.icon className="size-6 text-eko-primary" />
                </div>
                <CardTitle className="mt-4 text-lg">{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  )
}
