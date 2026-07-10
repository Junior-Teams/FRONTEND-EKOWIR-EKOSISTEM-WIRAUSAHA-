import { Breadcrumb } from "@/components/breadcrumb"

export function Component() {
  return (
    <div className="flex flex-1 flex-col gap-4">
      <Breadcrumb
        items={[{ label: "Beranda", href: "/dashboard" }, { label: "Profile" }]}
      />

      <div className="flex flex-1 flex-col items-center justify-center gap-2 text-center">
        <h1 className="text-2xl font-semibold">Profile</h1>
        <p className="text-muted-foreground text-sm">
          Informasi profil akan tampil di sini.
        </p>
      </div>
    </div>
  )
}
