"use client";

import { useStories } from "@/shared/lib/hooks/useStories";
import s from "./Header.module.scss";
import { useStoryEditorStore, useUsersStore } from "@/shared/stores";
import { toast } from "react-toastify";
import { usePathname } from "next/navigation";
import { useShallow } from "zustand/shallow";
import { IStoryHeader } from "@/shared/lib";
import { useState } from "react";

export default function SaveStory() {
	const { updateStory } = useStories();
	const pathname = usePathname()
	const { currentUser } = useUsersStore()
	const { story, stories, setStories } =
		useStoryEditorStore(useShallow((state) => state));
	const [isLoading, setIsLoading] = useState(false);

	const handleSaveStory = async () => {
		setIsLoading(true);
		try {
			if (pathname.split("/")[2] === "newStory") {
				const newStoryIndex = stories.findIndex(
					(story) => story.id === -2,
				);

				await updateStory(story!);
				toast.success("История сохранена");

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

				const updatedStories = [...stories];
				updatedStories[newStoryIndex] = newStory;

				setStories(updatedStories);
			}
			else {
				await updateStory(story!);
				toast.success("История сохранена");
			}
		} catch (error) {
			toast.error("Ошибка сохранения истории");
			throw error;
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<button
			className={`${s.controlButton} ${s.save}`}
			onClick={handleSaveStory}
			disabled={isLoading}
			style={{
				background: isLoading ? "#666" : "",
				cursor: isLoading ? "not-allowed" : "pointer",
			}}
		>
			{isLoading ? "Сохраняется..." : "Сохранить"}
		</button>
	);
}
