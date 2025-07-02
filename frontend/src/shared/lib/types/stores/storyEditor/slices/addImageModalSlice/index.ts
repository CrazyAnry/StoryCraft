export type AddImageModalActions = {
	setAddStoryImageModalIsVisible: (isVisible: boolean) => void;
	setAddSceneImageModalIsVisible: (isVisible: boolean) => void;
};

export type AddImageModalStates = {
	addStoryImageModalIsVisible: boolean;
	addSceneImageModalIsVisible: boolean;
};

export type AddImageModalSlice = AddImageModalActions & AddImageModalStates;
