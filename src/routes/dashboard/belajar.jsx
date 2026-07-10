import { useState } from "react"
import { GraduationCap } from "lucide-react"
import { Link } from "react-router"

import { Breadcrumb } from "@/components/breadcrumb"
import {
  getModuleImage,
  LEVEL_BADGE,
  LEVELS,
  MODULES,
} from "@/lib/koperasi-modules"
import { NEO_BORDER, NEO_PRESS, NEO_SHADOW } from "@/lib/neobrutalism"
import { cn } from "@/lib/utils"

export function Component() {
  const [level, setLevel] = useState("Semua")

  const modules =
    level === "Semua" ? MODULES : MODULES.filter((item) => item.level === level)

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

      <div className="flex flex-wrap gap-2">
        {LEVELS.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setLevel(item)}
            className={cn(
              "rounded-lg px-3 py-1.5 text-sm font-bold uppercase",
              NEO_BORDER,
              NEO_SHADOW,
              NEO_PRESS,
              level === item
                ? "bg-eko-primary text-white"
                : "bg-white dark:bg-neutral-900"
            )}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {modules.map((item) => (
          <Link
            key={item.id}
            to={`/dashboard/belajar/${item.id}`}
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
                  "rounded-full px-2 py-0.5 text-[10px] font-bold uppercase",
                  NEO_BORDER,
                  LEVEL_BADGE[item.level]
                )}
              >
                {item.level}
              </span>
            </div>

            <img
              src={getModuleImage(item.id)}
              alt={item.title}
              className="h-32 w-full border-b-2 border-black object-cover dark:border-white"
            />

            <div className="flex flex-1 flex-col gap-2 p-4">
              <h3 className="font-heading text-base leading-snug font-bold">
                {item.title}
              </h3>
              <p className="text-muted-foreground line-clamp-3 flex-1 text-sm">
                {item.description}
              </p>
              <div className="mt-2 flex items-center justify-between border-t-2 border-black pt-3 text-xs font-bold uppercase dark:border-white">
                <span>{item.materials.length} Pelajaran</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
