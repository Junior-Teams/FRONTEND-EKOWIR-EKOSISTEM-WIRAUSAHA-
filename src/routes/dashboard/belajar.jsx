import { BookOpen, GraduationCap } from "lucide-react"
import { Link } from "react-router"

import { Breadcrumb } from "@/components/breadcrumb"
import { Skeleton } from "@/components/ui/skeleton"
import { useModulesQuery } from "@/hooks/admin/useModuleAdmin"
import { NEO_BORDER, NEO_PRESS, NEO_SHADOW } from "@/lib/neobrutalism"
import { getStorageUrl } from "@/lib/storage"
import { cn } from "@/lib/utils"

export function Component() {
  const { data: modules, isLoading } = useModulesQuery()

  return (
    <div className="flex flex-col gap-4">
      <Breadcrumb
        items={[{ label: "Beranda", href: "/dashboard" }, { label: "Belajar" }]}
      />

      <div>
        <h1 className="font-heading text-2xl font-bold">Belajar</h1>
        <p className="text-muted-foreground text-sm">
          Modul pembelajaran seputar pengelolaan koperasi, dari dasar hingga lanjutan.
        </p>
      </div>

      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-64 w-full" />
          ))}
        </div>
      ) : modules?.length ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {modules.map((module) => (
            <Link
              key={module.ID}
              to={`/dashboard/belajar/${module.ID}`}
              className={cn(
                "flex flex-col overflow-hidden rounded-lg bg-white dark:bg-neutral-900",
                NEO_BORDER,
                NEO_SHADOW,
                NEO_PRESS
              )}
            >
              <div className="flex items-center justify-between border-b-2 border-black px-3 py-2 dark:border-white">
                <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase">
                  <GraduationCap className="size-3.5" />
                  Modul
                </span>
                <span
                  className={cn(
                    "rounded-full bg-eko-secondary px-2 py-0.5 text-[10px] font-bold uppercase",
                    NEO_BORDER
                  )}
                >
                  {module.code_module}
                </span>
              </div>

              <img
                src={getStorageUrl(module.image)}
                alt={module.name_module}
                className="h-32 w-full border-b-2 border-black object-cover dark:border-white"
              />

              <div className="flex flex-1 flex-col gap-2 p-4">
                <h3 className="font-heading text-base leading-snug font-bold">
                  {module.name_module}
                </h3>
                <p className="text-muted-foreground line-clamp-3 flex-1 text-sm">
                  {module.description_module}
                </p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div
          className={cn(
            "flex flex-col items-center gap-2 rounded-lg bg-white p-10 text-center dark:bg-neutral-900",
            NEO_BORDER,
            NEO_SHADOW
          )}
        >
          <BookOpen className="text-muted-foreground size-8" />
          <p className="text-muted-foreground text-sm">Belum ada modul pembelajaran.</p>
        </div>
      )}
    </div>
  )
}
