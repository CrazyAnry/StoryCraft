export const updateStories = <T extends { id: number | null }>(
  updatedStory: T,
  stories: T[],
): T[] => {
  if (!updatedStory) return stories;
  
  // Clean the array first by filtering out undefined/null values
  const cleanStories = stories.filter((s): s is T => s !== null && s !== undefined);
  
  if (updatedStory.id === null) {
    // For new stories with null id, just add them to the array
    return [...cleanStories, updatedStory];
  }

  const storyIndex = cleanStories.findIndex((s) => s.id === updatedStory.id);

  if (storyIndex === -1) {
    // Story not found, add it to the clean array
    return [...cleanStories, updatedStory];
  }

  return [
    ...cleanStories.slice(0, storyIndex),
    updatedStory,
    ...cleanStories.slice(storyIndex + 1),
  ];
};
