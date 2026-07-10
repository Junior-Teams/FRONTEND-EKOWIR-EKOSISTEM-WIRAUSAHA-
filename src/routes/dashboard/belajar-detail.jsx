import { useState } from "react"
import { ChevronDown, ListChecks, Sparkles } from "lucide-react"
import { Link, useParams } from "react-router"

import { Breadcrumb } from "@/components/breadcrumb"
import { Skeleton } from "@/components/ui/skeleton"
import { useMaterisQuery } from "@/hooks/admin/useMateriAdmin"
import { useModuleQuery } from "@/hooks/admin/useModuleAdmin"
import { useQuizzesQuery } from "@/hooks/admin/useQuizAdmin"
import { NEO_BORDER, NEO_PRESS, NEO_SHADOW } from "@/lib/neobrutalism"
import { getStorageUrl } from "@/lib/storage"
import { cn } from "@/lib/utils"

export function Component() {
  const { id } = useParams()
  const [openMateriId, setOpenMateriId] = useState(null)

  const { data: module, isLoading: isModuleLoading, isError } = useModuleQuery(id)
  const { data: materis, isLoading: isMaterisLoading } = useMaterisQuery({
    idModule: id,
  })
  const { data: quizzes, isLoading: isQuizzesLoading } = useQuizzesQuery({
    idModule: id,
  })

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

      <div className="flex flex-col gap-2">
        <h2 className="font-heading text-lg font-bold">Daftar Materi</h2>

        {isMaterisLoading ? (
          <Skeleton className="h-32 w-full" />
        ) : materis?.length ? (
          <div className="flex flex-col gap-3">
            {materis.map((materi, index) => {
              const isOpen = openMateriId === materi.ID
              return (
                <div
                  key={materi.ID}
                  className={cn(
                    "overflow-hidden rounded-lg bg-white dark:bg-neutral-900",
                    NEO_BORDER,
                    NEO_SHADOW
                  )}
                >
                  <button
                    type="button"
                    onClick={() => setOpenMateriId(isOpen ? null : materi.ID)}
                    className="flex w-full items-center gap-4 p-4 text-left"
                  >
                    <div
                      className={cn(
                        "flex size-9 shrink-0 items-center justify-center rounded-lg bg-blue-100 font-bold dark:bg-blue-950",
                        NEO_BORDER
                      )}
                    >
                      {index + 1}
                    </div>
                    <span className="flex-1 font-medium">{materi.name}</span>
                    <ChevronDown
                      className={cn(
                        "size-4 shrink-0 transition-transform",
                        isOpen && "rotate-180"
                      )}
                    />
                  </button>
                  {isOpen && (
                    <p className="text-muted-foreground border-t-2 border-black p-4 text-sm whitespace-pre-line dark:border-white">
                      {materi.array_element}
                    </p>
                  )}
                </div>
              )
            })}
          </div>
        ) : (
          <p className="text-muted-foreground text-sm">Belum ada materi untuk modul ini.</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="font-heading text-lg font-bold">Kuis</h2>

        {isQuizzesLoading ? (
          <Skeleton className="h-24 w-full" />
        ) : quizzes?.length ? (
          <div className="flex flex-col gap-3">
            {quizzes.map((quiz) => (
              <div
                key={quiz.ID}
                className={cn(
                  "flex flex-wrap items-center justify-between gap-3 rounded-lg bg-white p-4 dark:bg-neutral-900",
                  NEO_BORDER,
                  NEO_SHADOW
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
                    <h3 className="font-heading text-base font-bold">{quiz.title}</h3>
                    <p className="text-muted-foreground text-sm">{quiz.description}</p>
                    <p className="mt-1 inline-flex items-center gap-1 text-xs font-bold uppercase">
                      <Sparkles className="size-3.5" />
                      Bonus {quiz.bonus_xp} XP &middot; Lulus min. skor {quiz.passing_score}
                    </p>
                  </div>
                </div>
                <Link
                  to={`/dashboard/belajar/${id}/kuis/${quiz.ID}`}
                  className={cn(
                    "shrink-0 rounded-lg bg-eko-primary px-4 py-2 text-sm font-bold text-white uppercase",
                    NEO_BORDER,
                    NEO_SHADOW,
                    NEO_PRESS
                  )}
                >
                  Mulai Kuis
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground text-sm">Belum ada kuis untuk modul ini.</p>
        )}
      </div>
    </div>
  )
}
