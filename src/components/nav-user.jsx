import {
  ChevronsUpDown,
  History,
  LogOut,
  Moon,
  Sun,
  Ticket,
  User,
} from "lucide-react"
import { Link } from "react-router"

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { Switch } from "@/components/ui/switch"
import { useCurrentUser } from "@/hooks/auth/useCurrentUser"
import { useLogout } from "@/hooks/use-logout"
import { useTheme } from "@/hooks/use-theme"
import { getInitials } from "@/lib/current-user"
import { NEO_BORDER, NEO_SHADOW } from "@/lib/neobrutalism"
import { cn } from "@/lib/utils"

const menuItemClass =
  "flex w-full items-center gap-2 rounded-md px-2 py-2 text-left text-sm font-medium hover:bg-muted"

export function NavUser() {
  const { theme, setTheme } = useTheme()
  const logout = useLogout()
  const { data: user } = useCurrentUser()

  return (
    <SidebarMenuItem>
      <Popover>
        <SidebarMenuButton size="lg" render={<PopoverTrigger />} className="gap-3">
          {user?.picture ? (
            <img
              src={user.picture}
              alt=""
              className={cn("size-8 shrink-0 rounded-full object-cover", NEO_BORDER)}
            />
          ) : (
            <div
              className={cn(
                "flex size-8 shrink-0 items-center justify-center rounded-full bg-eko-secondary text-xs font-bold",
                NEO_BORDER
              )}
            >
              {getInitials(user?.name)}
            </div>
          )}
          <div className="grid flex-1 text-left leading-tight">
            <span className="truncate font-semibold">{user?.name ?? "..."}</span>
            <span className="text-muted-foreground truncate text-xs">
              {user?.email ?? ""}
            </span>
          </div>
          <ChevronsUpDown className="ml-auto size-4 shrink-0" />
        </SidebarMenuButton>

        <PopoverContent
          side="top"
          align="start"
          className={cn(
            "w-64 rounded-lg bg-white p-1.5 dark:bg-neutral-900",
            NEO_BORDER,
            NEO_SHADOW
          )}
        >
          <Link to="/dashboard/profile" className={menuItemClass}>
            <User className="size-4" />
            Profil Saya
          </Link>
          <button type="button" className={menuItemClass}>
            <Ticket className="size-4" />
            Voucher Saya
          </button>
          <button type="button" className={menuItemClass}>
            <History className="size-4" />
            Riwayat Pembelian
          </button>

          <Separator className="my-1" />

          <div className="flex items-center justify-between px-2 py-2 text-sm font-medium">
            <span className="flex items-center gap-2">
              {theme === "dark" ? (
                <Moon className="size-4" />
              ) : (
                <Sun className="size-4" />
              )}
              Tema
            </span>
            <Switch
              checked={theme === "dark"}
              onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
            />
          </div>

          <Separator className="my-1" />

          <button
            type="button"
            onClick={logout}
            className={cn(menuItemClass, "text-destructive hover:bg-destructive/10")}
          >
            <LogOut className="size-4" />
            Keluar
          </button>
        </PopoverContent>
      </Popover>
    </SidebarMenuItem>
  )
}
