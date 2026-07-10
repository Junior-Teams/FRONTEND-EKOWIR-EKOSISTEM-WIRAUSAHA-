const AVATAR_COLORS = [
  "bg-amber-200 dark:bg-amber-800",
  "bg-sky-200 dark:bg-sky-800",
  "bg-emerald-200 dark:bg-emerald-800",
  "bg-pink-200 dark:bg-pink-800",
  "bg-violet-200 dark:bg-violet-800",
]

export function getAvatarColor(name) {
  const sum = [...name].reduce((total, char) => total + char.charCodeAt(0), 0)
  return AVATAR_COLORS[sum % AVATAR_COLORS.length]
}
