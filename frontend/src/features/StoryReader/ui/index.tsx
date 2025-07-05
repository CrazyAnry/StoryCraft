"use client";

import React, { useEffect } from "react";
import s from "./StoryReader.module.scss";
import { ChoicesGenerator } from "@/features";
import { usePathname } from "next/navigation";
import { useScene } from "@/shared/lib/hooks/useScene";
import IsEndCards from "@/entities/IsEndCards/ui";
import { StoryQuestionBase } from "@/entities";
import { IChoice } from "@/shared/lib";
import { useState } from "react";

export default function StoryReader() {
  const pathname = usePathname();
  const { getScene, scene } = useScene();
  const [allChoicesOfScene, setAllChoicesOfScene] = useState<IChoice[]>([]);

  useEffect(() => {
    getScene();
  }, [pathname]);

  useEffect(() => {
    if (scene) {
      setAllChoicesOfScene(
        scene.choices?.filter((choice): choice is IChoice => choice !== null) ||
          []
      );
    }
  }, [scene]);

  if (scene === null) {
    return <h1>Загрузка...</h1>;
  }

  if (scene.isEnd || allChoicesOfScene.length === 0) {
    return (
      <div className={s.container}>
        <StoryQuestionBase />
        <IsEndCards />
      </div>
    );
  }

  return (
    <div className={s.container}>
      <StoryQuestionBase />
      <ChoicesGenerator choices={scene?.choices!} />
    </div>
  );
}
