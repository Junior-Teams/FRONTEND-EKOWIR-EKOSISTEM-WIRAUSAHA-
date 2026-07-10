import toast from "react-hot-toast"

// Surfaces the XP/tier/reward payload that XP-earning endpoints (forum
// posts, comments, quiz submissions) return, so any page can show the same
// "you just earned something" feedback without re-deriving it.
export function showGamificationToast(gamify) {
  if (!gamify) return

  if (gamify.xp_earned > 0) {
    toast.success(`+${gamify.xp_earned} XP`, { icon: "✨" })
  }

  if (gamify.tier_changed && gamify.tier?.name) {
    toast.success(`Naik tier ke ${gamify.tier.name}!`, { icon: "🏆" })
  }

  for (const reward of gamify.newly_unlocked_rewards ?? []) {
    toast.success(`Hadiah baru terbuka: ${reward.name}`, { icon: "🎁" })
  }
}

// Given the current xp and the full (asc-sorted by point) tier list, finds
// the active tier and how far the user is toward the next one - used to
// render tier-progress bars consistently across pages.
export function getTierProgress(xp, tiers) {
  const sorted = [...(tiers ?? [])].sort((a, b) => a.point - b.point)
  const current = [...sorted].reverse().find((tier) => xp >= tier.point) ?? null
  const next = sorted.find((tier) => tier.point > xp) ?? null

  if (!next) {
    return { current, next: null, percent: 100 }
  }

  const floor = current?.point ?? 0
  const span = next.point - floor
  const percent = span > 0 ? Math.min(100, Math.round(((xp - floor) / span) * 100)) : 0

  return { current, next, percent }
}
