import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { zustandStorage } from "./mmkv-storage";

export interface Transaction {
  id: string;
  date: Date;
  title: string;
  amount: number;
}

export interface BalanceState {
  transactions: Transaction[];
  balance: () => number;
  clearTransactions: () => void;
  runTransaction: (transaction: Transaction) => void;
}

export const useBalanceStore = create<BalanceState>()(
  persist(
    (set, get) => ({
      transactions: [],

      balance: () =>
        get().transactions.reduce((a, { amount }) => amount + a, 0),

      clearTransactions: () => {
        set({ transactions: [] });
      },

      runTransaction: (transaction: Transaction) => {
        set((state) => ({
          transactions: [...state.transactions, transaction],
        }));
      },
    }),

    {
      name: "balance",
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);
