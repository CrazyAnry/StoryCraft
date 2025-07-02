"use client";

import { useState, useEffect, useCallback } from "react";
import {
	getAllStories,
	getOneStory,
	getStoriesByLimit,
	getUsersStoriesByLimit,
} from "@/shared/api/stories/queries";
import { IChoice, IScene, IStoryHeader } from "@/shared/lib";
import { usePathname, useRouter } from "next/navigation";
import { useStoryEditorStore, useUsersStore } from "@/shared/stores";
import { changeStory, createStory } from "@/shared/api/stories/mutations";
import { changeScene, createScene } from "@/shared/api/scenes/mutations";
import {
	changeChoice,
	createChoice,
	deleteChoice,
} from "@/shared/api/choices/mutations";
import { toast } from "react-toastify";

export const useStories = () => {
	const [stories, setStories] = useState<IStoryHeader[]>([]);
	const [sortedStories, setSortedStories] = useState<IStoryHeader[]>([]);
	const [oneStory, setOneStory] = useState<IStoryHeader>();
	const pathname = usePathname();
	const { currentUser } = useUsersStore();
	const { setStory, story } = useStoryEditorStore();
	const router = useRouter();

	const getStory = async (id?: number) => {
		try {
			const response = await getOneStory(id ? id : +pathname.split("/")[2]);
			if (response) {
				setOneStory(response);
				return response;
			}
		} catch (error) {
			throw error;
		}
	};

	const fetchAllUsersStoriesByLimit = useCallback(
		async (page: number = 1, limit: number = 8) => {
			try {
				const data = await getUsersStoriesByLimit(page, limit);
				return data;
			} catch (error) {
				throw error;
			}
		},
		[],
	);

	const fetchAllUsersStories = useCallback(async () => {
		try {
			const data = await getAllStories();
			const usersStories = <IStoryHeader[]>[];
			data.map(
				(story) =>
					story.authorId === currentUser?.id && usersStories.push(story),
			);
			return usersStories;
		} catch (error) {
			throw error;
		}
	}, []);

	const fetchAllStories = useCallback(async () => {
		try {
			const data = await getAllStories();
			return data;
		} catch (error) {
			throw error;
		}
	}, []);

	const fetchStoriesByLimit = useCallback(
		async (page: number = 1, limit: number = 8) => {
			try {
				const data = await getStoriesByLimit(page, limit);
				setStories(data);
				setSortedStories(data);
				return data;
			} catch (error) {
				throw error;
			}
		},
		[],
	);

	const updateStory = async (savingStory: IStoryHeader) => {
		try {
			if (!savingStory) {
				toast.error("Не удалось загрузить историю");
				throw new Error("Не удалось загрузить историю");
			}

			if (!savingStory.title) {
				toast.error("Введите название");
				throw new Error("Введите название");
			}

			if (!savingStory.description) {
				toast.error("Введите описание");
				throw new Error("Введите описание");
			}

			if (!savingStory.scenes[0]) {
				toast.error("Создайте сцену");
				throw new Error("Создайте сцену");
			}

			if (
				!savingStory.scenes[0].choices ||
				savingStory.scenes[0].choices.length === 0
			) {
				toast.error("Создайте выбор в первой сцене");
				throw new Error("Создайте выбор в первой сцене");
			}

			const allChoices = savingStory.scenes.flatMap((scene) => scene.choices);

			if (allChoices.some((choice) => !choice?.text && !choice?.nextSceneId)) {
				toast.error("Добавьте заголовок к каждому выбору");
				throw new Error("Добавьте заголовок к каждому выбору");
			}

			const { id, scenes, ...updatedStory } = savingStory;
			let storyId = savingStory.id!;
			let isNewStory = false;

			// Проверяем, существует ли история на сервере ДО любых операций
			// Если ID отсутствует или история не найдена - это новая история
			let currentStory = null;
			if (storyId) {
				try {
					currentStory = await getStory(storyId);
				} catch (error) {
					// История не найдена - значит новая
					currentStory = null;
				}
			}

			if (currentStory && storyId) {
				// Обновляем существующую историю
				await changeStory(storyId, updatedStory);
			} else {
				// Создаем новую историю
				const createdStory = await createStory(updatedStory);
				storyId = createdStory?.id!;
				isNewStory = true;
			}

			await new Promise((resolve) => setTimeout(resolve, 300));
			const storyData = await getStory(storyId);

			if (!storyData) {
				throw new Error("Story not found after update");
			}

			const scenesToProcess = savingStory.scenes || [];
			const existingScenes = storyData.scenes || [];

			for (const [index, scene] of scenesToProcess.entries()) {
				const { id, choices, ...sceneData } = scene;

				if (existingScenes[index]) {
					await changeScene(storyId, existingScenes[index].id!, {
						...sceneData,
						storyId: storyId,
					});
				} else {
					await createScene(storyId, {
						...sceneData,
						storyId: storyId,
					});
				}
			}

			const allScenes = (await getStory(storyId))?.scenes || [];

			for (const [sceneIndex, scene] of scenesToProcess.entries()) {
				if (!scene || !allScenes[sceneIndex]) continue;
				const existingChoices = allScenes[sceneIndex].choices || [];
				const choicesToProcess = scene.choices || [];

				for (const [choiceIndex, choice] of choicesToProcess.entries()) {
					if (!choice) continue;

					const { id, ...choiceData } = choice;

					let nextSceneId: string | number;
					let nextScene: IScene | undefined;

					if (
						choiceData.nextSceneId <= allScenes.length &&
						choiceData.nextSceneId > 0
					) {
						const nextSceneIndex = choiceData.nextSceneId - 1;

						if (nextSceneIndex < 0 || nextSceneIndex >= allScenes.length) {
							throw new Error(`Invalid next scene index: ${nextSceneIndex}`);
						}

						nextScene = allScenes[nextSceneIndex];
						if (!nextScene?.id) {
							throw new Error(
								`Next scene not found at index ${nextSceneIndex}`,
							);
						}

						nextSceneId = nextScene.id;
					} else if (choiceData.nextSceneId > allScenes.length) {
						nextSceneId = choiceData.nextSceneId;
						nextScene = allScenes.find((s) => s.id === nextSceneId);

						if (!nextScene) {
							throw new Error(`Next scene not found with ID: ${nextSceneId}`);
						}
					} else {
						// Случай когда nextSceneId <= 0 (не выбрана следующая сцена)
						toast.error("Сначала укажите все сцены, на которые ведут выборы");
						throw new Error("Some choices don't have next scene specified");
					}

					const choicePayload = {
						...choiceData,
						nextSceneId: nextScene.id!,
						sceneId: allScenes[sceneIndex].id!,
						storyId: storyId,
					};

					if (
						existingChoices[choiceIndex] &&
						choiceIndex + 1 <= scene.maxChoices
					) {
						await changeChoice(
							storyId,
							allScenes[sceneIndex].id!,
							existingChoices[choiceIndex].id!,
							choicePayload,
						);
					} else {
						await createChoice(
							storyId,
							allScenes[sceneIndex].id!,
							choicePayload,
						);
					}
				}

				for (const [choiceIndex, choice] of existingChoices.entries()) {
					if (!choice) continue;

					if (
						existingChoices[choiceIndex] &&
						choiceIndex + 1 > scene.maxChoices
					) {
						await deleteChoice(
							storyId,
							allScenes[sceneIndex].id!,
							allScenes[sceneIndex]?.choices![choiceIndex].id!,
						);
					}
				}
			}

			// Перенаправляем только для новых историй
			if (isNewStory) {
				router.push(`/editor/${storyId}`);
			}

			const updatedStoryData = await getStory(storyId);
			const storyToUpdate = JSON.parse(
				JSON.stringify({
					...updatedStoryData,
					id: storyId,
				}),
			);
			const gettedStory = await getStory(storyId);
			setStory(storyToUpdate);
			return gettedStory;
		} catch (error) {
			throw error;
		}
	};

	useEffect(() => {
		fetchStoriesByLimit();
	}, []);

	return {
		stories,
		sortedStories,
		fetchStoriesByLimit,
		fetchAllStories,
		getStory,
		oneStory,
		fetchAllUsersStoriesByLimit,
		updateStory,
		fetchAllUsersStories,
	};
};
