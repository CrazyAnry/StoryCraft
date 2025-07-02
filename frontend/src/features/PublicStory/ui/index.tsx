import { useStories } from "@/shared/lib/hooks/useStories";
import s from "./Header.module.scss";
import { useStoryEditorStore } from "@/shared/stores";
import { useShallow } from "zustand/react/shallow";
import { toast } from "react-toastify";

export default function PublicStory() {
	const { story, setIsPublic } = useStoryEditorStore(
		useShallow((state) => state),
	);
	const { updateStory } = useStories();

	const handlePublicStory = async () => {
		try {
			await updateStory({ ...story!, isPublic: true });
			setIsPublic(true);
			toast.success("История опубликована");
		} catch (error) {
			throw error;
		}
	};

	return (
		<button
			className={`${s.controlButton} ${s.publish} ${
				story?.isPublic ? s.disabled : ""
			}`}
			onClick={handlePublicStory}
			disabled={story?.isPublic}
		>
			Опубликовать
		</button>
	);
}
