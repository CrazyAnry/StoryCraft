import { create } from "zustand";
import {
	devtools,
	persist,
	subscribeWithSelector,
	createJSONStorage,
} from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import { StoryEditorSlice } from "@/shared/lib";
import { storyEditorSlice } from "./slices";
import { addImageModalSlice } from "./slices/addImageModal";

export const useStoryEditorStore = create<StoryEditorSlice>()(
	devtools(
		persist(
			subscribeWithSelector(
				immer((...a) => ({
					...storyEditorSlice(...a),
					...addImageModalSlice(...a),
				})),
			),
			{
				name: "story-editor-storage",
				storage: createJSONStorage(() => localStorage),
			},
		),
	),
);
