import { create } from "zustand";
import {
	devtools,
	persist,
	subscribeWithSelector,
	createJSONStorage,
} from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import { sortedStoriesSlice } from "./slices";

export const useSortedStoriesStore = create<sortedStoriesSlice>()(
	devtools(
		persist(
			subscribeWithSelector(
				immer((...a) => ({
					...sortedStoriesSlice(...a),
				})),
			),
			{
				name: "sorted-stories-storage",
				storage: createJSONStorage(() => localStorage),
			},
		),
	),
);
