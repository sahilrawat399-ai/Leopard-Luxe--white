/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Header } from './components/Header';
import { Preloader } from './components/Preloader';
import { Hero } from './components/Hero';
import { SocialProof } from './components/SocialProof';
import { Services } from './components/Services';
import { WhyPartner } from './components/WhyPartner';
import { Pricing } from './components/Pricing';
import { GrowthMachine } from './components/GrowthMachine';
import { Results } from './components/Results';
import { Testimonials } from './components/Testimonials';
import { ClientExperience } from './components/ClientExperience';
import { FAQ } from './components/FAQ';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { FloatingButtons } from './components/FloatingButtons';

export default function App() {
  const [preloaderFinished, setPreloaderFinished] = useState(false);

  return (
    <>
      {!preloaderFinished && <Preloader onComplete={() => setPreloaderFinished(true)} />}
      
      {preloaderFinished && <Header />}
      
      <div className={`transition-opacity duration-1000 ${preloaderFinished ? 'opacity-100' : 'opacity-0 h-screen overflow-hidden'}`}>
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
        <Footer />
        <FloatingButtons />
      </div>
    </>
  );
}
