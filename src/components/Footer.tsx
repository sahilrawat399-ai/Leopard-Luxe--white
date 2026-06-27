import { Instagram, Linkedin, Facebook } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#050505] pt-24 pb-12 border-t border-white/10">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          {/* Brand Info */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <img
                src="/assets/images/logo-bg.png"
                alt="Leopard Luxe Logo"
                className="w-40 h-auto object-contain"
              />
            </div>
            <p className="text-sm text-gray-500 leading-relaxed font-sans max-w-xs">
              The premier business growth and digital transformation agency for ambitious brands globally.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">Services</h4>
            <ul className="space-y-4">
              {['Website Development', 'Performance Marketing', 'Social Media Growth', 'Business Scaling', 'Business Consulting'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-gold text-sm transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">Company</h4>
            <ul className="space-y-4">
              {['About', 'Case Studies', 'Pricing', 'Contact'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-gold text-sm transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">Contact Info</h4>
            <ul className="space-y-4 mb-8">
              <li>
                <a href="mailto:business@leopardluxe.in" className="text-gray-400 hover:text-gold text-sm transition-colors block">
                  business@leopardluxe.in
                </a>
              </li>
              <li>
                <a href="tel:+919717550681" className="text-gray-400 hover:text-gold text-sm transition-colors block">
                  +91 9717550681
                </a>
              </li>
            </ul>
            
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-gray-400 hover:bg-gold hover:text-rich-black transition-all hover:border-gold">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-gray-400 hover:bg-gold hover:text-rich-black transition-all hover:border-gold">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-gray-400 hover:bg-gold hover:text-rich-black transition-all hover:border-gold">
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © 2026 Leopard Luxe. All Rights Reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-gold transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gold transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
