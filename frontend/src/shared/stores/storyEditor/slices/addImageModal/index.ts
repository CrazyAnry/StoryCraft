import { StateCreator } from "zustand";
import { StoryEditorSlice, AddImageModalSlice } from "@/shared/lib";

export const addImageModalSlice: StateCreator<
	StoryEditorSlice,
	[["zustand/immer", never]],
	[],
	AddImageModalSlice
> = (set, get) => ({
	// State
	addStoryImageModalIsVisible: false,
	addSceneImageModalIsVisible: false,

	// Actions
	setAddStoryImageModalIsVisible: (isVisible) =>
		set((state) => ({ addStoryImageModalIsVisible: isVisible })),
	setAddSceneImageModalIsVisible: (isVisible) =>
		set((state) => ({ addSceneImageModalIsVisible: isVisible })),
});
