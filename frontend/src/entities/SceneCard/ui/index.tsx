"use client";

import { ChoiceCard } from "@/entities";
import {
  AddChoiceButton,
  CustomCheckbox,
  RemoveSceneButton,
} from "@/shared/ui";
import { FaCheck } from "react-icons/fa";
import { useShallow } from "zustand/react/shallow";
import styles from "./SceneCard.module.scss";
import { useStoryEditorStore } from "@/shared/stores";
import { useEffect } from "react";

interface Props{
  sceneId: number;
  sceneIndex: number;
}

export default function SceneCard({sceneId, sceneIndex}: Props) {

  const {
    story,
    setSceneTitle,
    setSceneDescription,
    setSceneMaxChoices,
    setSceneIsEnd,
    addNewChoice,
    removeScene,
  } = useStoryEditorStore(
    useShallow((state) => state)
  );

  useEffect(() => {
    if (story?.scenes![sceneIndex]?.isEnd) {
      setSceneMaxChoices(story?.scenes![sceneIndex].id!, 0);
    }
  }, [story?.scenes![sceneIndex]?.isEnd, story?.scenes![sceneIndex]?.id, setSceneMaxChoices]);

  if(!story){
    return <h1> Loading </h1>
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.index}>{sceneIndex + 1}</span>

        <input
          type="text"
          value={story?.scenes![sceneIndex].title}
          onChange={(e) => setSceneTitle(story?.scenes![sceneIndex].id!, e.target.value)}
          placeholder="Заголовок сцены"
          className={styles.titleInput}
        />
      </div>

      <textarea
        value={story?.scenes![sceneIndex].description}
        onChange={(e) => setSceneDescription(story?.scenes![sceneIndex].id!, e.target.value)}
        placeholder="Описание сцены"
        className={styles.description}
      />

      <div className={styles.controls}>
        <CustomCheckbox
          checked={story?.scenes![sceneIndex].isEnd}
          onChange={(val) => setSceneIsEnd(story?.scenes![sceneIndex].id!, val)}
          label="Это концовка?"
          icon={<FaCheck />}
        />

        <label className={styles.selectLabel}>
          Количество выборов:
          {!story?.scenes![sceneIndex].isEnd ? <select
            value={story?.scenes![sceneIndex].maxChoices}
            onChange={(e) => {
              setSceneMaxChoices(story?.scenes![sceneIndex].id!, parseInt(e.target.value))
            }}
            className={styles.select}
          >
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select> : (<>
            <p> {0} </p>
          </>)}
        </label>
      </div>

      {!story?.scenes![sceneIndex].isEnd &&  Array.isArray(story?.scenes![sceneIndex].choices) && story?.scenes[sceneIndex].choices.map((choice, index) => (
        <ChoiceCard
          scene={story?.scenes![sceneIndex]}
          choice={choice}
          index={index}
          key={choice.id}
        />
      ))}

      {story?.scenes![sceneIndex]!.choices!.length < story?.scenes![sceneIndex].maxChoices && (
        <AddChoiceButton onClick={() => addNewChoice(story?.scenes![sceneIndex].id!)} />
      )}

      <div className={styles.footer}>
        <RemoveSceneButton onClick={() => removeScene(story?.scenes![sceneIndex].id!)} />
      </div>
    </div>
  );
}
