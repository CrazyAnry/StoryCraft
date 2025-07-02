import { StateCreator } from "zustand";
import {
  IStoryHeader,
  IScene,
  IChoice,
  StoryEditorSlice,
  StoryEditorActions,
  IStoryEditor,
} from "@/shared/lib";
import { getAllStories } from "@/shared/api/stories/queries";
import { updateStories } from "@/shared/lib/helpers/updateStoriesEditor";

export const storyEditorSlice: StateCreator<
  StoryEditorSlice,
  [["zustand/immer", never]],
  [],
  IStoryEditor & StoryEditorActions
> = (set, get) => ({
  // State
  stories: [],
  currentStory: -1,
  story: null,

  // ================== Story Actions ==================
  setId: (id) =>
    set((state) => {
      if (!state.story) return;
      const updatedStory = { ...state.story, id };
      return {
        story: updatedStory,
        stories: updateStories(updatedStory, state.stories),
      };
    }),

  setStories: (stories) => set({ stories }),

  setTitle: (title) =>
    set((state) => {
      if (!state.story) return;
      const updatedStory = { ...state.story, title };
      return {
        story: updatedStory,
        stories: updateStories(updatedStory, state.stories),
      };
    }),

  setAuthorId: (authorId) =>
    set((state) => {
      if (!state.story) return;
      const updatedStory = { ...state.story, authorId };
      return {
        story: updatedStory,
        stories: updateStories(updatedStory, state.stories),
      };
    }),

  setDescription: (description) =>
    set((state) => {
      if (!state.story) return;
      const updatedStory = { ...state.story, description };
      return {
        story: updatedStory,
        stories: updateStories(updatedStory, state.stories),
      };
    }),

  setImage: (image) =>
    set((state) => {
      if (!state.story) return;
      const updatedStory = { ...state.story, image };
      return {
        story: updatedStory,
        stories: updateStories(updatedStory, state.stories),
      };
    }),

  setIsPublic: (isPublic) =>
    set((state) => {
      if (!state.story) return;
      const updatedStory = { ...state.story, isPublic };
      return {
        story: updatedStory,
        stories: updateStories(updatedStory, state.stories),
      };
    }),

  setScenes: (scenes) =>
    set((state) => {
      if (!state.story) return;
      const updatedStory = { ...state.story, scenes };
      return {
        story: updatedStory,
        stories: updateStories(updatedStory, state.stories),
      };
    }),

  setCurrentStory: (index) => {
    if (index >= 0 && index < get().stories.length) {
      set({ currentStory: index });
    }
  },

  setStory: (currentStory: IStoryHeader) => {
    set({
      story: currentStory,
      stories: updateStories(currentStory, get().stories),
    });
  },

  // ================== Scene Actions ==================
  addNewScene: () =>
    set((state) => {
      if (!state.story) return;

      const nextSceneId =
        state.story.scenes!.length > 0
          ? Math.max(...state.story.scenes!.map((s) => s.id || 0)) + 1
          : 1;

      const newScene: IScene = {
        id: nextSceneId,
        title: "Новая сцена",
        description: "",
        image: null,
        isEnd: false,
        storyId: state.story.id || 0,
        maxChoices: 1,
        choices: [],
      };

      const updatedStory = {
        ...state.story,
        scenes: [...state.story.scenes!, newScene],
      };

      return {
        story: updatedStory,
        stories: updateStories(updatedStory, state.stories),
      };
    }),

  removeScene: (sceneId) =>
    set((state) => {
      if (!state.story) return;

      const updatedStory = {
        ...state.story,
        scenes: state.story.scenes!.filter((s) => s.id !== sceneId),
      };

      return {
        story: updatedStory,
        stories: updateStories(updatedStory, state.stories),
      };
    }),

  setSceneTitle: (sceneId, title) =>
    set((state) => {
      if (!state.story) return;

      const updatedStory = {
        ...state.story,
        scenes: state.story.scenes!.map((scene) =>
          scene.id === sceneId ? { ...scene, title } : scene
        ),
      };

      return {
        story: updatedStory,
        stories: updateStories(updatedStory, state.stories),
      };
    }),

  setSceneDescription: (sceneId, description) =>
    set((state) => {
      if (!state.story) return;

      const updatedStory = {
        ...state.story,
        scenes: state.story.scenes!.map((scene) =>
          scene.id === sceneId ? { ...scene, description } : scene
        ),
      };

      return {
        story: updatedStory,
        stories: updateStories(updatedStory, state.stories),
      };
    }),

  setSceneIsEnd: (sceneId, isEnd) =>
    set((state) => {
      if (!state.story) return;

      const updatedStory = {
        ...state.story,
        scenes: state.story.scenes!.map((scene) =>
          scene.id === sceneId
            ? {
                ...scene,
                isEnd,
                maxChoices: isEnd ? 0 : scene.maxChoices,
              }
            : scene
        ),
      };

      return {
        story: updatedStory,
        stories: updateStories(updatedStory, state.stories),
      };
    }),

  setSceneMaxChoices: (sceneId, maxChoices) =>
    set((state) => {
      if (!state.story) return;

      const updatedStory = {
        ...state.story,
        scenes: (state.story.scenes ?? []).map((scene) => {
          if (scene.id !== sceneId) return scene;

          const currentChoices = scene.choices || [];
          const withText = currentChoices.filter((c) => c.text?.trim());
          const withoutText = currentChoices.filter((c) => !c.text?.trim());

          let updatedChoices = [...currentChoices];

          if (withText.length >= maxChoices) {
            updatedChoices = withText.slice(0, maxChoices);
          } else {
            updatedChoices = [
              ...withText,
              ...withoutText.slice(0, maxChoices - withText.length),
            ];
          }

          return {
            ...scene,
            maxChoices,
            choices: updatedChoices,
          };
        }),
      };

      return {
        story: updatedStory,
        stories: updateStories(updatedStory, state.stories),
      };
    }),

  setSceneImage: (sceneId, image) =>
    set((state) => {
      if (!state.story) return;

      const updatedStory = {
        ...state.story,
        scenes: state.story.scenes!.map((scene) =>
          scene.id === sceneId ? { ...scene, image } : scene
        ),
      };

      return {
        story: updatedStory,
        stories: updateStories(updatedStory, state.stories),
      };
    }),

  // ================== Choice Actions ==================
  addNewChoice: (sceneId) =>
    set((state) => {
      if (!state.story) return;

      const updatedStory = {
        ...state.story,
        scenes: state.story.scenes!.map((scene) => {
          if (scene.id !== sceneId) return scene;

          const nextChoiceId =
            Math.max(0, ...scene.choices!.map((c) => c.id!)) + 1;
          const newChoice: IChoice = {
            id: nextChoiceId,
            text: "",
            nextSceneId: 0,
            access: true,
            sceneId: sceneId,
            storyId: state.story?.id || 0,
          };

          return {
            ...scene,
            choices: [...scene.choices!, newChoice],
          };
        }),
      };

      return {
        story: updatedStory,
        stories: updateStories(updatedStory, state.stories),
      };
    }),

  removeChoice: (sceneId, choiceId) =>
    set((state) => {
      if (!state.story) return;

      const updatedStory = {
        ...state.story,
        scenes: state.story.scenes!.map((scene) =>
          scene.id === sceneId
            ? {
                ...scene,
                choices: scene.choices!.filter((c) => c.id !== choiceId),
              }
            : scene
        ),
      };

      return {
        story: updatedStory,
        stories: updateStories(updatedStory, state.stories),
      };
    }),

  setChoiceText: (sceneId, choiceId, text) =>
    set((state) => {
      if (!state.story) return;

      const updatedStory = {
        ...state.story,
        scenes: state.story.scenes!.map((scene) =>
          scene.id === sceneId
            ? {
                ...scene,
                choices: scene.choices!.map((choice) =>
                  choice.id === choiceId ? { ...choice, text } : choice
                ),
              }
            : scene
        ),
      };

      return {
        story: updatedStory,
        stories: updateStories(updatedStory, state.stories),
      };
    }),

  setChoiceNextSceneId: (sceneId, choiceId, nextSceneId) =>
    set((state) => {
      if (!state.story) return;

      const updatedStory = {
        ...state.story,
        scenes: state.story.scenes!.map((scene) =>
          scene.id === sceneId
            ? {
                ...scene,
                choices: scene.choices!.map((choice) =>
                  choice.id === choiceId ? { ...choice, nextSceneId } : choice
                ),
              }
            : scene
        ),
      };

      return {
        story: updatedStory,
        stories: updateStories(updatedStory, state.stories),
      };
    }),

  setChoiceAccess: (sceneId, choiceId, access) =>
    set((state) => {
      if (!state.story) return;

      const updatedStory = {
        ...state.story,
        scenes: state.story.scenes!.map((scene) =>
          scene.id === sceneId
            ? {
                ...scene,
                choices: scene.choices!.map((choice) =>
                  choice.id === choiceId ? { ...choice, access } : choice
                ),
              }
            : scene
        ),
      };

      return {
        story: updatedStory,
        stories: updateStories(updatedStory, state.stories),
      };
    }),

  // ================== Additional Methods ==================
  loadStories: async () => {
    try {
      const stories = await getAllStories();
      set({ stories });
    } catch (error) {
      throw error;
    }
  },

  addImageToStory: (url: string) =>
    set((state) => ({ story: { ...state.story, image: url } })),
  addImageToScene: (url: string, sceneId: number) =>
    set((state) => ({
      story: {
        ...state.story,
        scenes: state.story?.scenes!.map((scene) =>
          scene.id === sceneId ? { ...scene, image: url } : scene
        ),
      },
    })),

  addNewStory: () => {
    const newStory: IStoryHeader = {
      id: null,
      title: "Новая история",
      description: "",
      image: null,
      authorId: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isPublic: false,
      scenes: [
        {
          id: 1,
          title: "Начальная сцена",
          description: "",
          image: null,
          isEnd: false,
          storyId: 0,
          maxChoices: 1,
          choices: [
            {
              id: 1,
              text: "",
              nextSceneId: 0,
              access: true,
              sceneId: 1,
              storyId: 0,
            },
          ],
        },
      ],
    };

    set((state) => ({
      stories: [...state.stories, newStory],
      currentStory: state.stories.length,
      story: newStory,
    }));
  },
});
