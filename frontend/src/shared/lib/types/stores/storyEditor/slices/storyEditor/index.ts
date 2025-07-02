import { AddImageModalSlice, IStoryEditor, IStoryHeader } from "@/shared/lib";

export type StoryEditorActions = {
	// Story Actions
	setId: (id: IStoryHeader["id"]) => void;
	setTitle: (title: IStoryHeader["title"]) => void;
	setAuthorId: (authorId: IStoryHeader["authorId"]) => void;
	setDescription: (description: IStoryHeader["description"]) => void;
	setImage: (image: IStoryHeader["image"]) => void;
	setIsPublic: (isPublic: IStoryHeader["isPublic"]) => void;
	setScenes: (scenes: IStoryHeader["scenes"]) => void;
	setCurrentStory: (value: number) => void;
	setStory: (value: IStoryHeader) => void;
	setStories: (stories: IStoryHeader[]) => void;

	// Scene Actions
	addNewScene: () => void;
	removeScene: (sceneId: number) => void;

	setSceneTitle: (sceneId: number, title: string) => void;
	setSceneDescription: (sceneId: number, description: string) => void;
	setSceneIsEnd: (sceneId: number, isEnd: boolean) => void;
	setSceneMaxChoices: (sceneId: number, maxChoices: number) => void;
	setSceneImage: (sceneId: number, image: string) => void;

	// Choice Actions
	addNewChoice: (sceneId: number) => void;
	removeChoice: (sceneId: number, choiceId: number) => void;
	setChoiceText: (sceneId: number, choiceId: number, text: string) => void;
	setChoiceNextSceneId: (
		sceneId: number,
		choiceId: number,
		nextSceneId: number,
	) => void;
	setChoiceAccess: (sceneId: number, choiceId: number, access: boolean) => void;

	// Image Actions
	addImageToStory: (url: string) => void;
	addImageToScene: (url: string, sceneId: number) => void;
};

export type StoryEditorSlice = IStoryEditor &
	StoryEditorActions &
	AddImageModalSlice;
