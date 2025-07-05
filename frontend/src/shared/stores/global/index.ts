import { create } from "zustand";
import { devtools, persist, subscribeWithSelector, createJSONStorage } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { techWorkSlice } from "./slices";
import { GlobalStore } from "@/shared/lib/types";

export const useGlobalStore = create<GlobalStore>()(
  devtools(
    persist(
      subscribeWithSelector(
        immer((...a) => ({
          ...techWorkSlice(...a),
        }))
      ),
      {
        name: "global-storage",
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);
