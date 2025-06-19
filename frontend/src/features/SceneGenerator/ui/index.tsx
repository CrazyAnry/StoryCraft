'use client'

import React, { useEffect } from 'react';
import s from './SceneGenerator.module.scss'
import { useStoryEditorStore } from '@/shared/stores';
import { useShallow } from 'zustand/shallow';
import { SceneCard } from '@/entities';
import { useStories } from '@/shared/lib/hooks/useStories';

export default function SceneGenerator() {
    const {
        story,
        addNewScene
    } = useStoryEditorStore(useShallow((state) => state));

    const {getStory, oneStory} = useStories()
    
    useEffect(() => {
      getStory()
    }, [])

    if (!story) {
        return (
            <>
                <h1>Loading...</h1>
            </>
        );
    }

    return (
        <>
            {story.scenes!.map((scene, index) => (
                <SceneCard key={index} sceneId={scene.id!} sceneIndex={index} />
            ))}

            <button onClick={addNewScene} className={s.addSceneButton}>
                Добавить сцену
            </button>
        </>
    );
};