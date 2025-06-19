import { useStories } from "@/shared/lib/hooks/useStories";
import s from "./Header.module.scss";
import { useStoryEditorStore } from "@/shared/stores";

export default function SaveStory() {
	const { updateStory } = useStories()
	const { story } = useStoryEditorStore()
	return (
		<button
		className={`${s.controlButton} ${s.save}`}
		onClick={() => updateStory(story!)}
	>
		Сохранить
	</button>
	);
}
