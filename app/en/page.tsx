import Hero from '@/components/Hero';
import Sections from '@/components/Sections';

export default function Page() {
  return (
    <div>
      <Hero
        heading="Saimôr – Clarity in Change"
        sub="More clarity. More direction. More impact."
        cta="Book an intro call"
        locale="en"
      />
      <Sections locale="en" />
    </div>
  )
}
