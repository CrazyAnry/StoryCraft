import { useStories } from "@/shared/lib/hooks/useStories";
import s from "./Header.module.scss";
import { useStoryEditorStore } from "@/shared/stores";
import { useShallow } from "zustand/react/shallow";

export default function PrivateStory() {
	const { story, setIsPublic } = useStoryEditorStore(
		useShallow((state) => state)
	);
	const { updateStory } = useStories()

	return (
		<button
			className={`${s.controlButton} ${s.unpublish} ${!story?.isPublic ? s.disabled : ""
				}`}
			onClick={() => {
				const updatedStory = { ...story!, isPublic: false };
				setIsPublic(false);
				updateStory(updatedStory)
			}}
			disabled={!story?.isPublic}
		>
			Отменить публикацию
		</button>
	);
}
