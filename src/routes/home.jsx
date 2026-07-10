import { useEffect } from "react"
import { useLocation } from "react-router"

import AboutComponent from "../components/homapage/AboutComponent"
import CtaComponent from "../components/homapage/CtaComponent"
import FiturComponent from "../components/homapage/FiturComponent"
import HeroComponent from "../components/homapage/HeroComponent"

export function Component() {
  const { hash } = useLocation()

  useEffect(() => {
    if (!hash) return
    document.querySelector(hash)?.scrollIntoView({ behavior: "smooth", block: "start" })
  }, [hash])

  return (
    <section className="flex flex-col items-center justify-center gap-4">
      <HeroComponent />
      <AboutComponent />
      <FiturComponent />
      <CtaComponent />
    </section>
  )
}
