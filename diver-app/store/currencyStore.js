import { create } from 'zustand';

export const useCurrencyStore = create((set) => ({
  currency: { code: "USD", name: "US Dollar" },  
  setCurrency: (newCurrency) => set({ currency: newCurrency }),
}));