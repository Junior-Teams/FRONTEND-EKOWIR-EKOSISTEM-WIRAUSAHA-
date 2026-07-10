import { GraduationCap, KeyRound, LogOut, User } from "lucide-react"
import { useState } from "react"

import { Breadcrumb } from "@/components/breadcrumb"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useCurrentUser } from "@/hooks/auth/useCurrentUser"
import { useLogout } from "@/hooks/use-logout"
import { getInitials } from "@/lib/current-user"
import { MODULES } from "@/lib/koperasi-modules"
import { NEO_BORDER, NEO_PRESS, NEO_SHADOW } from "@/lib/neobrutalism"
import { cn } from "@/lib/utils"

const inputClass = cn(
  "h-12 rounded-lg bg-white text-base focus-visible:ring-0 dark:bg-neutral-900",
  NEO_BORDER
)

const cardClass = cn(
  "flex flex-col gap-4 rounded-lg bg-white p-5 dark:bg-neutral-900",
  NEO_BORDER,
  NEO_SHADOW
)

export function Component() {
  const logout = useLogout()
  const { data: user } = useCurrentUser()
  const [interests, setInterests] = useState([MODULES[0].id, MODULES[2].id])

  function toggleInterest(id) {
    setInterests((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <Breadcrumb
        items={[{ label: "Beranda", href: "/dashboard" }, { label: "Profile" }]}
      />

      <div
        className={cn(
          "flex flex-col gap-4 rounded-lg bg-white p-5 sm:flex-row sm:items-center sm:justify-between dark:bg-neutral-900",
          NEO_BORDER,
          NEO_SHADOW
        )}
      >
        <div className="flex items-center gap-4">
          {user?.picture ? (
            <img
              src={user.picture}
              alt=""
              className={cn("size-16 shrink-0 rounded-full object-cover", NEO_BORDER)}
            />
          ) : (
            <div
              className={cn(
                "flex size-16 shrink-0 items-center justify-center rounded-full bg-eko-secondary text-xl font-bold",
                NEO_BORDER
              )}
            >
              {getInitials(user?.name)}
            </div>
          )}
          <div>
            <p className="text-muted-foreground text-sm">Halo,</p>
            <h1 className="font-heading text-xl font-bold sm:text-2xl">
              {user?.name ?? "..."}
            </h1>
          </div>
        </div>

        <Button
          variant="outline"
          onClick={logout}
          className={cn(
            "gap-2 self-start rounded-lg bg-white dark:bg-neutral-900",
            NEO_BORDER,
            NEO_SHADOW,
            NEO_PRESS
          )}
        >
          <LogOut className="size-4" />
          Keluar
        </Button>
      </div>

      <Tabs defaultValue="profil">
        <TabsList>
          <TabsTrigger value="profil">
            <User className="size-4" />
            Profil
          </TabsTrigger>
          <TabsTrigger value="password">
            <KeyRound className="size-4" />
            Ganti Password
          </TabsTrigger>
          <TabsTrigger value="minat">
            <GraduationCap className="size-4" />
            Minat Belajar
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profil">
          <div className={cardClass}>
            <div>
              <h2 className="font-heading text-lg font-bold">Informasi Personal</h2>
              <p className="text-muted-foreground text-sm">
                Informasi ini akan digunakan untuk personalisasi pada layanan
                Ekobis.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2" key={user?.id ?? "loading"}>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  defaultValue={user?.username}
                  placeholder="Pilih username kamu"
                  className={inputClass}
                />
                <p className="text-muted-foreground text-xs">
                  Gunakan huruf kecil, angka, titik, underscore, atau minus.
                </p>
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="nama">Nama</Label>
                <Input
                  id="nama"
                  defaultValue={user?.name}
                  className={inputClass}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  defaultValue={user?.email}
                  className={inputClass}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="phone">Nomor Telepon</Label>
                <Input
                  id="phone"
                  type="tel"
                  defaultValue={user?.phone}
                  className={inputClass}
                />
              </div>
            </div>

            <Button
              className={cn(
                "w-fit gap-2 self-start rounded-lg bg-eko-primary text-white hover:bg-eko-primary/90",
                NEO_BORDER,
                NEO_SHADOW,
                NEO_PRESS
              )}
            >
              Simpan Perubahan
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="password">
          <div className={cardClass}>
            <div>
              <h2 className="font-heading text-lg font-bold">Ganti Password</h2>
              <p className="text-muted-foreground text-sm">
                Gunakan password yang kuat dan belum pernah dipakai di layanan
                lain.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <Label htmlFor="current-password">Password Saat Ini</Label>
                <Input id="current-password" type="password" className={inputClass} />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="new-password">Password Baru</Label>
                <Input id="new-password" type="password" className={inputClass} />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="confirm-password">Konfirmasi Password Baru</Label>
                <Input id="confirm-password" type="password" className={inputClass} />
              </div>
            </div>

            <Button
              className={cn(
                "w-fit gap-2 self-start rounded-lg bg-eko-primary text-white hover:bg-eko-primary/90",
                NEO_BORDER,
                NEO_SHADOW,
                NEO_PRESS
              )}
            >
              Simpan Password
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="minat">
          <div className={cardClass}>
            <div>
              <h2 className="font-heading text-lg font-bold">Minat Belajar</h2>
              <p className="text-muted-foreground text-sm">
                Pilih topik yang paling kamu minati agar rekomendasi modul
                lebih sesuai.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {MODULES.map((module) => (
                <button
                  key={module.id}
                  type="button"
                  onClick={() => toggleInterest(module.id)}
                  className={cn(
                    "rounded-lg px-3 py-1.5 text-sm font-bold",
                    NEO_BORDER,
                    NEO_SHADOW,
                    NEO_PRESS,
                    interests.includes(module.id)
                      ? "bg-eko-primary text-white"
                      : "bg-white dark:bg-neutral-900"
                  )}
                >
                  {module.title}
                </button>
              ))}
            </div>

            <Button
              className={cn(
                "w-fit gap-2 self-start rounded-lg bg-eko-primary text-white hover:bg-eko-primary/90",
                NEO_BORDER,
                NEO_SHADOW,
                NEO_PRESS
              )}
            >
              Simpan Minat
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
