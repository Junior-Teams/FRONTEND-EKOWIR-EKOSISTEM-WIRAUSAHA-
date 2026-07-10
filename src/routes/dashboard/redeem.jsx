import { useState } from "react"
import { Coins, Gift, Landmark, Shirt, Ticket, Wallet } from "lucide-react"

import { Breadcrumb } from "@/components/breadcrumb"
import {
  CATEGORY_BADGE,
  CURRENT_POINTS,
  REWARD_CATEGORIES,
  REWARDS,
} from "@/lib/rewards"
import { NEO_BORDER, NEO_PRESS, NEO_SHADOW } from "@/lib/neobrutalism"
import { cn } from "@/lib/utils"

const CATEGORY_ICON = {
  Voucher: Ticket,
  "Saldo Digital": Wallet,
  Merchandise: Shirt,
  Koperasi: Landmark,
}

export function Component() {
  const [points, setPoints] = useState(CURRENT_POINTS)
  const [redeemedIds, setRedeemedIds] = useState([])
  const [category, setCategory] = useState("Semua")

  const rewards =
    category === "Semua" ? REWARDS : REWARDS.filter((item) => item.category === category)

  function handleRedeem(reward) {
    if (points < reward.points || redeemedIds.includes(reward.id)) return
    setPoints((prev) => prev - reward.points)
    setRedeemedIds((prev) => [...prev, reward.id])
  }

  return (
    <div className="flex flex-col gap-4">
      <Breadcrumb
        items={[{ label: "Beranda", href: "/dashboard" }, { label: "Redeem Hadiah" }]}
      />

      <div>
        <h1 className="font-heading text-2xl font-bold">Redeem Hadiah</h1>
        <p className="text-muted-foreground text-sm">
          Tukarkan poin yang kamu kumpulkan dengan berbagai hadiah menarik.
        </p>
      </div>

      <div
        className={cn(
          "flex items-center justify-between rounded-lg bg-eko-primary p-5 text-white",
          NEO_BORDER,
          NEO_SHADOW
        )}
      >
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "flex size-12 shrink-0 items-center justify-center rounded-lg bg-white/15",
              NEO_BORDER
            )}
          >
            <Coins className="size-6" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase opacity-80">Poin Kamu Saat Ini</p>
            <p className="font-heading text-2xl font-bold">
              {points.toLocaleString("id-ID")} Poin
            </p>
          </div>
        </div>
        <Gift className="size-10 opacity-30" />
      </div>

      <div className="flex flex-wrap gap-2">
        {REWARD_CATEGORIES.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setCategory(item)}
            className={cn(
              "rounded-lg px-3 py-1.5 text-sm font-bold uppercase",
              NEO_BORDER,
              NEO_SHADOW,
              NEO_PRESS,
              category === item
                ? "bg-eko-primary text-white"
                : "bg-white dark:bg-neutral-900"
            )}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {rewards.map((reward) => {
          const Icon = CATEGORY_ICON[reward.category]
          const isRedeemed = redeemedIds.includes(reward.id)
          const canRedeem = !isRedeemed && points >= reward.points

          return (
            <div
              key={reward.id}
              className={cn(
                "flex flex-col overflow-hidden rounded-lg bg-white dark:bg-neutral-900",
                NEO_BORDER,
                NEO_SHADOW
              )}
            >
              <div className="flex items-center justify-between border-b-2 border-black px-3 py-2 dark:border-white">
                <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase">
                  <Icon className="size-3.5" />
                  {reward.category}
                </span>
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 text-[10px] font-bold uppercase",
                    NEO_BORDER,
                    CATEGORY_BADGE[reward.category]
                  )}
                >
                  Stok {reward.stock}
                </span>
              </div>

              <div className="flex flex-1 flex-col gap-2 p-4">
                <h3 className="font-heading text-base leading-snug font-bold">
                  {reward.title}
                </h3>
                <p className="text-muted-foreground line-clamp-3 flex-1 text-sm">
                  {reward.description}
                </p>

                <div className="mt-2 flex items-center justify-between border-t-2 border-black pt-3 dark:border-white">
                  <span className="inline-flex items-center gap-1 font-bold">
                    <Coins className="size-4" />
                    {reward.points.toLocaleString("id-ID")}
                  </span>
                  <button
                    type="button"
                    disabled={!canRedeem}
                    onClick={() => handleRedeem(reward)}
                    className={cn(
                      "rounded-lg px-3 py-1.5 text-xs font-bold uppercase",
                      NEO_BORDER,
                      isRedeemed
                        ? "bg-emerald-400 dark:bg-emerald-600"
                        : canRedeem
                          ? cn("bg-eko-primary text-white", NEO_SHADOW, NEO_PRESS)
                          : "cursor-not-allowed bg-neutral-200 text-muted-foreground dark:bg-neutral-800"
                    )}
                  >
                    {isRedeemed ? "Ditukar" : "Tukar"}
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
