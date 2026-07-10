import AboutComponent from "../components/homapage/AboutComponent"
import CtaComponent from "../components/homapage/CtaComponent"
import HeroComponent from "../components/homapage/HeroComponent"

export function Component() {
  return (
    <section className="flex flex-col items-center justify-center gap-4">
      <HeroComponent/>

      {/* <AboutComponent /> */}
      <AboutComponent />

      <CtaComponent />
    </section>
  )
}
