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
	const [isNewStory, setIsNewStory] = useState<boolean>(false)

	useEffect(() => {
		if (pathname.split("/")[2] !== "newStory") getStory();
		if (pathname.split("/")[2] === "newStory") setIsNewStory(true)
	}, []);

	useEffect(() => {
		if (oneStory) {
			const editingStory = stories.findIndex(
				(story) => story.id === oneStory.id!,
			);
			if (editingStory === -1) {
				const updatedStories = [...stories, oneStory];
				setStories(updatedStories);
				setStory(updatedStories[updatedStories.length - 1]);
			} else {
				setStory(stories[editingStory]);
			}
		} else {
			const editingStory = stories.findIndex(
				(story) => story.id === -2,
			);
			if (editingStory) {
				setStory(stories[editingStory]);
			}
			else {
				const updatedStories = [
					...stories,
					{
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
					},
				];
				setStories(updatedStories);
				setStory(updatedStories[updatedStories.length - 1]);
			}
		}
	}, [oneStory?.id]);

	const newId = (num: number) => {
		if (stories.findIndex((s) => s.id === num) !== -1) {
			return newId(num + 1);
		}
		return num;
	};

	if (!story) {
		return <h1>Loading...</h1>;
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
						Количество сцен: {story.scenes!.length}
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
					{!isNewStory && <RemoveSceneButton
						className={s.removeButton}
						onClick={async () => {
							if (pathname.split("/")[2] !== "newStory") {
								try {
									const findedStory = await getStory();
									if (findedStory) {
										deleteStory(findedStory.id!);
										router.push("/create");
										toast.success("История удалена");
									}
								} catch (error) {
									toast.error("Не удалось удалить историю: " + error);
								}
							}
						}}
					>
						{" "}
						Удалить историю{" "}
					</RemoveSceneButton>}
					{isNewStory && <RemoveSceneButton
						className={s.removeButton}
						onClick={async () => {
							try {
								setTitle("")
								setDescription("")
								for(let i = 0; i < story.scenes.length; i++ ){
									removeScene(story.scenes[i].id!)
								}
								toast.success("История очищена");
							} catch (error) {
								toast.error("Не удалось очистить историю: " + error);
							}
						}}
					>
						{" "}
						Очистить историю{" "}
					</RemoveSceneButton>}
				</div>
			</div>
			<AddImageModal addImageTo="story" />
		</>
	);
}
