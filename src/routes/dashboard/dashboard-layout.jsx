import { BookOpen, Gift, Home, MessagesSquare, Trophy, User } from "lucide-react"
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
import { RouteErrorBoundary } from "@/routes/route-error-boundary"

const NAV_ITEMS = [
  { title: "Beranda", url: "/dashboard", icon: Home },
  { title: "Leaderboard", url: "/dashboard/leaderboard", icon: Trophy },
  { title: "Belajar", url: "/dashboard/belajar", icon: BookOpen },
  { title: "Forum", url: "/dashboard/forum", icon: MessagesSquare },
  { title: "Redeem Hadiah", url: "/dashboard/redeem", icon: Gift },
  { title: "Profile", url: "/dashboard/profile", icon: User },
]

// "Beranda" is the /dashboard index route, so it must match exactly or it
// would also light up for every other item's child routes. Everything else
// should stay active on its own child pages too (e.g. /dashboard/belajar/1).
function isNavItemActive(pathname, url) {
  if (url === "/dashboard") {
    return pathname === url
  }
  return pathname === url || pathname.startsWith(`${url}/`)
}

export function Component() {
  const { pathname } = useLocation()

  return (
    <TooltipProvider>
      <SidebarProvider>
        <Sidebar className="border-r-2 border-black dark:border-white">
          <SidebarHeader className="px-8 py-8">
            <img src="/assets/logo/logo.png" alt="Logo" className="h-12 w-auto" />
          </SidebarHeader>

          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel className="text-lg font-semibold">Menu</SidebarGroupLabel>
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
