import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { NEO_BORDER, NEO_SHADOW } from "@/lib/neobrutalism"
import { cn } from "@/lib/utils"

const STATS = [
  { label: "Total Poin", value: "1.240" },
  { label: "Kursus Selesai", value: "8" },
  { label: "Peringkat", value: "#12" },
]

const chartData = [
  { day: "Sen", poin: 40 },
  { day: "Sel", poin: 65 },
  { day: "Rab", poin: 52 },
  { day: "Kam", poin: 78 },
  { day: "Jum", poin: 90 },
  { day: "Sab", poin: 45 },
  { day: "Min", poin: 30 },
]

const chartConfig = {
  poin: {
    label: "Poin",
    color: "#3b82f6",
  },
}

export function Component() {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-3">
        {STATS.map((stat) => (
          <Card
            key={stat.label}
            className={cn(
              "rounded-lg bg-blue-100 ring-0 dark:bg-blue-950",
              NEO_BORDER,
              NEO_SHADOW
            )}
          >
            <CardHeader>
              <CardDescription>{stat.label}</CardDescription>
              <CardTitle className="text-2xl font-bold">
                {stat.value}
              </CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>

      <Card
        className={cn(
          "rounded-lg bg-white ring-0 dark:bg-neutral-900",
          NEO_BORDER,
          NEO_SHADOW
        )}
      >
        <CardHeader>
          <CardTitle>Aktivitas Mingguan</CardTitle>
          <CardDescription>Poin belajar 7 hari terakhir</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="max-h-80 w-full">
            <BarChart data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="day"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar
                dataKey="poin"
                fill="var(--color-poin)"
                stroke="#000"
                strokeWidth={2}
                radius={4}
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}
