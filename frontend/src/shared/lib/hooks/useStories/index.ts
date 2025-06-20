'use client'

import { useState, useEffect, useCallback } from 'react'
import { getAllStories, getOneStory, getStoriesByLimit, getUsersStoriesByLimit } from '@/shared/api/stories/queries'
import { IScene, IStoryHeader } from '@/shared/lib'
import { usePathname, useRouter } from 'next/navigation'
import { useStoryEditorStore, useUsersStore } from '@/shared/stores'
import { changeStory, createStory } from '@/shared/api/stories/mutations'
import { changeScene, createScene } from '@/shared/api/scenes/mutations'
import { changeChoice, createChoice } from '@/shared/api/choices/mutations'


export const useStories = () => {
    const [stories, setStories] = useState<IStoryHeader[]>([])
    const [sortedStories, setSortedStories] = useState<IStoryHeader[]>([])
    const [oneStory, setOneStory] = useState<IStoryHeader>()
    const pathname = usePathname()
    const { currentUser } = useUsersStore()
    const { setStory, story } = useStoryEditorStore()
    const router = useRouter()

    const getStory = async (id?: number) => {
        try {
            const response = await getOneStory(id ? id : +pathname.split('/')[2])
            if (response) {
                setOneStory(response)
                return response
            }
        }
        catch (error) {
            throw error
        }
    }

    const fetchAllUsersStoriesByLimit = useCallback(async (page: number = 1, limit: number = 7) => {
        try {
            const data = await getUsersStoriesByLimit(page, limit)
            return data
        } catch (error) {
            throw error
        }
    }, [])

    const fetchAllUsersStories = useCallback(async () => {
        try {
            const data = await getAllStories()
            const usersStories = <IStoryHeader[]>[]
            data.map(story => story.authorId === currentUser?.id && usersStories.push(story))
            return usersStories
        } catch (error) {
            throw error
        }
    }, [])

    const fetchAllStories = useCallback(async () => {
        try {
            const data = await getAllStories()
            return data
        } catch (error) {
            throw error
        }
    }, [])

    const fetchStoriesByLimit = useCallback(async (page: number = 1, limit: number = 8) => {
        try {
            const data = await getStoriesByLimit(page, limit)
            setStories(data)
            setSortedStories(data)
            return data
        } catch (error) {
            throw error
        }
    }, [])

    const updateStory = async (savingStory: IStoryHeader) => {
        try {
            const { id, scenes, ...updatedStory } = savingStory;
            let storyId = savingStory.id!;
            let isNewStory = false;

            const currentStory = await getStory(storyId);

            if (currentStory) {
                await changeStory(storyId, updatedStory);
            } else {
                const createdStory = await createStory(updatedStory);
                storyId = createdStory.id!;
                isNewStory = true;
            }

            await new Promise(resolve => setTimeout(resolve, 300));
            const updatedStoryData = await getStory(storyId);

            if (!updatedStoryData) {
                throw new Error('Story not found after update');
            }

            const scenesToProcess = savingStory.scenes || [];
            const existingScenes = updatedStoryData.scenes || [];

            for (const [index, scene] of scenesToProcess.entries()) {
                const { id, choices, ...sceneData } = scene;

                if (existingScenes[index]) {
                    await changeScene(storyId, existingScenes[index].id!, {
                        ...sceneData,
                        storyId: storyId
                    });
                } else {
                    await createScene(storyId, {
                        ...sceneData,
                        storyId: storyId
                    });
                }
            }

            const allScenes = (await getStory(storyId))?.scenes || [];


            for (const [sceneIndex, scene] of scenesToProcess.entries()) {
                if (!scene || !allScenes[sceneIndex]) continue;

                const choicesToProcess = scene.choices || [];
                const existingChoices = allScenes[sceneIndex].choices || [];

                for (const [choiceIndex, choice] of choicesToProcess.entries()) {
                    if (!choice) continue;

                    const { id, ...choiceData } = choice;

                    let nextSceneId: string | number;
                    let nextScene: IScene | undefined;

                    if (choiceData.nextSceneId <= allScenes.length) {
                        const nextSceneIndex = choiceData.nextSceneId - 1;

                        if (nextSceneIndex < 0 || nextSceneIndex >= allScenes.length) {
                            throw new Error(`Invalid next scene index: ${nextSceneIndex}`);
                        }

                        nextScene = allScenes[nextSceneIndex];
                        if (!nextScene?.id) {
                            throw new Error(`Next scene not found at index ${nextSceneIndex}`);
                        }

                        nextSceneId = nextScene.id;
                    }
                    else {
                        nextSceneId = choiceData.nextSceneId;
                        nextScene = allScenes.find(s => s.id === nextSceneId);

                        if (!nextScene) {
                            throw new Error(`Next scene not found with ID: ${nextSceneId}`);
                        }
                    }

                    const choicePayload = {
                        ...choiceData,
                        nextSceneId: nextScene.id!,
                        sceneId: allScenes[sceneIndex].id!,
                        storyId: storyId
                    };

                    if (existingChoices[choiceIndex]) {
                        await changeChoice(
                            storyId,
                            allScenes[sceneIndex].id!,
                            existingChoices[choiceIndex].id!,
                            choicePayload
                        );
                    } else {
                        await createChoice(
                            storyId,
                            allScenes[sceneIndex].id!,
                            choicePayload
                        );
                    }
                    isNewStory && router.push(`/editor/${storyId}`)
                }
            }
            const storyToUpdate = JSON.parse(JSON.stringify({
                ...updatedStoryData,
                id: storyId
            }));

            const gettedStory = await getStory(storyId)
            setStory(storyToUpdate)
            return gettedStory;
        } catch (error) {
            console.error("Error updating story:", error);
            throw error;
        }
    }

    useEffect(() => {
        fetchStoriesByLimit()
    }, [])

    return {
        stories,
        sortedStories,
        fetchStoriesByLimit,
        fetchAllStories,
        getStory,
        oneStory,
        fetchAllUsersStoriesByLimit,
        updateStory,
        fetchAllUsersStories
    }
}