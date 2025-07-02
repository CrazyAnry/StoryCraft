"use client";

import React, { useEffect } from "react";
import s from "./EditableHeader.module.scss";
import { useStoryEditorStore, useUsersStore } from "@/shared/stores";
import { useShallow } from "zustand/shallow";
import { useStories } from "@/shared/lib/hooks/useStories";
import { usePathname, useRouter } from "next/navigation";
import { RemoveSceneButton } from "@/shared/ui";
import { deleteStory } from "@/shared/api/stories/mutations";
import AddImage from "@/features/AddImage";
import AddImageModal from "@/features/AddImageModal";

export default function EditHeader() {
	const { story, stories, setTitle, setDescription, setStory, setStories } =
		useStoryEditorStore(useShallow((state) => state));
	const { currentUser } = useUsersStore();
	const { getStory, oneStory } = useStories();
	const pathname = usePathname();
	const router = useRouter();

	useEffect(() => {
		if (pathname.split("/")[2] !== "newStory") getStory();
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
				console.log(123);
			}
		} else {
			const updatedStories = [
				...stories,
				{
					id: newId(1),
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
					<RemoveSceneButton
						className={s.removeButton}
						onClick={async () => {
							if (pathname.split("/")[2] !== "newStory") {
								try {
									const findedStory = await getStory();
									if (findedStory) {
										deleteStory(findedStory.id!);
										router.push("/create");
									}
								} catch {}
							}
						}}
					>
						{" "}
						Удалить историю{" "}
					</RemoveSceneButton>
				</div>
			</div>
			<AddImageModal addImageTo="story" />
		</>
	);
}
