import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { cn } from "@/lib/utils"

// Chart palette: brand-adjacent teal/amber/green steps, validated for
// lightness, chroma, CVD separation, and >=3:1 contrast on both the white
// and neutral-900 card surfaces (the raw eko-* brand hexes fail as marks).
export const CHART_TEAL = "#0891b2"
export const CHART_AMBER = "#d97706"
export const CHART_GREEN = "#16a34a"

const ACTIVITY_CONFIG = {
  materi: { label: "Materi Selesai", color: CHART_TEAL },
  quiz: { label: "Kuis Lulus", color: CHART_AMBER },
  comments: { label: "Komentar", color: CHART_GREEN },
}

// "2026-07-05" parsed in local time - new Date(string) would read it as UTC
// midnight and shift the weekday for UTC+ timezones.
function parseDay(value) {
  const [year, month, day] = value.split("-").map(Number)
  return new Date(year, month - 1, day)
}

const WEEKDAY_SHORT = new Intl.DateTimeFormat("id-ID", { weekday: "short" })
const DATE_LONG = new Intl.DateTimeFormat("id-ID", {
  weekday: "long",
  day: "numeric",
  month: "long",
})

// Grouped bar of the last-7-days activity series (materi/kuis/komentar per
// day) coming from /secured/me/activity or the admin dashboard endpoint.
export function ActivityChart({ data, className }) {
  const chartData = (data ?? []).map((row) => ({
    ...row,
    label: WEEKDAY_SHORT.format(parseDay(row.date)),
  }))

  return (
    <ChartContainer
      config={ACTIVITY_CONFIG}
      className={cn("aspect-auto h-64 w-full", className)}
    >
      <BarChart data={chartData} barGap={2}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="label" tickLine={false} axisLine={false} tickMargin={8} />
        <YAxis allowDecimals={false} tickLine={false} axisLine={false} width={30} />
        <ChartTooltip
          content={
            <ChartTooltipContent
              labelFormatter={(value, payload) => {
                const date = payload?.[0]?.payload?.date
                return date ? DATE_LONG.format(parseDay(date)) : value
              }}
            />
          }
        />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="materi" fill="var(--color-materi)" radius={[4, 4, 0, 0]} maxBarSize={24} />
        <Bar dataKey="quiz" fill="var(--color-quiz)" radius={[4, 4, 0, 0]} maxBarSize={24} />
        <Bar dataKey="comments" fill="var(--color-comments)" radius={[4, 4, 0, 0]} maxBarSize={24} />
      </BarChart>
    </ChartContainer>
  )
}

// Single-series count bar (one hue, no legend - the card title names the
// series). Expects rows shaped { label, count }.
export function CountBarChart({ data, seriesLabel, className, labelFormatter }) {
  const config = { count: { label: seriesLabel, color: CHART_TEAL } }

  return (
    <ChartContainer config={config} className={cn("aspect-auto h-64 w-full", className)}>
      <BarChart data={data ?? []}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="label" tickLine={false} axisLine={false} tickMargin={8} />
        <YAxis allowDecimals={false} tickLine={false} axisLine={false} width={30} />
        <ChartTooltip content={<ChartTooltipContent labelFormatter={labelFormatter} />} />
        <Bar dataKey="count" fill="var(--color-count)" radius={[4, 4, 0, 0]} maxBarSize={24} />
      </BarChart>
    </ChartContainer>
  )
}
