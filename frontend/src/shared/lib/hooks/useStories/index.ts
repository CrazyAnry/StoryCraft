'use client'

import { useState, useEffect, useCallback } from 'react'
import { getAllStories, getOneStory, getStoriesByLimit } from '@/shared/api/stories/queries'
import { IStoryHeader } from '@/shared/lib'
import { usePathname } from 'next/navigation'
import { useUsersStore } from '@/shared/stores'
import { changeStory } from '@/shared/api/stories/mutations'
import { changeScene, createScene } from '@/shared/api/scenes/mutations'
import { changeChoice, createChoice } from '@/shared/api/choices/mutations'

export const useStories = () => {
    const [stories, setStories] = useState<IStoryHeader[]>([])
    const [sortedStories, setSortedStories] = useState<IStoryHeader[]>([])
    const [oneStory, setStory] = useState<IStoryHeader>()
    const pathname = usePathname()
    const { currentUser } = useUsersStore()

    const getStory = async () => {
        const response = await getOneStory(+pathname.split('/')[2])
        setStory(response)
        return response
    }

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

    const updateStory = async (story: IStoryHeader) => {
        try {
            const { scenes, ...updatedStory } = story
            const currentStory = await getStory()
            // await changeStory(story.id!, updatedStory)
            for (const scene of scenes || []) {
                if (!scene || !currentStory) continue;
                const { choices, ...sceneData } = scene;
                const existingScene = currentStory.scenes?.find(s => s.id === scene.id);

                if (existingScene) {
                    await changeScene(story.id!, scene.id!, sceneData);
                } else {
                    const { id, ...newSceneData } = sceneData;
                    await createScene(story.id!, newSceneData);
                }
            }

            for (const scene of story.scenes || []) {
                if (!scene) continue;
                console.log(123)
                const { choices, ...sceneData } = scene;

                for (const choice of choices || []) {
                    if (!choice) continue;

                    console.log(125)


                    const { id, ...newChoiceData } = choice;
                    await createChoice(story.id!, scene.id!, newChoiceData);
                    
                }
            }

            return story;
        } catch (error) {
            console.error("Failed to update story:", error);
            throw error;
        }
    };


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
        fetchAllUsersStories,
        updateStory
    }
}