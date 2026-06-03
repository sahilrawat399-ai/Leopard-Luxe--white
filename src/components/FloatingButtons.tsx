import { MessageCircle, Calendar } from 'lucide-react';

export function FloatingButtons() {
  const handleWhatsapp = () => {
    const text = encodeURIComponent("Hello Leopard Luxe,\n\nI would like to explore how we can grow my business together and increase revenue through your services.");
    window.open(`https://wa.me/YOURNUMBER?text=${text}`, '_blank');
  };

  const handleBooking = () => {
    // In a real app, this would trigger a Calendly popup or modal.
    alert("Calendly Popup: Schedule your Strategy Call");
  };

  return (
    <>
      <button 
        onClick={handleBooking}
        className="fixed bottom-6 left-6 z-50 flex items-center gap-2 bg-gradient-to-r from-gold-400 to-gold-600 text-rich-black px-4 py-3 rounded-full font-bold shadow-[0_4px_20px_rgba(212,175,55,0.4)] hover:scale-105 active:scale-95 transition-transform"
      >
        <Calendar className="w-5 h-5" />
        <span className="hidden sm:inline">Book Strategy Call</span>
      </button>

      <button 
        onClick={handleWhatsapp}
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-[0_4px_20px_rgba(37,211,102,0.4)] hover:scale-110 active:scale-95 transition-transform group"
      >
        <MessageCircle className="w-7 h-7" />
        
        {/* Tooltip */}
        <div className="absolute right-16 top-1/2 -translate-y-1/2 bg-white text-rich-black px-3 py-1.5 rounded-lg text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-xl">
          Chat with us
          <div className="absolute right-[-4px] top-1/2 -translate-y-1/2 w-2 h-2 bg-white transform rotate-45"></div>
        </div>
      </button>
    </>
  );
}
