import { MessageCircle, Calendar, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function FloatingButtons() {
  const navigate = useNavigate();

  const handleWhatsapp = () => {
    window.open(`https://wa.me/919717550681`, '_blank');
  };

  const handleBooking = () => {
    navigate('/discovery');
  };

  return (
    <>
      <div className="fixed bottom-6 left-6 z-50 flex flex-col gap-4 items-start pb-4">
        <button 
          onClick={handleBooking}
          className="flex items-center gap-2 bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-rich-black px-4 py-3 rounded-full font-bold shadow-[0_4px_20px_rgba(212,175,55,0.4)] hover:scale-105 active:scale-95 transition-transform"
        >
          <Calendar className="w-5 h-5" />
          <span className="hidden sm:inline">Book Strategy Call</span>
        </button>

        <a 
          href="mailto:agency@leopardluxe.in"
          className="inline-flex items-center gap-2 bg-[#0A0A0A] border border-white/10 text-white px-4 py-3 rounded-full font-bold shadow-lg hover:border-gold hover:text-gold transition-colors"
        >
           <Mail className="w-5 h-5" />
           <span className="hidden sm:inline text-sm">Send an Email</span>
        </a>
      </div>

      <button 
        onClick={handleWhatsapp}
        className="fixed bottom-6 right-6 z-[60] flex items-center justify-center w-14 h-14 bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-rich-black rounded-full shadow-[0_4px_20px_rgba(212,175,55,0.4)] hover:scale-110 active:scale-95 transition-transform group"
      >
        <MessageCircle className="w-7 h-7" />
        
        {/* Tooltip */}
        <div className="absolute right-16 top-1/2 -translate-y-1/2 bg-white text-rich-black px-3 py-1.5 rounded-lg text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-xl">
          Chat With Leopard Luxe
          <div className="absolute right-[-4px] top-1/2 -translate-y-1/2 w-2 h-2 bg-white transform rotate-45"></div>
        </div>
      </button>
    </>
  );
}
