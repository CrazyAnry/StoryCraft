"use client";

import { useStories } from "@/shared/lib/hooks/useStories";
import s from "./Header.module.scss";
import { useStoryEditorStore } from "@/shared/stores";
import { useShallow } from "zustand/react/shallow";
import { toast } from "react-toastify";
import { usePathname } from "next/navigation";

export default function PrivateStory() {
	const { story, setIsPublic, stories, setStories } = useStoryEditorStore(
		useShallow((state) => state),
	);
	const { updateStory } = useStories();
	const pathname = usePathname();

	const handlePrivateStory = async () => {
		try {
			if (pathname.split("/")[2] !== "newStory" && story?.id && story.id !== -2) {
				const updatedStory = await updateStory({ ...story, isPublic: false });
				
				if (!updatedStory) {
					throw new Error("Не удалось скрыть историю");
				}
				
				setIsPublic(false);
				toast.success("История скрыта");
				
				// Обновляем историю в массиве
				const updatedStories = stories.map(s => 
					s.id === updatedStory.id ? updatedStory : s
				);
				setStories(updatedStories);
			} else {
				toast.error("Сначала сохраните историю");
			}
		} catch (error) {
			toast.error("Ошибка скрытия истории");
			throw error;
		}
	};

	const isDisabled = !story?.isPublic || pathname.split("/")[2] === "newStory" || !story?.id || story.id === -2;

	return (
		<button
			className={`${s.controlButton} ${s.unpublish} ${isDisabled ? s.disabled : ""}`}
			onClick={handlePrivateStory}
			disabled={isDisabled}
		>
			Отменить публикацию
		</button>
	);
}