import { Navigate, useParams } from "react-router"

import { Breadcrumb } from "@/components/breadcrumb"
import {
  getModuleImage,
  LEVEL_BADGE,
  MODULES,
} from "@/lib/koperasi-modules"
import { NEO_BORDER, NEO_SHADOW } from "@/lib/neobrutalism"
import { cn } from "@/lib/utils"

export function Component() {
  const { id } = useParams()
  const module = MODULES.find((item) => String(item.id) === id)

  if (!module) {
    return <Navigate to="/dashboard/belajar" replace />
  }

  const Icon = module.icon

  return (
    <div className="flex flex-col gap-4">
      <Breadcrumb
        backHref="/dashboard/belajar"
        items={[
          { label: "Beranda", href: "/dashboard" },
          { label: "Belajar", href: "/dashboard/belajar" },
          { label: module.title },
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
          src={getModuleImage(module.id)}
          alt={module.title}
          className="h-48 w-full border-b-2 border-black object-cover dark:border-white sm:h-64"
        />

        <div className="flex flex-col gap-3 p-5">
          <div className="flex flex-wrap items-center gap-3">
            <div
              className={cn(
                "flex size-12 shrink-0 items-center justify-center rounded-lg",
                NEO_BORDER,
                module.color
              )}
            >
              <Icon className="size-6" strokeWidth={1.5} />
            </div>
            <div>
              <h1 className="font-heading text-xl font-bold sm:text-2xl">
                {module.title}
              </h1>
              <p className="text-muted-foreground text-sm">{module.description}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 text-xs font-bold uppercase">
            <span
              className={cn(
                "rounded-full px-2 py-1",
                NEO_BORDER,
                LEVEL_BADGE[module.level]
              )}
            >
              {module.level}
            </span>
            <span
              className={cn(
                "rounded-full bg-white px-2 py-1 dark:bg-neutral-900",
                NEO_BORDER
              )}
            >
              {module.materials.length} Materi
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="font-heading text-lg font-bold">Daftar Materi</h2>
        <div className="flex flex-col gap-3">
          {module.materials.map((title, index) => (
            <div
              key={title}
              className={cn(
                "flex items-center gap-4 rounded-lg bg-white p-4 dark:bg-neutral-900",
                NEO_BORDER,
                NEO_SHADOW
              )}
            >
              <div
                className={cn(
                  "flex size-9 shrink-0 items-center justify-center rounded-lg bg-blue-100 font-bold dark:bg-blue-950",
                  NEO_BORDER
                )}
              >
                {index + 1}
              </div>
              <span className="flex-1 font-medium">{title}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
