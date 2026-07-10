import { useMemo, useState } from "react"
import {
  CheckCircle2,
  ChevronLeft,
  RotateCcw,
  Sparkles,
  XCircle,
} from "lucide-react"
import toast from "react-hot-toast"
import { Link, useParams } from "react-router"

import { Breadcrumb } from "@/components/breadcrumb"
import { Skeleton } from "@/components/ui/skeleton"
import { useModuleQuery } from "@/hooks/admin/useModuleAdmin"
import { useQuizQuery } from "@/hooks/admin/useQuizAdmin"
import {
  useQuestionsQuery,
  useSubmitQuiz,
} from "@/hooks/belajar/useQuizAttempt"
import { NEO_BORDER, NEO_PRESS, NEO_SHADOW } from "@/lib/neobrutalism"
import { cn } from "@/lib/utils"

const OPTION_LETTERS = "ABCDEFGH"

export function Component() {
  const { id, quizId } = useParams()
  const moduleHref = `/dashboard/belajar/${id}`

  const { data: module } = useModuleQuery(id)
  const { data: quiz, isLoading: isQuizLoading } = useQuizQuery(quizId)
  const { data: questions, isLoading: isQuestionsLoading } = useQuestionsQuery({
    idQuiz: quizId,
  })

  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [result, setResult] = useState(null)

  const { mutate: submitQuiz, isPending: isSubmitting } = useSubmitQuiz({
    onSuccess: (data) => setResult(data),
    onError: (error) => {
      toast.error(error.response?.data?.error ?? "Gagal mengirim jawaban")
    },
  })

  const currentQuestion = questions?.[currentIndex]
  const total = questions?.length ?? 0
  const isLast = currentIndex === total - 1
  const canProceed = currentQuestion ? Boolean(answers[currentQuestion.id]) : false

  const progressPercent = useMemo(() => {
    if (!total) return 0
    return ((currentIndex + 1) / total) * 100
  }, [currentIndex, total])

  function selectOption(optionId) {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: optionId }))
  }

  function goToPrevious() {
    setCurrentIndex((prev) => Math.max(0, prev - 1))
  }

  function goToNext() {
    if (!canProceed) return
    if (!isLast) {
      setCurrentIndex((prev) => prev + 1)
      return
    }
    const payload = questions.map((question) => ({
      question_id: question.id,
      option_id: answers[question.id],
    }))
    submitQuiz({ id: quizId, answers: payload })
  }

  function retryQuiz() {
    setCurrentIndex(0)
    setAnswers({})
    setResult(null)
  }

  const isLoading = isQuizLoading || isQuestionsLoading

  return (
    <div className="flex flex-col gap-4">
      <Breadcrumb
        backHref={moduleHref}
        items={[
          { label: "Beranda", href: "/dashboard" },
          { label: "Belajar", href: "/dashboard/belajar" },
          { label: module?.name_module ?? "Modul", href: moduleHref },
          { label: quiz?.title ?? "Kuis" },
        ]}
      />

      {isLoading ? (
        <>
          <Skeleton className="h-3 w-full" />
          <Skeleton className="mx-auto h-96 w-full max-w-2xl" />
        </>
      ) : !total ? (
        <div
          className={cn(
            "rounded-lg bg-white p-10 text-center dark:bg-neutral-900",
            NEO_BORDER,
            NEO_SHADOW
          )}
        >
          <p className="text-muted-foreground text-sm">
            Kuis ini belum memiliki soal.
          </p>
        </div>
      ) : result ? (
        <div
          className={cn(
            "mx-auto flex w-full max-w-2xl flex-col items-center gap-4 rounded-lg bg-white p-8 text-center dark:bg-neutral-900",
            NEO_BORDER,
            NEO_SHADOW
          )}
        >
          {result.passed ? (
            <CheckCircle2 className="size-14 text-emerald-500" />
          ) : (
            <XCircle className="text-destructive size-14" />
          )}

          <div>
            <h1 className="font-heading text-2xl font-bold">
              {result.passed ? "Selamat, kamu lulus!" : "Belum lulus"}
            </h1>
            <p className="text-muted-foreground text-sm">
              Skor kamu {result.score} dari {result.total_questions} soal benar
              {result.total_questions
                ? ` (${Math.round((result.score / result.total_questions) * 100)}%)`
                : ""}
              {quiz?.passing_score ? `, minimal lulus ${quiz.passing_score}%` : ""}.
            </p>
          </div>

          {result.already_completed ? (
            <p className="text-muted-foreground text-sm">
              Kuis ini sudah pernah kamu selesaikan sebelumnya, XP hanya diberikan sekali.
            </p>
          ) : result.passed ? (
            <p
              className={cn(
                "inline-flex items-center gap-1 rounded-full bg-eko-tertiary px-3 py-1 text-sm font-bold uppercase",
                NEO_BORDER
              )}
            >
              <Sparkles className="size-4" />
              +{result.xp_earned} XP
            </p>
          ) : null}

          <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={retryQuiz}
              className={cn(
                "inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-bold uppercase dark:bg-neutral-900",
                NEO_BORDER,
                NEO_SHADOW,
                NEO_PRESS
              )}
            >
              <RotateCcw className="size-4" />
              Ulangi Kuis
            </button>
            <Link
              to={moduleHref}
              className={cn(
                "rounded-lg bg-eko-primary px-4 py-2 text-sm font-bold text-white uppercase",
                NEO_BORDER,
                NEO_SHADOW,
                NEO_PRESS
              )}
            >
              Kembali ke Modul
            </Link>
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={goToPrevious}
              disabled={currentIndex === 0}
              aria-label="Soal sebelumnya"
              className={cn(
                "flex size-8 shrink-0 items-center justify-center rounded-lg bg-white disabled:opacity-40 dark:bg-neutral-900",
                NEO_BORDER,
                NEO_SHADOW,
                NEO_PRESS
              )}
            >
              <ChevronLeft className="size-4" />
            </button>

            <div
              className={cn(
                "h-3 flex-1 overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-800",
                NEO_BORDER
              )}
            >
              <div
                className="h-full bg-eko-primary transition-all"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <span className="shrink-0 text-sm font-bold">
              {currentIndex + 1}/{total}
            </span>
          </div>

          <div
            className={cn(
              "mx-auto flex w-full max-w-2xl flex-col gap-4 rounded-lg bg-white p-6 dark:bg-neutral-900",
              NEO_BORDER,
              NEO_SHADOW
            )}
          >
            <div>
              <span
                className={cn(
                  "rounded-full bg-eko-secondary px-2 py-0.5 text-xs font-bold uppercase",
                  NEO_BORDER
                )}
              >
                Soal {currentIndex + 1}
              </span>
            </div>

            <p className="text-base leading-relaxed font-medium">
              {currentQuestion.question_text}
            </p>

            <div className="flex flex-col gap-3">
              {currentQuestion.options.map((option, index) => {
                const isSelected = answers[currentQuestion.id] === option.id
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => selectOption(option.id)}
                    className={cn(
                      "flex items-center gap-3 rounded-lg bg-white p-4 text-left dark:bg-neutral-900",
                      NEO_BORDER,
                      isSelected && "bg-eko-primary/10 ring-2 ring-eko-primary"
                    )}
                  >
                    <div
                      className={cn(
                        "flex size-8 shrink-0 items-center justify-center rounded-full font-bold",
                        NEO_BORDER,
                        isSelected ? "bg-eko-primary text-white" : "bg-white dark:bg-neutral-900"
                      )}
                    >
                      {OPTION_LETTERS[index]}
                    </div>
                    <span className="flex-1 text-sm font-medium">
                      {option.option_text}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="sticky bottom-0 -mx-4 flex items-center justify-between gap-3 border-t-2 border-black bg-background px-4 py-3 dark:border-white">
            <button
              type="button"
              onClick={goToPrevious}
              disabled={currentIndex === 0}
              className={cn(
                "rounded-lg bg-white px-4 py-2 text-sm font-bold uppercase disabled:opacity-40 dark:bg-neutral-900",
                NEO_BORDER,
                NEO_SHADOW,
                NEO_PRESS
              )}
            >
              Sebelumnya
            </button>
            <button
              type="button"
              onClick={goToNext}
              disabled={!canProceed || isSubmitting}
              className={cn(
                "rounded-lg bg-eko-primary px-4 py-2 text-sm font-bold text-white uppercase disabled:opacity-40",
                NEO_BORDER,
                NEO_SHADOW,
                NEO_PRESS
              )}
            >
              {isLast ? (isSubmitting ? "Mengirim..." : "Submit Jawaban") : "Selanjutnya"}
            </button>
          </div>
        </>
      )}
    </div>
  )
}
