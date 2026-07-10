import { useQueryClient } from "@tanstack/react-query"
import { CheckCircle2, Coins, Gift, Lock } from "lucide-react"
import toast from "react-hot-toast"

import { Breadcrumb } from "@/components/breadcrumb"
import { Skeleton } from "@/components/ui/skeleton"
import { useClaimReward, useMyRewardsQuery } from "@/hooks/rewards/useRewards"
import { NEO_BORDER, NEO_PRESS, NEO_SHADOW } from "@/lib/neobrutalism"
import { cn } from "@/lib/utils"

export function Component() {
  const queryClient = useQueryClient()
  const { data, isLoading } = useMyRewardsQuery()
  const rewards = data?.data ?? []

  const { mutate: claimReward, isPending, variables: claimingId } = useClaimReward({
    onSuccess: () => {
      toast.success("Hadiah berhasil ditukar!")
      queryClient.invalidateQueries({ queryKey: ["rewards.mine"] })
    },
    onError: (error) => {
      toast.error(error.response?.data?.error ?? "Gagal menukar hadiah")
    },
  })

  return (
    <div className="flex flex-col gap-4">
      <Breadcrumb
        items={[{ label: "Beranda", href: "/dashboard" }, { label: "Redeem Hadiah" }]}
      />

      <div>
        <h1 className="font-heading text-2xl font-bold">Redeem Hadiah</h1>
        <p className="text-muted-foreground text-sm">
          Tukarkan XP yang kamu kumpulkan dengan berbagai hadiah menarik.
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
            <p className="text-xs font-bold uppercase opacity-80">XP Kamu Saat Ini</p>
            <p className="font-heading text-2xl font-bold">
              {isLoading ? "..." : `${(data?.xp ?? 0).toLocaleString("id-ID")} XP`}
            </p>
          </div>
        </div>
        <Gift className="size-10 opacity-30" />
      </div>

      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-52 w-full" />
          ))}
        </div>
      ) : rewards.length ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {rewards.map((reward) => {
            const canRedeem = reward.eligible && !reward.claimed
            const isClaimingThis = isPending && claimingId === reward.ID

            return (
              <div
                key={reward.ID}
                className={cn(
                  "flex flex-col overflow-hidden rounded-lg bg-white dark:bg-neutral-900",
                  NEO_BORDER,
                  NEO_SHADOW
                )}
              >
                <div className="flex items-center justify-between border-b-2 border-black px-3 py-2 dark:border-white">
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase">
                    <Gift className="size-3.5" />
                    Hadiah
                  </span>
                  {!reward.eligible && !reward.claimed && (
                    <span
                      className={cn(
                        "inline-flex items-center gap-1 rounded-full bg-neutral-200 px-2 py-0.5 text-[10px] font-bold uppercase dark:bg-neutral-800",
                        NEO_BORDER
                      )}
                    >
                      <Lock className="size-3" />
                      Terkunci
                    </span>
                  )}
                </div>

                <div className="flex flex-1 flex-col gap-2 p-4">
                  <h3 className="font-heading text-base leading-snug font-bold">
                    {reward.name}
                  </h3>
                  <p className="text-muted-foreground line-clamp-3 flex-1 text-sm">
                    {reward.description}
                  </p>

                  <div className="mt-2 flex items-center justify-between border-t-2 border-black pt-3 dark:border-white">
                    <span className="inline-flex items-center gap-1 font-bold">
                      <Coins className="size-4" />
                      {reward.required_xp.toLocaleString("id-ID")}
                    </span>
                    <button
                      type="button"
                      disabled={!canRedeem || isPending}
                      onClick={() => claimReward(reward.ID)}
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold uppercase",
                        NEO_BORDER,
                        reward.claimed
                          ? "bg-emerald-400 dark:bg-emerald-600"
                          : canRedeem
                            ? cn("bg-eko-primary text-white", NEO_SHADOW, NEO_PRESS)
                            : "cursor-not-allowed bg-neutral-200 text-muted-foreground dark:bg-neutral-800"
                      )}
                    >
                      {reward.claimed ? (
                        <>
                          <CheckCircle2 className="size-3.5" />
                          Ditukar
                        </>
                      ) : isClaimingThis ? (
                        "Menukar..."
                      ) : (
                        "Tukar"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div
          className={cn(
            "flex flex-col items-center gap-2 rounded-lg bg-white p-10 text-center dark:bg-neutral-900",
            NEO_BORDER,
            NEO_SHADOW
          )}
        >
          <Gift className="text-muted-foreground size-8" />
          <p className="text-muted-foreground text-sm">Belum ada hadiah yang tersedia.</p>
        </div>
      )}
    </div>
  )
}
