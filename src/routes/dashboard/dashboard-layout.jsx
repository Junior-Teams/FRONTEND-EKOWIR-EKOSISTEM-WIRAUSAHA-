import { BookOpen, Home, MessagesSquare, Trophy, User } from "lucide-react"
import { Link, Outlet, useLocation } from "react-router"

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
import { TooltipProvider } from "@/components/ui/tooltip"
import { RouteErrorBoundary } from "@/routes/route-error-boundary"

const NAV_ITEMS = [
  { title: "Beranda", url: "/dashboard", icon: Home },
  { title: "Leaderboard", url: "/dashboard/leaderboard", icon: Trophy },
  { title: "Belajar", url: "/dashboard/belajar", icon: BookOpen },
  { title: "Forum", url: "/dashboard/forum", icon: MessagesSquare },
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
            <img src="/assets/logo/logo.webp" alt="Logo" className="h-12 w-auto" />
          </SidebarHeader>

          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Menu</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu className="gap-2">
                  {NAV_ITEMS.map((item) => (
                    <SidebarMenuItem key={item.url}>
                      <SidebarMenuButton
                        render={<Link to={item.url} />}
                        isActive={isNavItemActive(pathname, item.url)}
                        tooltip={item.title}
                        size="lg"
                        className="gap-3 text-base font-semibold [&_svg]:size-5 data-active:bg-primary data-active:text-primary-foreground data-active:hover:bg-primary data-active:hover:text-primary-foreground"
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
        </Sidebar>

        <SidebarInset>
          <header className="flex items-center justify-between border-b-2 border-black px-4 py-3 dark:border-white">
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
