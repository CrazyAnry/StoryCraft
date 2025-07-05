import { GlobalStore } from "@/shared/lib";
import { StateCreator } from "zustand";

// Определяем тип для слайса
interface TechWorkSlice {
  isTechWork: boolean;
  goToTechWorkPage: () => void;
}

export const techWorkSlice: StateCreator<
  GlobalStore,
  [["zustand/immer", never]],
  [],
  TechWorkSlice
> = (set, get) => ({
  // State
  isTechWork: true,

  // Actions
  goToTechWorkPage: () => {
    // Используем window.location для навигации в Zustand store
    if (typeof window !== "undefined") {
      window.location.href = "/technical_works";
    }
  },
});
