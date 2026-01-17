import { create } from 'zustand';

const defaultCurrency = {
  code: "USD",
  name: "US Dollar",
  factor: 1.00,
  symbol: "$"
};

export const useCurrencyStore = create((set) => ({
  currency: defaultCurrency,
  setCurrency: (newCurrency) => set({ currency: newCurrency }),
}));