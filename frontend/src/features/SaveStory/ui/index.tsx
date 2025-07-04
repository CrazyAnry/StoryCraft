"use client";

import { useStories } from "@/shared/lib/hooks/useStories";
import s from "./Header.module.scss";
import { useStoryEditorStore, useUsersStore } from "@/shared/stores";
import { toast } from "react-toastify";
import { usePathname } from "next/navigation";
import { useShallow } from "zustand/shallow";
import { IStoryHeader } from "@/shared/lib";

export default function SaveStory() {
	const { updateStory } = useStories();
	const pathname = usePathname()
	const { currentUser } = useUsersStore()
	const { story, stories } =
		useStoryEditorStore(useShallow((state) => state));

	const handleSaveStory = async () => {
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


				stories[newStoryIndex] = newStory;
			}
			else{
				await updateStory(story!);
				toast.success("История сохранена");
			}
		} catch (error) {
			throw error;
		}
	};

	return (
		<button
			className={`${s.controlButton} ${s.save}`}
			onClick={handleSaveStory}
		>
			Сохранить
		</button>
	);
}
