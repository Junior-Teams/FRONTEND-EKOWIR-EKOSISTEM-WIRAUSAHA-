// Reads the role claim straight from the JWT payload so post-login redirects
// can send admins to /dashboard/admin without an extra /me roundtrip.
export function getRoleFromToken(token) {
  try {
    const payload = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/")
    return JSON.parse(atob(payload)).role
  } catch {
    return undefined
  }
}

export function getInitials(name) {
  if (!name) return "?"
  return name
    .split(" ")
    .map((part) => part.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase()
}
