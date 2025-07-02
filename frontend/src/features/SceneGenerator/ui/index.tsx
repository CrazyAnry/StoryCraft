"use client";

import React, { useEffect } from "react";
import s from "./SceneGenerator.module.scss";
import { useStoryEditorStore } from "@/shared/stores";
import { useShallow } from "zustand/shallow";
import { SceneCard } from "@/entities";
import { useStories } from "@/shared/lib/hooks/useStories";
import { usePathname } from "next/navigation";

export default function SceneGenerator() {
	const { story, addNewScene } = useStoryEditorStore(
		useShallow((state) => state),
	);

	const { getStory, oneStory } = useStories();
	const pathname = usePathname();

	useEffect(() => {
		if (pathname.split("/")[2] !== "newStory") getStory();
	}, []);

	if (!story) {
		return (
			<>
				<h1>Loading...</h1>
			</>
		);
	}

	return (
		<>
			{story.scenes?.map((scene, index) => {
				return (
					<SceneCard key={scene.id} sceneId={scene.id!} sceneIndex={index} />
				);
			})}

			<div className={s.addSceneContainer}>
				<button onClick={addNewScene} className={s.addSceneButton}>
					Добавить сцену
				</button>
			</div>
		</>
	);
}
