'use client'

import { useState, useEffect, useCallback } from 'react'
import { getAllStories, getOneStory, getStoriesByLimit } from '@/shared/api/stories/queries'
import { IStoryHeader } from '@/shared/lib'
import { usePathname } from 'next/navigation'

export const useStories = () => {
    const [stories, setStories] = useState<IStoryHeader[]>([])
    const [sortedStories, setSortedStories] = useState<IStoryHeader[]>([])
    const [story, setStory] = useState<IStoryHeader>()
    const pathname = usePathname()

    const getStory = async () => {
        const response = await getOneStory(+pathname.split('/')[2])
        setStory(response)
    }

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

    useEffect(() => {
        fetchStoriesByLimit()
    }, [])

    return {
        stories,
        sortedStories,
        fetchStoriesByLimit,
        fetchAllStories,
        getStory,
        story
    }
}