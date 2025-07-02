"use client";

import { useStories } from "@/shared/lib/hooks/useStories";
import s from "./Header.module.scss";
import { useStoryEditorStore } from "@/shared/stores";
import { toast } from "react-toastify";

export default function SaveStory() {
	const { updateStory } = useStories();
	const { story } = useStoryEditorStore();

	const handleSaveStory = async () => {
		try {
			await updateStory(story!);
			toast.success("История сохранена");
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
