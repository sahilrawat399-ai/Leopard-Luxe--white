import { Hero } from '../components/Hero';
import { SocialProof } from '../components/SocialProof';
import { Services } from '../components/Services';
import { WhyPartner } from '../components/WhyPartner';
import { Pricing } from '../components/Pricing';
import { GrowthMachine } from '../components/GrowthMachine';
import { Results } from '../components/Results';
import { Testimonials } from '../components/Testimonials';
import { ClientExperience } from '../components/ClientExperience';
import { FAQ } from '../components/FAQ';
import { FinalCTA } from '../components/FinalCTA';

export function Home() {
  return (
    <main>
      <Hero />
      <SocialProof />
      <Services />
      <WhyPartner />
      <Pricing />
      <GrowthMachine />
      <Results />
      <Testimonials />
      <ClientExperience />
      <FAQ />
      <FinalCTA />
    </main>
  );
}
