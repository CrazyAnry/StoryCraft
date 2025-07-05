"use client";

import { useStories } from "@/shared/lib/hooks/useStories";
import s from "./Header.module.scss";
import { useStoryEditorStore, useUsersStore } from "@/shared/stores";
import { toast } from "react-toastify";
import { usePathname, useRouter } from "next/navigation";
import { useShallow } from "zustand/shallow";
import { IStoryHeader } from "@/shared/lib";
import { useState } from "react";

export default function SaveStory() {
	const { updateStory } = useStories();
	const pathname = usePathname();
	const router = useRouter();
	const { currentUser } = useUsersStore();
	const { story, stories, setStories, setStory } =
		useStoryEditorStore(useShallow((state) => state));
	const [isLoading, setIsLoading] = useState(false);

	const handleSaveStory = async () => {
		setIsLoading(true);
		try {
			if (pathname.split("/")[2] === "newStory") {
				// Сохраняем новую историю и получаем ее с реальным ID
				const savedStory = await updateStory(story!);
				
				if (!savedStory) {
					throw new Error("Не удалось сохранить историю");
				}
				
				toast.success("История сохранена");

				// Удаляем временную историю из массива
				const filteredStories = stories.filter(story => story.id !== -2);
				
				// Добавляем сохраненную историю в массив
				const updatedStories = [...filteredStories, savedStory];
				setStories(updatedStories);
				
				// Обновляем текущую историю с реальным ID
				setStory(savedStory);
				
				// Перенаправляем на страницу с реальным ID
				router.replace(`/editor/${savedStory.id}`);
			} else {
				// Обновляем существующую историю
				const updatedStory = await updateStory(story!);
				
				if (!updatedStory) {
					throw new Error("Не удалось обновить историю");
				}
				
				toast.success("История сохранена");
				
				// Обновляем историю в store
				setStory(updatedStory);
				
				// Обновляем историю в массиве
				const updatedStories = stories.map(s => 
					s.id === updatedStory.id ? updatedStory : s
				);
				setStories(updatedStories);
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