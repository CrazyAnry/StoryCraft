import { useStories } from "@/shared/lib/hooks/useStories";
import s from "./Header.module.scss";
import { useStoryEditorStore } from "@/shared/stores";
import { useShallow } from "zustand/react/shallow";

export default function PublicStory() {
	const {
		story,
		setIsPublic,
	} = useStoryEditorStore(useShallow((state) => state));
	const { updateStory } = useStories()

	return (
		<button
			className={`${s.controlButton} ${s.publish} ${story?.isPublic ? s.disabled : ""
				}`}
			onClick={() => {
				const updatedStory = { ...story!, isPublic: true };
				setIsPublic(true);
				updateStory(updatedStory)
			}}
			disabled={story?.isPublic}
		>
			Опубликовать
		</button>
	);
}
