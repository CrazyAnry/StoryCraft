import { StoryEditorSlice, AddImageModalSlice } from "@/shared/lib";

export * from "./slices";
export type StoryEditorStore = StoryEditorSlice & AddImageModalSlice;
