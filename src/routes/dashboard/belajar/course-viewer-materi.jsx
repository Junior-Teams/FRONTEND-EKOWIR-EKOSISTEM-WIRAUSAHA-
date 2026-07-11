import { useQueryClient } from "@tanstack/react-query"
import { ChevronLeft, ChevronRight, ListChecks } from "lucide-react"
import { useEffect, useRef } from "react"
import { Link, useOutletContext, useParams } from "react-router"

import { MateriContent } from "@/components/materi/materi-content"
import { useCompleteMateri } from "@/hooks/belajar/useMateriProgress"
import { NEO_BORDER, NEO_PRESS, NEO_SHADOW } from "@/lib/neobrutalism"
import { cn } from "@/lib/utils"
import { RouteErrorBoundary } from "@/routes/route-error-boundary"

export function Component() {
  const { id, materiId } = useParams()
  const { materis, quizzes, progress, completedSet } = useOutletContext()
  const queryClient = useQueryClient()

  const currentIndex = materis.findIndex(
    (materi) => String(materi.ID) === materiId
  )
  const materi = materis[currentIndex]
  const previous = currentIndex > 0 ? materis[currentIndex - 1] : null
  const next =
    currentIndex >= 0 && currentIndex < materis.length - 1
      ? materis[currentIndex + 1]
      : null
  const isLast = currentIndex === materis.length - 1
  const firstQuiz = quizzes?.[0]

  const { mutate: completeMateri } = useCompleteMateri({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["belajar.progress", id] })
      queryClient.invalidateQueries({ queryKey: ["profile.courses"] })
    },
  })

  // Visiting a materi counts as completing it (mirrors the reference UI's
  // "not yet visited" empty circles). Fire once per materi per mount.
  const firedRef = useRef(new Set())
  useEffect(() => {
    if (!materi || !progress) return
    if (completedSet.has(materi.ID)) return
    if (firedRef.current.has(materi.ID)) return
    firedRef.current.add(materi.ID)
    completeMateri(materi.ID)
  }, [materi, progress, completedSet, completeMateri])

  if (!materi) {
    return (
      <div className="flex flex-1 items-center justify-center p-6">
        <p className="text-muted-foreground text-sm">
          Materi tidak ditemukan.
        </p>
      </div>
    )
  }

  // After the last materi, "next" hands off to the wrap-up quiz. The
  // completion for this very page may still be in-flight, so the quiz link
  // is shown as soon as every OTHER materi is done - the backend re-checks
  // on submit anyway.
  const showQuizNext = isLast && firstQuiz

  return (
    <div className="flex flex-1 flex-col">
      <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-4 px-6 py-8">
        <h1 className="font-heading text-2xl font-bold sm:text-3xl">
          {materi.name}
        </h1>
        <MateriContent content={materi.array_element} />
      </div>

      <div className="bg-background sticky bottom-0 z-20 flex items-center justify-between gap-3 border-t-2 border-black px-4 py-3 dark:border-white">
        {previous ? (
          <Link
            to={`/dashboard/belajar/${id}/materi/${previous.ID}`}
            className={cn(
              "flex items-center gap-1 rounded-lg bg-white px-4 py-2 text-sm font-bold uppercase dark:bg-neutral-900",
              NEO_BORDER,
              NEO_SHADOW,
              NEO_PRESS
            )}
          >
            <ChevronLeft className="size-4" />
            Sebelumnya
          </Link>
        ) : (
          <span
            className={cn(
              "flex items-center gap-1 rounded-lg bg-white px-4 py-2 text-sm font-bold uppercase opacity-40 dark:bg-neutral-900",
              NEO_BORDER
            )}
          >
            <ChevronLeft className="size-4" />
            Sebelumnya
          </span>
        )}

        <span className="text-muted-foreground hidden truncate text-sm font-medium sm:block">
          {materi.name}
        </span>

        {next ? (
          <Link
            to={`/dashboard/belajar/${id}/materi/${next.ID}`}
            className={cn(
              "flex items-center gap-1 rounded-lg bg-eko-primary px-4 py-2 text-sm font-bold text-white uppercase",
              NEO_BORDER,
              NEO_SHADOW,
              NEO_PRESS
            )}
          >
            Selanjutnya
            <ChevronRight className="size-4" />
          </Link>
        ) : showQuizNext ? (
          <Link
            to={`/dashboard/belajar/${id}/kuis/${firstQuiz.ID}`}
            className={cn(
              "flex items-center gap-1 rounded-lg bg-eko-primary px-4 py-2 text-sm font-bold text-white uppercase",
              NEO_BORDER,
              NEO_SHADOW,
              NEO_PRESS
            )}
          >
            <ListChecks className="size-4" />
            Kerjakan Kuis
          </Link>
        ) : (
          <Link
            to={`/dashboard/belajar/${id}`}
            className={cn(
              "flex items-center gap-1 rounded-lg bg-eko-primary px-4 py-2 text-sm font-bold text-white uppercase",
              NEO_BORDER,
              NEO_SHADOW,
              NEO_PRESS
            )}
          >
            Selesai
            <ChevronRight className="size-4" />
          </Link>
        )}
      </div>
    </div>
  )
}

export { RouteErrorBoundary as ErrorBoundary }
