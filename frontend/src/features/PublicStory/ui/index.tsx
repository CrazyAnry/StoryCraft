'use client'

import { useStories } from "@/shared/lib/hooks/useStories";
import s from "./Header.module.scss";
import { useStoryEditorStore } from "@/shared/stores";
import { useShallow } from "zustand/react/shallow";
import { toast } from "react-toastify";
import { usePathname } from "next/navigation";

export default function PublicStory() {
	const { story, setIsPublic, stories, setStories } = useStoryEditorStore(
		useShallow((state) => state),
	);
	const { updateStory } = useStories();
	const pathname = usePathname();
	
	const handlePublicStory = async () => {
		try {
			if (pathname.split("/")[2] !== "newStory" && story?.id && story.id !== -2) {
				// Обновляем только isPublic поле
				const updatedStory = await updateStory({ ...story, isPublic: true });
				
				if (!updatedStory) {
					throw new Error("Не удалось опубликовать историю");
				}
				
				setIsPublic(true);
				toast.success("История опубликована");
				
				// Обновляем историю в массиве
				const updatedStories = stories.map(s => 
					s.id === updatedStory.id ? updatedStory : s
				);
				setStories(updatedStories);
			} else {
				toast.error("Сначала сохраните историю");
			}
		} catch (error) {
			toast.error("Ошибка публикации истории");
			throw error;
		}
	};

	const isDisabled = story?.isPublic || pathname.split("/")[2] === "newStory" || !story?.id || story.id === -2;

	return (
		<button
			className={`${s.controlButton} ${s.publish} ${isDisabled ? s.disabled : ""}`}
			onClick={handlePublicStory}
			disabled={isDisabled}
		>
			Опубликовать
		</button>
	);
}