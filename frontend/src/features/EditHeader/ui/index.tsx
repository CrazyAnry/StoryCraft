"use client";

import React, { useEffect, useState } from "react";
import s from "./EditableHeader.module.scss";
import { useStoryEditorStore, useUsersStore } from "@/shared/stores";
import { useShallow } from "zustand/shallow";
import { useStories } from "@/shared/lib/hooks/useStories";
import { usePathname, useRouter } from "next/navigation";
import { RemoveSceneButton } from "@/shared/ui";
import { deleteStory } from "@/shared/api/stories/mutations";
import AddImage from "@/features/AddImage";
import AddImageModal from "@/features/AddImageModal";
import { toast } from "react-toastify";
import { IStoryHeader } from "@/shared/lib";

export default function EditHeader() {
	const { story, stories, setTitle, setDescription, setStory, setStories, removeScene } =
		useStoryEditorStore(useShallow((state) => state));
	const { currentUser } = useUsersStore();
	const { getStory, oneStory } = useStories();
	const pathname = usePathname();
	const router = useRouter();
	const [isNewStory, setIsNewStory] = useState<boolean>(false);
	const [isInitialized, setIsInitialized] = useState<boolean>(false);

	// Определяем, является ли это новой историей
	useEffect(() => {
		const isNewStoryPath = pathname.split("/")[2] === "newStory";
		setIsNewStory(isNewStoryPath);
		
		if (isNewStoryPath) {
			// Для новой истории сразу создаем пустую историю
			createNewStoryIfNeeded();
		} else {
			// Для существующей истории загружаем данные
			getStory();
		}
	}, [pathname]);

	// Обработка загруженной истории или создание новой
	useEffect(() => {
		if (isInitialized) return; // Предотвращаем повторную инициализацию

		if (isNewStory) {
			// Для новой истории создаем пустую историю
			createNewStoryIfNeeded();
		} else if (oneStory) {
			// Для существующей истории устанавливаем данные
			handleExistingStory(oneStory);
		}
	}, [oneStory, isNewStory, isInitialized]);

	const createNewStoryIfNeeded = () => {
		if (isInitialized) return;

		// Проверяем, есть ли уже история с id: -2
		const existingNewStory = stories.find(story => story.id === -2);
		
		if (existingNewStory) {
			setStory(existingNewStory);
		} else {
			// Создаем новую историю
			const newStory: IStoryHeader = {
				id: -2,
				title: "",
				description: "",
				image: null,
				isPublic: false,
				authorId: currentUser?.id!,
				authorName: currentUser?.username!,
				scenes: [],
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
			};

			const updatedStories = [...stories, newStory];
			setStories(updatedStories);
			setStory(newStory);
		}
		
		setIsInitialized(true);
	};

	const handleExistingStory = (loadedStory: IStoryHeader) => {
		const editingStoryIndex = stories.findIndex(
			(story) => story.id === loadedStory.id
		);
		
		if (editingStoryIndex === -1) {
			// Истории нет в массиве, добавляем её
			const updatedStories = [...stories, loadedStory];
			setStories(updatedStories);
			setStory(loadedStory);
		} else {
			// История уже есть в массиве, используем её
			setStory(stories[editingStoryIndex]);
		}
		
		setIsInitialized(true);
	};

	const handleDeleteStory = async () => {
		if (isNewStory) {
			// Для новой истории просто очищаем данные
			try {
				setTitle("");
				setDescription("");
				// Удаляем все сцены
				if (story?.scenes) {
					for (let i = 0; i < story.scenes.length; i++) {
						if (story.scenes[i].id) {
							removeScene(story.scenes[i].id!);
						}
					}
				}
				toast.success("История очищена");
			} catch (error) {
				toast.error("Не удалось очистить историю: " + error);
			}
		} else {
			// Для существующей истории удаляем из базы данных
			try {
				const findedStory = await getStory();
				if (findedStory) {
					await deleteStory(findedStory.id!);
					router.push("/create");
					toast.success("История удалена");
				}
			} catch (error) {
				toast.error("Не удалось удалить историю: " + error);
			}
		}
	};

	// Показываем загрузку только если не инициализировано
	if (!isInitialized || !story) {
		return <h1>Загрузка...</h1>;
	}

	return (
		<>
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
						Количество сцен: {story.scenes?.length || 0}
					</div>
				</div>
				<AddImage addImageTo="story" />
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
				<div className={s.footer}>
					<RemoveSceneButton
						className={s.removeButton}
						onClick={handleDeleteStory}
					>
						{isNewStory ? "Очистить историю" : "Удалить историю"}
					</RemoveSceneButton>
				</div>
			</div>
			<AddImageModal addImageTo="story" />
		</>
	);
}