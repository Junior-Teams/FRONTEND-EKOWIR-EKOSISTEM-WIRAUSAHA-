import {
  BookOpen,
  Gift,
  Home,
  LayoutDashboard,
  MessagesSquare,
  Package,
  Trophy,
  User,
  Users,
} from "lucide-react"
import { Link, Outlet, useLocation } from "react-router"

import { ModeToggle } from "@/components/mode-toggle"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
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
import { TooltipProvider } from "@/components/ui/tooltip"
import { useCurrentUser } from "@/hooks/auth/useCurrentUser"
import { RouteErrorBoundary } from "@/routes/route-error-boundary"

const NAV_ITEMS = [
  { title: "Beranda", url: "/dashboard", icon: Home },
  { title: "Leaderboard", url: "/dashboard/leaderboard", icon: Trophy },
  { title: "Belajar", url: "/dashboard/belajar", icon: BookOpen },
  { title: "Forum", url: "/dashboard/forum", icon: MessagesSquare },
  { title: "Redeem Hadiah", url: "/dashboard/redeem", icon: Gift },
  { title: "Profile", url: "/dashboard/profile", icon: User },
]

const ADMIN_NAV_ITEMS = [
  { title: "Beranda", url: "/dashboard/admin", icon: LayoutDashboard },
  { title: "Pengguna", url: "/dashboard/admin/pengguna", icon: Users },
  { title: "Modul", url: "/dashboard/admin/modules", icon: Package },
   { title: "Hadiah", url: "/dashboard/admin/reward", icon: Gift },
]

// "Beranda" and admin's "Beranda" are both index routes, so they must match
// exactly or they'd also light up for every other item's child routes.
// Everything else should stay active on its own child pages too
// (e.g. /dashboard/belajar/1, /dashboard/admin/modules/1/edit).
function isNavItemActive(pathname, url) {
  if (url === "/dashboard" || url === "/dashboard/admin") {
    return pathname === url
  }
  return pathname === url || pathname.startsWith(`${url}/`)
}

export function Component() {
  const { pathname } = useLocation()
  const { data: user } = useCurrentUser()
  const isAdmin = user?.role === "admin"

  return (
    <TooltipProvider>
      <SidebarProvider>
        <Sidebar className="border-r-2 border-black dark:border-white">
          <SidebarHeader className="flex items-center justify-center border-b-2 px-8 py-8">
            <img src="/assets/logo/logo.svg" alt="Logo" className="h-14 w-auto" />
          </SidebarHeader>

          <SidebarContent>
             {!isAdmin && (
            <SidebarGroup>
              <SidebarGroupLabel className="text-lg font-semibold py-6">Menu</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu className="gap-2">
                  {NAV_ITEMS.map((item) => (
                    <SidebarMenuItem key={item.url}>
                      <SidebarMenuButton
                        render={<Link to={item.url} />}
                        isActive={isNavItemActive(pathname, item.url)}
                        tooltip={item.title}
                        size="lg"
                        className="gap-3 text-lg font-semibold [&_svg]:size-6 data-active:bg-eko-primary data-active:text-white data-active:hover:bg-eko-primary data-active:hover:text-white"
                      >
                        <item.icon />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
  )}
            {isAdmin && (
              <SidebarGroup>
                <SidebarGroupLabel className="text-lg font-semibold py-6">Admin</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu className="gap-2">
                    {ADMIN_NAV_ITEMS.map((item) => (
                      <SidebarMenuItem key={item.url}>
                        <SidebarMenuButton
                          render={<Link to={item.url} />}
                          isActive={isNavItemActive(pathname, item.url)}
                          tooltip={item.title}
                          size="lg"
                          className="gap-3 text-lg font-semibold [&_svg]:size-6 data-active:bg-eko-primary data-active:text-white data-active:hover:bg-eko-primary data-active:hover:text-white"
                        >
                          <item.icon />
                          <span>{item.title}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            )}
          </SidebarContent>

          <SidebarFooter className="border-t-2 border-black p-2 dark:border-white">
            <SidebarMenu>
              <NavUser />
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>

        <SidebarInset>
          <header className="bg-background sticky top-0 z-20 flex items-center justify-between border-b-2 border-black px-4 py-3 dark:border-white">
            <SidebarTrigger />
            <ModeToggle />
          </header>

          <main className="bg-grid bg-background flex flex-1 flex-col gap-4 p-4">
            <Outlet />
          </main>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  )
}

export { RouteErrorBoundary as ErrorBoundary }
