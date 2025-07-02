import { IStoryHeader } from "../";

export interface IStoryEditor {
	stories: IStoryHeader[];
	currentStory: number;
	story: IStoryHeader | null;
}
