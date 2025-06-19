'use client'

import React, { useEffect, useState } from 'react';
import s from './CreateStoriesGenerator.module.scss'
import { PaginationButtons } from '@/shared/ui';
import { useStories } from '@/shared/lib/hooks/useStories';
import { CreateStoryCard } from '@/entities';
import { useSortedStoriesStore } from '@/shared/stores/sortedStories';

export default function CreateStoriesGenerator() {
    const { fetchAllUsersStories } = useStories()
    const { setSortedStories, sortedStories } = useSortedStoriesStore()

    useEffect(() => {
        const getStories = async () => {
            setSortedStories(await fetchAllUsersStories())
        }

        getStories()
    }, [])

    if (!sortedStories) {
        return (
            <h1>Loading...</h1>
        );
    }

    return (
        <>
            <div className={s.stories}>
                {sortedStories.map(story => <CreateStoryCard image={story.image!} key={story.id} id={story.id!} title={story.title!} author={story.authorName!} />)}
            </div>
            <PaginationButtons mode={'create'}/>
        </>
    );

};