import {
  ArrowLeft,
  CheckCircle2,
  Circle,
  FileText,
  ListChecks,
  Lock,
} from "lucide-react"
import { Link, Navigate, Outlet, useLocation, useParams } from "react-router"

import { ModeToggle } from "@/components/mode-toggle"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Skeleton } from "@/components/ui/skeleton"
import { TooltipProvider } from "@/components/ui/tooltip"
import { useMaterisQuery } from "@/hooks/admin/useMateriAdmin"
import { useModuleQuery } from "@/hooks/admin/useModuleAdmin"
import { useQuizzesQuery } from "@/hooks/admin/useQuizAdmin"
import { useModuleProgressQuery } from "@/hooks/belajar/useMateriProgress"
import { cn } from "@/lib/utils"
import { RouteErrorBoundary } from "@/routes/route-error-boundary"

export function Component() {
  const { id, materiId } = useParams()
  const { pathname } = useLocation()

  const { data: module, isLoading: isModuleLoading } = useModuleQuery(id)
  const { data: materis, isLoading: isMaterisLoading } = useMaterisQuery({
    idModule: id,
  })
  const { data: quizzes } = useQuizzesQuery({ idModule: id })
  const { data: progress } = useModuleProgressQuery(id)

  const overviewHref = `/dashboard/belajar/${id}`
  const completedSet = new Set(progress?.completed_materi_ids ?? [])
  const allMateriCompleted = Boolean(progress?.all_materi_completed)
  const quizCompletedSet = new Set(
    (progress?.quizzes ?? [])
      .filter((quiz) => quiz.completed)
      .map((quiz) => quiz.id_quiz)
  )

  // /belajar/:id/materi without a materiId: jump to the first unfinished
  // materi (or the first one) once the list is available.
  if (!materiId && materis?.length) {
    const target =
      materis.find((materi) => !completedSet.has(materi.ID)) ?? materis[0]
    return <Navigate to={`${pathname.replace(/\/$/, "")}/${target.ID}`} replace />
  }

  const isLoading = isModuleLoading || isMaterisLoading

  return (
    <TooltipProvider>
      <SidebarProvider>
        <Sidebar className="border-r-2 border-black dark:border-white">
          <SidebarHeader className="gap-3 border-b-2 border-black p-4 dark:border-white">
            <Link
              to={overviewHref}
              className="flex items-center gap-2 text-sm font-bold hover:underline"
            >
              <ArrowLeft className="size-4" />
              Course Overview
            </Link>
            {module?.name_module && (
              <p className="font-heading text-base leading-snug font-bold">
                {module.name_module}
              </p>
            )}
          </SidebarHeader>

          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel className="text-xs font-bold tracking-wider uppercase">
                Materi
              </SidebarGroupLabel>
              <SidebarGroupContent>
                {isMaterisLoading ? (
                  <div className="flex flex-col gap-2 p-2">
                    {Array.from({ length: 4 }).map((_, index) => (
                      <Skeleton key={index} className="h-8 w-full" />
                    ))}
                  </div>
                ) : (
                  <SidebarMenu className="gap-1">
                    {materis?.map((materi) => {
                      const isDone = completedSet.has(materi.ID)
                      const isActive = String(materi.ID) === materiId
                      return (
                        <SidebarMenuItem key={materi.ID}>
                          <SidebarMenuButton
                            render={
                              <Link
                                to={`/dashboard/belajar/${id}/materi/${materi.ID}`}
                              />
                            }
                            isActive={isActive}
                            size="lg"
                            className="gap-2.5 font-medium data-active:bg-eko-primary data-active:text-white data-active:hover:bg-eko-primary data-active:hover:text-white"
                          >
                            {isDone ? (
                              <CheckCircle2
                                className={cn(
                                  "shrink-0",
                                  isActive ? "text-white" : "text-emerald-600"
                                )}
                              />
                            ) : (
                              <Circle className="text-muted-foreground shrink-0" />
                            )}
                            <FileText className="shrink-0" />
                            <span>{materi.name}</span>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      )
                    })}
                  </SidebarMenu>
                )}
              </SidebarGroupContent>
            </SidebarGroup>

            {Boolean(quizzes?.length) && (
              <SidebarGroup>
                <SidebarGroupLabel className="text-xs font-bold tracking-wider uppercase">
                  Wrap-Up
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu className="gap-1">
                    {quizzes.map((quiz) => {
                      const isDone = quizCompletedSet.has(quiz.ID)
                      const isLocked = !allMateriCompleted
                      return (
                        <SidebarMenuItem key={quiz.ID}>
                          {isLocked ? (
                            <SidebarMenuButton
                              size="lg"
                              aria-disabled
                              title="Selesaikan semua materi untuk membuka kuis"
                              className="gap-2.5 font-medium"
                            >
                              <Lock className="text-muted-foreground shrink-0" />
                              <ListChecks className="shrink-0" />
                              <span>{quiz.title}</span>
                            </SidebarMenuButton>
                          ) : (
                            <SidebarMenuButton
                              render={
                                <Link
                                  to={`/dashboard/belajar/${id}/kuis/${quiz.ID}`}
                                />
                              }
                              size="lg"
                              className="gap-2.5 font-medium"
                            >
                              {isDone ? (
                                <CheckCircle2 className="shrink-0 text-emerald-600" />
                              ) : (
                                <Circle className="text-muted-foreground shrink-0" />
                              )}
                              <ListChecks className="shrink-0" />
                              <span>{quiz.title}</span>
                            </SidebarMenuButton>
                          )}
                        </SidebarMenuItem>
                      )
                    })}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            )}
          </SidebarContent>
        </Sidebar>

        <SidebarInset>
          <header className="bg-background sticky top-0 z-20 flex items-center justify-between border-b-2 border-black px-4 py-3 dark:border-white">
            <div className="flex items-center gap-2">
              <SidebarTrigger />
              <span className="text-sm font-bold">
                {module?.name_module ?? "Memuat..."}
              </span>
            </div>
            <ModeToggle />
          </header>

          {isLoading ? (
            <div className="flex flex-col gap-4 p-6">
              <Skeleton className="h-8 w-64" />
              <Skeleton className="h-96 w-full" />
            </div>
          ) : !materis?.length ? (
            <div className="flex flex-1 items-center justify-center p-6">
              <p className="text-muted-foreground text-sm">
                Belum ada materi untuk modul ini.
              </p>
            </div>
          ) : (
            <Outlet
              context={{ module, materis, quizzes, progress, completedSet }}
            />
          )}
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  )
}

export { RouteErrorBoundary as ErrorBoundary }
