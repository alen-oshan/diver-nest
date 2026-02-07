import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const defaultCurrency = {
  code: "USD",
  name: "US Dollar",
  factor: 1.00,
  symbol: "$"
};

export const useCurrencyStore = create(
  persist(
    (set) => ({
      currency: defaultCurrency,
      setCurrency: (newCurrency) => set({ currency: newCurrency }),
    }),
    {
      name: 'currency-storage',
    }
  )
);