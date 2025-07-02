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
import { deleteScene } from "@/shared/api/scenes/mutations";
import { useScene } from "@/shared/lib/hooks/useScene";
import { usePathname } from "next/navigation";
import { AddImage, AddImageModal } from "@/features";

interface Props {
	sceneId: number;
	sceneIndex: number;
}

export default function SceneCard({ sceneId, sceneIndex }: Props) {
	const {
		story,
		stories,
		setSceneTitle,
		setSceneDescription,
		setSceneMaxChoices,
		setSceneIsEnd,
		addNewChoice,
		removeScene,
	} = useStoryEditorStore(useShallow((state) => state));
	const { getScene } = useScene();
	const pathname = usePathname();

	if (!story || !story.scenes || !story.scenes[sceneIndex]) {
		return <h1>Loading...</h1>;
	}

	const currentScene = story.scenes[sceneIndex];

	return (
		<>
			<div className={styles.container}>
				<div className={styles.header}>
					<span className={styles.index}>{sceneIndex + 1}</span>
					<input
						type="text"
						value={currentScene.title || ""}
						onChange={(e) => setSceneTitle(currentScene.id!, e.target.value)}
						placeholder="Заголовок сцены"
						className={styles.titleInput}
					/>
				</div>

				<textarea
					value={currentScene.description || ""}
					onChange={(e) =>
						setSceneDescription(currentScene.id!, e.target.value)
					}
					placeholder="Описание сцены"
					className={styles.description}
				/>

				<AddImage addImageTo="scene" />

				<div className={styles.controls}>
					<CustomCheckbox
						checked={currentScene.isEnd || false}
						onChange={(val) => {
							setSceneIsEnd(currentScene.id!, val);
							if (val) setSceneMaxChoices(currentScene.id!, 0);
							else setSceneMaxChoices(currentScene.id!, 1);
						}}
						label="Это концовка?"
						icon={<FaCheck />}
					/>

					<label className={styles.selectLabel}>
						Количество выборов:
						{!currentScene.isEnd ? (
							<select
								value={currentScene.maxChoices || 1}
								onChange={(e) => {
									setSceneMaxChoices(
										currentScene.id!,
										parseInt(e.target.value),
									);
								}}
								className={styles.select}
							>
								{[1, 2, 3, 4, 5, 6].map((num) => (
									<option key={num} value={num}>
										{num}
									</option>
								))}
							</select>
						) : (
							<p>Выборы недоступны</p>
						)}
					</label>
				</div>

				{!currentScene.isEnd &&
					currentScene.choices?.length! > 0 &&
					currentScene.choices!.map((choice, index) => (
						<ChoiceCard
							scene={currentScene}
							choice={choice}
							index={index}
							key={choice.id}
						/>
					))}

				{currentScene.choices?.length! < currentScene.maxChoices && (
					<AddChoiceButton onClick={() => addNewChoice(currentScene.id!)} />
				)}

				<div className={styles.footer}>
					<RemoveSceneButton
						onClick={async () => {
							removeScene(currentScene.id!);
							if (pathname.split("/")[2] !== "newStory") {
								try {
									const findedScene = await getScene(currentScene.id!);
									if (findedScene) deleteScene(story.id!, sceneId);
								} catch {}
							}
						}}
					>
						{" "}
						Удалить сцену{" "}
					</RemoveSceneButton>
				</div>
			</div>
			<AddImageModal addImageTo="scene" sceneId={sceneId!} />
		</>
	);
}
