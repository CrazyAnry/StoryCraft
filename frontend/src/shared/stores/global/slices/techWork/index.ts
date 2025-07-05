import { GlobalStore } from "@/shared/lib";
import { StateCreator } from "zustand";
import { TechWorkSlice } from "@/shared/lib/types";

export const techWorkSlice: StateCreator<
  GlobalStore,
  [["zustand/immer", never]],
  [],
  TechWorkSlice
> = (set, get) => ({
  // State
  isTechWork: false,

  // Actions
  goToTechWorkPage: () => {
    // Используем window.location для навигации в Zustand store
    if (typeof window !== "undefined") {
      window.location.href = "/technical_works";
    }
  },

  goToHome: () => {
    if (typeof window !== "undefined") {
      window.location.href = "/";
    }
  },
});
