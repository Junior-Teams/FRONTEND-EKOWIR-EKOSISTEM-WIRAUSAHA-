import { createBrowserRouter, redirect } from "react-router"

import * as rootLayout from "@/routes/root-layout"
import * as authLayout from "@/routes/auth/auth-layout"
import * as dashboardLayout from "@/routes/dashboard/dashboard-layout"

export const router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    Component: rootLayout.Component,
    ErrorBoundary: rootLayout.ErrorBoundary,
    children: [
      {
        index: true,
        lazy: () => import("@/routes/home"),
      },
      {
        path: "about",
        lazy: () => import("@/routes/about"),
      },
      {
        path: "*",
        lazy: () => import("@/routes/not-found"),
      },
    ],
  },
  {
    id: "auth",
    path: "/auth",
    Component: authLayout.Component,
    ErrorBoundary: authLayout.ErrorBoundary,
    children: [
      {
        index: true,
        loader: () => redirect("/auth/login"),
      },
      {
        path: "login",
        lazy: () => import("@/routes/auth/login"),
      },
      {
        path: "register",
        lazy: () => import("@/routes/auth/register"),
      },
    ],
  },
  {
    id: "dashboard",
    path: "/dashboard",
    Component: dashboardLayout.Component,
    ErrorBoundary: dashboardLayout.ErrorBoundary,
    children: [
      {
        index: true,
        lazy: () => import("@/routes/dashboard/beranda"),
      },
      {
        path: "leaderboard",
        lazy: () => import("@/routes/dashboard/leaderboard"),
      },
      {
        path: "belajar",
        lazy: () => import("@/routes/dashboard/belajar"),
      },
      {
        path: "belajar/:id",
        lazy: () => import("@/routes/dashboard/belajar-detail"),
      },
      {
        path: "forum",
        lazy: () => import("@/routes/dashboard/forum"),
      },
      {
        path: "profile",
        lazy: () => import("@/routes/dashboard/profile"),
      },
    ],
  },
])
