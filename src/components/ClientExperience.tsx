import { motion } from 'motion/react';

const brands = [
  "Aura Aesthetics", "Maison Laurent", "Sterling Timepieces", "Rostova Beauty", 
  "Vanguard Tech", "Rossi Milano", "Harrington & Co.", "Pierce Collection",
  "Alistair Estates", "Devereux Paris", "Thorne Logistics", "Kensington Jewels",
  "Vance Automotive", "Valiente Couture", "Cole Architecture", "Koda Media",
  "Nova & Co.", "Stellar Grooming"
];

export function ClientExperience() {
  return (
    <section className="py-24 bg-rich-black relative border-t border-white/5 overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 relative z-10 mb-12">
        <div className="text-center">
          <span className="text-gray-400 font-sans tracking-[0.2em] uppercase text-xs font-semibold">
            Partnering With Elite Global Brands
          </span>
        </div>
      </div>

      <div className="relative flex overflow-x-hidden w-full group mask-image-fade">
        <div className="animate-marquee flex gap-16 py-4 whitespace-nowrap min-w-full">
          {[...brands, ...brands, ...brands].map((brand, index) => (
            <div key={index} className="flex items-center justify-center shrink-0">
              <span className="font-serif text-2xl text-white/30 hover:text-white transition-colors cursor-pointer">
                {brand}
              </span>
            </div>
          ))}
        </div>
      </div>
      
      <style>{`
        .mask-image-fade {
          mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
        }
      `}</style>
    </section>
  );
}
