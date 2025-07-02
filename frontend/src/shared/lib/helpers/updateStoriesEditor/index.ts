export const updateStories = <T extends { id: number | null }>(
	updatedStory: T,
	stories: T[],
): T[] => {
	const storyIndex = stories.findIndex((s) => s.id === updatedStory.id);

	if (storyIndex === -1) return stories;

	return [
		...stories.slice(0, storyIndex),
		updatedStory,
		...stories.slice(storyIndex + 1),
	];
};
