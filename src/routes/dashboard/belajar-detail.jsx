import {
  CheckCircle2,
  Circle,
  FileText,
  ListChecks,
  Lock,
  Play,
  Sparkles,
} from "lucide-react"
import { Link, useParams } from "react-router"

import { Breadcrumb } from "@/components/breadcrumb"
import { ProgressBar } from "@/components/ui/progress-bar"
import { Skeleton } from "@/components/ui/skeleton"
import { useMaterisQuery } from "@/hooks/admin/useMateriAdmin"
import { useModuleQuery } from "@/hooks/admin/useModuleAdmin"
import { useQuizzesQuery } from "@/hooks/admin/useQuizAdmin"
import { useModuleProgressQuery } from "@/hooks/belajar/useMateriProgress"
import { NEO_BORDER, NEO_PRESS, NEO_SHADOW } from "@/lib/neobrutalism"
import { getStorageUrl } from "@/lib/storage"
import { cn } from "@/lib/utils"

export function Component() {
  const { id } = useParams()

  const { data: module, isLoading: isModuleLoading, isError } = useModuleQuery(id)
  const { data: materis, isLoading: isMaterisLoading } = useMaterisQuery({
    idModule: id,
  })
  const { data: quizzes, isLoading: isQuizzesLoading } = useQuizzesQuery({
    idModule: id,
  })
  const { data: progress } = useModuleProgressQuery(id)

  const completedSet = new Set(progress?.completed_materi_ids ?? [])
  const completedCount = completedSet.size
  const totalMateri = materis?.length ?? 0
  const allMateriCompleted = Boolean(progress?.all_materi_completed)
  const quizCompletedSet = new Set(
    (progress?.quizzes ?? [])
      .filter((quiz) => quiz.completed)
      .map((quiz) => quiz.id_quiz)
  )

  const hasStarted = completedCount > 0
  const ctaLabel = !hasStarted
    ? "Mulai Belajar"
    : allMateriCompleted
      ? "Baca Ulang Materi"
      : "Lanjutkan Belajar"

  if (isModuleLoading) {
    return (
      <div className="flex flex-col gap-4">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-64 w-full" />
      </div>
    )
  }

  if (isError || !module) {
    return (
      <div className="flex flex-col gap-4">
        <Breadcrumb
          backHref="/dashboard/belajar"
          items={[
            { label: "Beranda", href: "/dashboard" },
            { label: "Belajar", href: "/dashboard/belajar" },
            { label: "Modul tidak ditemukan" },
          ]}
        />
        <div
          className={cn(
            "rounded-lg bg-white p-10 text-center dark:bg-neutral-900",
            NEO_BORDER,
            NEO_SHADOW
          )}
        >
          <p className="text-muted-foreground text-sm">
            Modul yang kamu cari tidak ditemukan.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <Breadcrumb
        backHref="/dashboard/belajar"
        items={[
          { label: "Beranda", href: "/dashboard" },
          { label: "Belajar", href: "/dashboard/belajar" },
          { label: module.name_module },
        ]}
      />

      <div
        className={cn(
          "overflow-hidden rounded-lg bg-white dark:bg-neutral-900",
          NEO_BORDER,
          NEO_SHADOW
        )}
      >
        <img
          src={getStorageUrl(module.image)}
          alt={module.name_module}
          className="h-48 w-full border-b-2 border-black object-cover dark:border-white sm:h-64"
        />

        <div className="flex flex-col gap-3 p-5">
          <div>
            <span
              className={cn(
                "rounded-full bg-eko-secondary px-2 py-1 text-xs font-bold uppercase",
                NEO_BORDER
              )}
            >
              {module.code_module}
            </span>
          </div>
          <h1 className="font-heading text-xl font-bold sm:text-2xl">
            {module.name_module}
          </h1>
          <p className="text-muted-foreground text-sm whitespace-pre-line">
            {module.description_module}
          </p>
        </div>
      </div>

      <div
        className={cn(
          "flex flex-col gap-4 rounded-lg bg-white p-5 dark:bg-neutral-900",
          NEO_BORDER,
          NEO_SHADOW
        )}
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="font-heading text-lg font-bold">Progres Belajar</h2>
            <p className="text-muted-foreground text-sm">
              {totalMateri
                ? `${completedCount} dari ${totalMateri} materi selesai`
                : "Belum ada materi untuk modul ini."}
            </p>
          </div>

          {totalMateri > 0 && (
            <Link
              to={`/dashboard/belajar/${id}/materi`}
              className={cn(
                "flex items-center gap-2 rounded-lg bg-eko-primary px-5 py-2.5 text-sm font-bold text-white uppercase",
                NEO_BORDER,
                NEO_SHADOW,
                NEO_PRESS
              )}
            >
              <Play className="size-4" />
              {ctaLabel}
            </Link>
          )}
        </div>

        {totalMateri > 0 && (
          <ProgressBar
            value={totalMateri ? (completedCount / totalMateri) * 100 : 0}
          />
        )}
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="font-heading text-lg font-bold">Daftar Materi</h2>

        {isMaterisLoading ? (
          <Skeleton className="h-32 w-full" />
        ) : materis?.length ? (
          <div
            className={cn(
              "flex flex-col divide-y-2 divide-black overflow-hidden rounded-lg bg-white dark:divide-white dark:bg-neutral-900",
              NEO_BORDER,
              NEO_SHADOW
            )}
          >
            {materis.map((materi, index) => {
              const isDone = completedSet.has(materi.ID)
              return (
                <Link
                  key={materi.ID}
                  to={`/dashboard/belajar/${id}/materi/${materi.ID}`}
                  className="hover:bg-muted/50 flex items-center gap-4 p-4"
                >
                  <div
                    className={cn(
                      "flex size-9 shrink-0 items-center justify-center rounded-lg bg-blue-100 font-bold dark:bg-blue-950",
                      NEO_BORDER
                    )}
                  >
                    {index + 1}
                  </div>
                  <FileText className="text-muted-foreground size-4 shrink-0" />
                  <span className="flex-1 font-medium">{materi.name}</span>
                  {isDone ? (
                    <CheckCircle2 className="size-5 shrink-0 text-emerald-600" />
                  ) : (
                    <Circle className="text-muted-foreground size-5 shrink-0" />
                  )}
                </Link>
              )
            })}
          </div>
        ) : (
          <p className="text-muted-foreground text-sm">
            Belum ada materi untuk modul ini.
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="font-heading text-lg font-bold">Kuis Wrap-Up</h2>

        {isQuizzesLoading ? (
          <Skeleton className="h-24 w-full" />
        ) : quizzes?.length ? (
          <div className="flex flex-col gap-3">
            {quizzes.map((quiz) => {
              const isDone = quizCompletedSet.has(quiz.ID)
              const isLocked = !allMateriCompleted
              return (
                <div
                  key={quiz.ID}
                  className={cn(
                    "flex flex-wrap items-center justify-between gap-3 rounded-lg bg-white p-4 dark:bg-neutral-900",
                    NEO_BORDER,
                    NEO_SHADOW,
                    isLocked && "opacity-70"
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={cn(
                        "flex size-10 shrink-0 items-center justify-center rounded-lg bg-eko-tertiary",
                        NEO_BORDER
                      )}
                    >
                      <ListChecks className="size-5" />
                    </div>
                    <div>
                      <h3 className="font-heading flex items-center gap-2 text-base font-bold">
                        {quiz.title}
                        {isDone && (
                          <CheckCircle2 className="size-4 text-emerald-600" />
                        )}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {quiz.description}
                      </p>
                      <p className="mt-1 inline-flex items-center gap-1 text-xs font-bold uppercase">
                        <Sparkles className="size-3.5" />
                        Bonus {quiz.bonus_xp} XP &middot; Lulus min. skor{" "}
                        {quiz.passing_score}%
                      </p>
                    </div>
                  </div>

                  {isLocked ? (
                    <span
                      className={cn(
                        "flex shrink-0 items-center gap-2 rounded-lg bg-neutral-200 px-4 py-2 text-sm font-bold uppercase dark:bg-neutral-800",
                        NEO_BORDER
                      )}
                      title="Selesaikan semua materi untuk membuka kuis"
                    >
                      <Lock className="size-4" />
                      Terkunci
                    </span>
                  ) : (
                    <Link
                      to={`/dashboard/belajar/${id}/kuis/${quiz.ID}`}
                      className={cn(
                        "shrink-0 rounded-lg bg-eko-primary px-4 py-2 text-sm font-bold text-white uppercase",
                        NEO_BORDER,
                        NEO_SHADOW,
                        NEO_PRESS
                      )}
                    >
                      {isDone ? "Ulangi Kuis" : "Mulai Kuis"}
                    </Link>
                  )}
                </div>
              )
            })}
          </div>
        ) : (
          <p className="text-muted-foreground text-sm">
            Belum ada kuis untuk modul ini.
          </p>
        )}
      </div>
    </div>
  )
}
