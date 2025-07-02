"use client";

import React, { useEffect } from "react";
import s from "./StoryQuestionBase.module.scss";
import { useScene } from "@/shared/lib/hooks/useScene";
import { useStories } from "@/shared/lib/hooks/useStories";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function StoryQuestionBase() {
  const { getScene, scene } = useScene();
  const { getStory, oneStory } = useStories();
  const pathname = usePathname();

  useEffect(() => {
    getScene();
    getStory();
  }, [pathname]);

  return (
    <>
      <div className={s.titleRow}>
        <h2> {oneStory?.title} </h2>
        <h2>
          {oneStory?.scenes.findIndex(
            (storyScene) => storyScene.id === scene?.id
          )! + 1}
        </h2>
      </div>
      <div className={s.questionBody}>
        <h2>{scene?.title}</h2>
        {scene?.image && (
          <Image
            width={500}
            height={300}
            src={scene?.image}
            alt="Selected Image"
						title={scene?.image}
            style={{
              width: "100%",
              height: "auto",
              maxWidth: "100%",
            }}
          />
        )}
        <h3>{scene?.description}</h3>
      </div>
    </>
  );
}
