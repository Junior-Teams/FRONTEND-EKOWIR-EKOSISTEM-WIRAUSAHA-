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
        path: "oauth/callback",
        lazy: () => import("@/routes/oauth-callback"),
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
    // Full-bleed course viewer with its own sidebar (materi list + wrap-up
    // quiz) - deliberately a sibling of the dashboard layout so it doesn't
    // inherit the global app sidebar.
    id: "course-viewer",
    path: "/dashboard/belajar/:id/materi",
    lazy: () => import("@/routes/dashboard/belajar/course-viewer-layout"),
    children: [
      {
        path: ":materiId",
        lazy: () => import("@/routes/dashboard/belajar/course-viewer-materi"),
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
        path: "belajar/:id/kuis/:quizId",
        lazy: () => import("@/routes/dashboard/belajar-quiz"),
      },
      {
        path: "forum",
        lazy: () => import("@/routes/dashboard/forum"),
      },
      {
        path: "forum/:id",
        lazy: () => import("@/routes/dashboard/forum-detail"),
      },
      {
        path: "redeem",
        lazy: () => import("@/routes/dashboard/redeem"),
      },
      {
        path: "profile",
        lazy: () => import("@/routes/dashboard/profile"),
      },
      {
        path: "admin",
        lazy: () => import("@/routes/dashboard/admin/admin-layout"),
        children: [
          {
            index: true,
            lazy: () => import("@/routes/dashboard/admin/admin-beranda"),
          },
          {
            path: "pengguna",
            lazy: () => import("@/routes/dashboard/admin/pengguna"),
          },
          {
            path: "pengguna/new",
            lazy: () => import("@/routes/dashboard/admin/pengguna-form"),
          },
          {
            path: "pengguna/:id/edit",
            lazy: () => import("@/routes/dashboard/admin/pengguna-form"),
          },
          {
            path: "modules",
            lazy: () => import("@/routes/dashboard/admin/modules"),
          },
          {
            path: "modules/new",
            lazy: () => import("@/routes/dashboard/admin/module-form"),
          },
          {
            path: "modules/:id/edit",
            lazy: () => import("@/routes/dashboard/admin/module-form"),
          },
          {
            path: "modules/:id",
            lazy: () => import("@/routes/dashboard/admin/module-detail"),
          },
          {
            path: "modules/:moduleId/materis/new",
            lazy: () => import("@/routes/dashboard/admin/materi-form"),
          },
          {
            path: "modules/:moduleId/materis/:id/edit",
            lazy: () => import("@/routes/dashboard/admin/materi-form"),
          },
          {
            path: "modules/:moduleId/quizzes/new",
            lazy: () => import("@/routes/dashboard/admin/quiz-form"),
          },
          {
            path: "modules/:moduleId/quizzes/:id/edit",
            lazy: () => import("@/routes/dashboard/admin/quiz-form"),
          },
          {
            path: "quizzes/:quizId/questions",
            lazy: () => import("@/routes/dashboard/admin/quiz-questions"),
          },
          {
            path: "quizzes/:quizId/questions/new",
            lazy: () => import("@/routes/dashboard/admin/question-form"),
          },
          {
            path: "quizzes/:quizId/questions/:id/edit",
            lazy: () => import("@/routes/dashboard/admin/question-form"),
          },
          {
            path: "reward",
            lazy: () => import("@/routes/dashboard/admin/rewards"),
          },
          {
            path: "reward/new",
            lazy: () => import("@/routes/dashboard/admin/reward-form"),
          },
          {
            path: "reward/:id/edit",
            lazy: () => import("@/routes/dashboard/admin/reward-form"),
          },
        ],
      },
    ],
  },
])
