import Hero from '@/components/Hero';
import Sections from '@/components/Sections';

export default function Page() {
  return (
    <div>
      <Hero
        heading="Saimôr – Klarheit im Wandel"
        sub="Mehr Klarheit. Mehr Richtung. Mehr Wirkung."
        cta="Lichtgespräch buchen"
        locale="de"
      />
      <Sections locale="de" />
    </div>
  )
}
