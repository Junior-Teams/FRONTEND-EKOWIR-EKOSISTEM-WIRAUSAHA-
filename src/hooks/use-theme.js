import { createContext, useContext } from "react"

export const ThemeProviderContext = createContext({
  theme: "light",
  setTheme: () => null,
})

export function useTheme() {
  const context = useContext(ThemeProviderContext)
  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider")
  return context
}
