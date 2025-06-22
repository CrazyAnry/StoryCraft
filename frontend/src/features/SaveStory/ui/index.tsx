'use client'

import { useStories } from "@/shared/lib/hooks/useStories";
import s from "./Header.module.scss";
import { useStoryEditorStore } from "@/shared/stores";
import { usePathname, useRouter } from "next/navigation";
import { createStory } from "@/shared/api/stories/mutations";
import { toast } from "react-toastify";

export default function SaveStory() {
	const { updateStory } = useStories()
	const { story, stories, setId } = useStoryEditorStore()
	const router = useRouter()
	const pathname = usePathname()

	return (
		<button
		className={`${s.controlButton} ${s.save}`}
		onClick={async () => {
			try {
				await updateStory(story!)
				toast.success('История сохранена')
			} catch (error) {
				toast.error('Ошибка сохранения истории')
			}
		}}
	>
		Сохранить
	</button>
	);
}
