import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

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
      storage: createJSONStorage(() => localStorage),
      skipHydration: true, // Prevents SSR hydration mismatch
    }
  )
);

// Hook to rehydrate on client side
export const useHydrateCurrencyStore = () => {
  const rehydrated = useCurrencyStore.persist.hasHydrated();
  
  if (typeof window !== 'undefined' && !rehydrated) {
    useCurrencyStore.persist.rehydrate();
  }
  
  return rehydrated;
};