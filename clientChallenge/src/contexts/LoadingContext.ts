import { create } from "zustand";
import { LoadingState } from "../types/loading";

export const useLoading = create<LoadingState>((set) => ({
  isLoading: false,
  setLoading: (isLoading: boolean) => set({ isLoading }),
}));
