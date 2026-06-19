import { create } from 'zustand';

interface BookingStore {
  isBookingFormOpen: boolean;
  setBookingFormOpen: (open: boolean) => void;
}

export const useBookingStore = create<BookingStore>((set) => ({
  isBookingFormOpen: false,
  setBookingFormOpen: (open) => set({ isBookingFormOpen: open }),
}));
