'use client'

import React, { useEffect } from 'react';
import s from './EditableHeader.module.scss'
import { useStoryEditorStore } from '@/shared/stores';
import { useShallow } from 'zustand/shallow';
import { useStories } from '@/shared/lib/hooks/useStories';

export default function EditHeader(){

    const {
        story,
        stories,
        setTitle,
        setDescription,
        setStory
    } = useStoryEditorStore(useShallow((state) => state));

    const {getStory, oneStory} = useStories()
    
    useEffect(() => {
      getStory()
    }, [])

    useEffect(() => {
      if(oneStory){
        const editingStory = stories.findIndex(story => story.id === oneStory.id!)
        if(editingStory === -1){
          stories.push(oneStory)
        }
        else{
          setStory(stories[editingStory])
        }
      }
    }, [oneStory?.id])

    if(!story){
      return <h1>Loading...</h1>
    }

    return (
        <div className={s.container}>
          <div className={s.titleRow}>
            <div className={s.inputGroup}>
              <label htmlFor="story-title" className={s.label}>
                {story?.title}
              </label>
              <input
                id="story-title"
                type="text"
                className={s.titleInput}
                aria-label="Название истории"
                value={story?.title || ""}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Название истории"
              />
              </div>
              <div className={s.scenesCount}>
                Количество сцен: {story.scenes!.length}
              </div>
            </div>
            <div className={s.inputGroup}>
            <label htmlFor="story-description" className={s.label}>
              {story?.description}
            </label>
            <textarea
              id="story-description"
              className={s.description_edit}
              value={story?.description || ""}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Описание истории"
              aria-label="Описание истории"
            />
          </div>
        </div>
    );
};